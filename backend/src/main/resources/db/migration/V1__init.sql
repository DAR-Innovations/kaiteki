CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  birth_date TIMESTAMP NOT NULL,
  status VARCHAR(255) NOT NULL,
  avatar_guid VARCHAR(255)
);

CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE users_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  role_id BIGINT NOT NULL REFERENCES roles(id)
);

CREATE TABLE tokens (
  id BIGSERIAL PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(255) NOT NULL,
  revoked BOOLEAN NOT NULL,
  expired BOOLEAN NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Notes

CREATE TABLE notes (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_date TIMESTAMP NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Teams

CREATE TABLE teams (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_date TIMESTAMP NOT NULL,
  owner_id BIGINT NOT NULL REFERENCES users (id)
);

CREATE TABLE team_members (
  id BIGSERIAL PRIMARY KEY,
  position VARCHAR(255) NOT NULL,
  joined_date TIMESTAMP NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE teams_performance (
  id BIGSERIAL PRIMARY KEY,
  team_id BIGINT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
  period_date TIMESTAMP NOT NULL,
  performance INT NOT NULL
);

CREATE TABLE activities (
  id BIGSERIAL PRIMARY KEY,
  period_date TIMESTAMP NOT NULL,
  critical_tasks_count INT NOT NULL,
  middle_tasks_count INT NOT NULL,
  easy_tasks_count INT NOT NULL,
  attendant_meetings_count INT NOT NULL,
  messages_sent_count INT NOT NULL,
  performance INT NOT NULL,
  team_member_id BIGINT NOT NULL REFERENCES team_members (id) ON DELETE CASCADE
);

CREATE TABLE teams_invitations (
  id BIGSERIAL PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE
);

-- Files

CREATE TABLE files (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  guid VARCHAR(255) NOT NULL UNIQUE,
  filename VARCHAR(255) NOT NULL,
  content_type VARCHAR(255) NOT NULL,
  size BIGINT NOT NULL,
  path VARCHAR(255) NOT NULL,
  created_date TIMESTAMP NOT NULL
);

-- Tasks

CREATE TABLE task_status (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  display_order INTEGER NOT NULL,
  open BOOLEAN NOT NULL,
  done BOOLEAN NOT NULL,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  end_date TIMESTAMP,
  start_date TIMESTAMP,
  priority VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL,
  status_id BIGINT NOT NULL REFERENCES task_status(id) ON DELETE CASCADE,
  team_id BIGINT NOT NULL  REFERENCES teams(id) ON DELETE CASCADE,
  assigned_member_id BIGINT  REFERENCES team_members(id) ON DELETE SET NULL
);

