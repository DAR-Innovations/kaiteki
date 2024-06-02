-- Files

CREATE TABLE
    app_files (
        id BIGSERIAL PRIMARY KEY,
        guid VARCHAR(255) NOT NULL UNIQUE,
        filename VARCHAR(255) NOT NULL,
        content_type VARCHAR(255) NOT NULL,
        size BIGINT NOT NULL,
        path VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

-- Users

CREATE TABLE
    users (
        id BIGSERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        birth_date DATE NOT NULL,
        status VARCHAR(255) NOT NULL,
        avatar_id BIGINT REFERENCES app_files (id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

CREATE TABLE
    roles (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE
    users_roles (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES users (id),
        role_id BIGINT NOT NULL REFERENCES roles (id)
    );

CREATE TABLE
    tokens (
        id BIGSERIAL PRIMARY KEY,
        token VARCHAR(255) UNIQUE NOT NULL,
        type VARCHAR(255) NOT NULL,
        expired_date TIMESTAMPTZ NOT NULL,
        user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

-- Notes
CREATE TABLE
    notes (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

-- Teams
CREATE TABLE
    teams (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        logo_id BIGINT REFERENCES app_files (id) ON DELETE SET NULL,
        owner_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

CREATE TABLE
    team_members (
        id BIGSERIAL PRIMARY KEY,
        position VARCHAR(255) NOT NULL,
        joined_date TIMESTAMPTZ NOT NULL,
        user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        team_id BIGINT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

CREATE TABLE
    teams_invitations (
        id BIGSERIAL PRIMARY KEY,
        token TEXT UNIQUE NOT NULL,
        team_id BIGINT NOT NULL REFERENCES teams (id) ON DELETE CASCADE
    );

CREATE TABLE team_files (
    id BIGSERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    file_id BIGINT NOT NULL REFERENCES app_files(id) ON DELETE CASCADE,
    uploaded_team_member_id BIGINT NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

-- Tasks
CREATE TABLE
    task_status (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        display_order INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        team_id BIGINT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

CREATE TABLE
    tasks (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        description TEXT NOT NULL,
        tag VARCHAR(255) NOT NULL,
        end_date TIMESTAMPTZ,
        start_date TIMESTAMPTZ,
        priority VARCHAR(255) NOT NULL,
        completed_once BOOLEAN NOT NULL,
        status_id BIGINT REFERENCES task_status (id) ON DELETE SET NULL,
        team_id BIGINT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
        executor_member_id BIGINT REFERENCES team_members (id) ON DELETE SET NULL,
        created_member_id BIGINT REFERENCES team_members (id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

CREATE TABLE
    task_notes (
        id BIGSERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_date TIMESTAMPTZ NOT NULL,
        team_member_id BIGINT NOT NULL REFERENCES team_members (id) ON DELETE CASCADE,
        task_id BIGINT NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

-- Posts
CREATE TABLE
    posts (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        hero_image_id BIGINT REFERENCES app_files (id),
        author_member_id BIGINT NOT NULL REFERENCES team_members (id) ON DELETE CASCADE,
        team_id BIGINT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

CREATE TABLE
    liked_posts (
        id BIGSERIAL PRIMARY KEY,
        team_member_id BIGINT NOT NULL REFERENCES team_members (id) ON DELETE CASCADE,
        post_id BIGINT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ
    );

-- Chats
CREATE TABLE chat_rooms (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    icon_id BIGINT REFERENCES app_files (id) ON DELETE SET NULL,
    team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    creator_member_id BIGINT REFERENCES team_members(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE chat_room_members (
    chat_room_id BIGINT NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
    member_id BIGINT NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
    PRIMARY KEY (chat_room_id, member_id)
);

-- Meetings
CREATE TABLE meetings (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(255) NOT NULL,
    external_link VARCHAR(255),
    team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    created_member_id BIGINT REFERENCES team_members(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE meeting_participants (
    id BIGSERIAL PRIMARY KEY,
    meeting_id BIGINT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    member_id BIGINT NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
    joined_time TIMESTAMPTZ,
    left_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE meeting_invited_members (
    meeting_id BIGINT NOT NULL REFERENCES meetings (id) ON DELETE CASCADE,
    member_id BIGINT NOT NULL REFERENCES team_members (id) ON DELETE CASCADE,
    PRIMARY KEY (meeting_id, member_id)
);

CREATE TABLE meeting_participated_members (
    meeting_id BIGINT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    participant_id BIGINT NOT NULL REFERENCES meeting_participants(id) ON DELETE CASCADE,
    PRIMARY KEY (meeting_id, participant_id)
);

-- INITIAL DATA FILLING
INSERT INTO users (first_name, last_name, username, email, password, birth_date, status, avatar_id, created_at)
    VALUES ('Aliya', 'Tazhigaliyeva', 'aliya', 'aliya@kaiteki.io', '$2a$10$HPf80nSlPjvPBFr7HIET2u8H7CaaR3OrwDClFZDx1nMEXLZeY0tSa','1990-01-01', 'ACTIVE', null, NOW());

INSERT INTO users (first_name, last_name, username, email, password, birth_date, status, avatar_id, created_at)
    VALUES ('Admin', 'Kaiteki', 'admin', 'admin@kaiteki.io', '$2a$10$HPf80nSlPjvPBFr7HIET2u8H7CaaR3OrwDClFZDx1nMEXLZeY0tSa','1990-01-01', 'ACTIVE', null, NOW());

INSERT INTO users (first_name, last_name, username, email, password, birth_date, status, avatar_id, created_at)
    VALUES ('Ramazan', 'Seiitbek', 'ramazan', 'ramazan@kaiteki.io', '$2a$10$HPf80nSlPjvPBFr7HIET2u8H7CaaR3OrwDClFZDx1nMEXLZeY0tSa','1990-01-01', 'ACTIVE', null, NOW());
