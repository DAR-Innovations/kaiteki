package org.kaiteki.backend.config.cache;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.lang.reflect.Method;

@RequiredArgsConstructor
@Component
public class CurrentUserCacheKeyGenerator implements KeyGenerator {
    private final CurrentSessionService currentSessionService;

    @Override
    public Object generate(Object target, Method method, Object... params) {
        return currentSessionService.getCurrentUserId() + "_"
                + target.getClass().getSimpleName() + "_"
                + method.getName() + "_"
                + StringUtils.arrayToDelimitedString(params, "_");
    }
}
