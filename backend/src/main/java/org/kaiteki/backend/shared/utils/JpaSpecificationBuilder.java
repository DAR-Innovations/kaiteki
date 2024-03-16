package org.kaiteki.backend.shared.utils;

import jakarta.persistence.criteria.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;


import java.util.*;

public class JpaSpecificationBuilder<Entity> {
    private Specification<Entity> specification;

    public JpaSpecificationBuilder() {}
    public JpaSpecificationBuilder(Specification<Entity> specification) {
        this.specification = specification;
    }

    public Specification<Entity> getSpecification() {
        return specification;
    }

    public JpaSpecificationBuilder<Entity> orderBy(String field, Sort.Direction direction) {
        if (StringUtils.isEmpty(field) || direction == null) {
            return this;
        }

        specification = andSpecification(specification, (root, query, cb) -> {
            Path<Entity> path = root.get(field);
            Order order = direction == Sort.Direction.ASC ? cb.asc(path) : cb.desc(path);
            query.orderBy(order);

            return cb.isNotNull(path);
        });

        return this;
    }

    public JpaSpecificationBuilder<Entity> equal(String field, Object o) {
        if (o != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.equal(root.get(field), o));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> notEqual(String field, Object o) {
        if (o != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.notEqual(root.get(field), o));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> equalIgnoreCase(String field, String o) {
        if (o != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.equal(cb.lower(root.get(field)), o.toLowerCase()));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> like(String field, String o) {
        if (o != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.like(cb.lower(root.get(field).as(String.class)), "%" + o.toLowerCase() + "%"));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> contains(String field, String o) {
        if (o != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.like(cb.lower(root.get(field).as(String.class)), "%" + o.toLowerCase() + "%"));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> like(String field, Long value) {
        if (value != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.like(root.get(field).as(String.class), "%" + value + "%"));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> in(String field, Object o) {
        if (o != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.in(root.get(field)).value(o));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> notIn(String field, Object o) {
        if (o != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.not(cb.in(root.get(field)).value(o)));
        }
        return this;
    }

    public JpaSpecificationBuilder<Entity> isNull(String field) {
        specification = andSpecification(specification, (root, query, cb) ->
                cb.isNull(root.get(field)));
        return this;
    }

    public JpaSpecificationBuilder<Entity> isNotNull(String field) {
        specification = andSpecification(specification, (root, query, cb) ->
                cb.isNotNull(root.get(field)));
        return this;
    }

    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> between(String field, Y start, Y end) {
        if (start != null && end != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.between(root.get(field), start, end));
        }
        return this;
    }

    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> greaterThanOrEqualTo(String field, Y date) {
        if (date != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get(field), date));
        }
        return this;
    }

    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> greaterThan(String field, Y date) {
        if (date != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.greaterThan(root.get(field), date));
        }
        return this;
    }


    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> greaterThanOrEqualTo(Map<String, Y> map) {
        specification = andSpecification(specification, (root, query, cb) ->
                cb.or(
                        map.entrySet().stream().map(m -> cb.greaterThanOrEqualTo(root.get(m.getKey()), m.getValue())).toArray(Predicate[]::new)
                ));
        return this;
    }

    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> lessThanOrEqualTo(String field, Y date) {
        if (date != null) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get(field), date));
        }
        return this;
    }

    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> orEqual(Map<String, Object> map) {
        if (map != null && map.size() > 0) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.or(
                            map.entrySet().stream().map(m -> cb.equal(root.get(m.getKey()), m.getValue())).toArray(Predicate[]::new)
                    ));
        }
        return this;
    }

    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> orIn(String field, List<Y> values) {
        if (values != null && !values.isEmpty()) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.or(
                            root.get(field).in(values)
                    )
            );
        }
        return this;
    }

    public <Y extends Comparable<? super Y>> JpaSpecificationBuilder<Entity> orLike(Map<String, String> map) {
        if (map != null && map.size() > 0) {
            specification = andSpecification(specification, (root, query, cb) ->
                    cb.or(
                            map.entrySet().stream()
                                    .filter(k -> StringUtils.isNotBlank(k.getValue()) && StringUtils.isNotBlank(k.getKey()))
                                    .map(m -> cb.like(cb.lower(root.get(m.getKey()).as(String.class)), "%" + m.getValue().toLowerCase().trim() + "%"))
                                    .toArray(Predicate[]::new)
                    ));
        }
        return this;
    }

    public void addSpecification(Specification<Entity> newSpecification) {
        if (newSpecification != null) {
            specification = andSpecification(specification, newSpecification);
        }
    }

    private Specification<Entity> andSpecification(Specification<Entity> src, Specification<Entity> newSpecification) {
        return src == null
                ? Specification.where(newSpecification)
                : src.and(newSpecification);
    }

    public JpaSpecificationBuilder<Entity> joinAndEqual(String field, String nestedField, Object value) {
        String valueAsString = convertObjectValueToString(value);

        if (valueAsString == null) {
            return this;
        }

        specification = andSpecification(specification, (root, query, cb) -> {
            Join<Entity, ?> join = root.join(field, JoinType.INNER);
            return cb.equal(join.get(nestedField).as(String.class), valueAsString);
        });

        return this;
    }

    public JpaSpecificationBuilder<Entity> joinAndIdsIn(String field, String nestedField, Collection<Long> valuesList) {
        if (Objects.isNull(valuesList)) {
            return this;
        }

        specification = andSpecification(specification, (root, query, cb) -> {
            Join<Entity, ?> join = root.join(field, JoinType.INNER);
            return join.get(nestedField).in(valuesList);
        });

        return this;
    }

    public JpaSpecificationBuilder<Entity> multipleJoinAndEqual(List<String> entities, String nestedField, Object value) {
        String valueAsString = convertObjectValueToString(value);

        if (valueAsString == null || entities.isEmpty()) {
            return this;
        }

        specification = andSpecification(specification, (root, query, cb) -> {
            Join<?, ?> join = root.join(entities.get(0), JoinType.INNER);

            for (int i = 1; i < entities.size(); i++) {
                join = join.join(entities.get(i), JoinType.INNER);
            }

            return cb.equal(join.get(nestedField).as(String.class), valueAsString.trim());
        });

        return this;
    }

    public JpaSpecificationBuilder<Entity> multipleJoinAndLike(List<String> entities, String nestedField, Object value) {
        String valueAsString = convertObjectValueToString(value);

        if (valueAsString == null || entities.isEmpty()) {
            return this;
        }

        specification = andSpecification(specification, (root, query, cb) -> {
            Join<?, ?> join = root.join(entities.get(0), JoinType.INNER);

            for (int i = 1; i < entities.size(); i++) {
                join = join.join(entities.get(i), JoinType.INNER);
            }

            return cb.like(cb.lower(join.get(nestedField).as(String.class)), "%" + valueAsString.toLowerCase().trim() + "%");
        });

        return this;
    }

    public JpaSpecificationBuilder<Entity> orMultipleJoinLike(List<String> entities, Map<String, Object> fieldValues) {
        if (fieldValues.isEmpty() || entities.isEmpty()) {
            return this;
        }

        specification = andSpecification(specification, (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Join<?, ?> join = root.join(entities.get(0), JoinType.INNER);

            for (int i = 1; i < entities.size(); i++) {
                join = join.join(entities.get(i), JoinType.INNER);
            }

            List<Predicate> entityPredicates = new ArrayList<>();
            for (Map.Entry<String, Object> entry : fieldValues.entrySet()) {
                String valueAsString = convertObjectValueToString(entry.getValue());
                if (valueAsString != null) {
                    entityPredicates.add(cb.like(
                            cb.lower(join.get(entry.getKey())).as(String.class), "%" + valueAsString.toLowerCase().trim() + "%"
                    ));
                }
            }

            if (!entityPredicates.isEmpty()) {
                predicates.add(cb.or(entityPredicates.toArray(new Predicate[0])));
            }

            return cb.or(predicates.toArray(new Predicate[0]));
        });

        return this;
    }

    private String convertObjectValueToString(Object value) {
        return (value instanceof String && !((String) value).isEmpty()) ?
                (String) value
                : (value != null ? value.toString() : null);
    }

    public Specification<Entity> build() {
        return specification;
    }
}
