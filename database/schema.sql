CREATE TABLE memos (
    id SERIAL PRIMARY KEY,
    content TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    PASSWORD VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE users_memos(
    id SERIAL PRIMARY KEY,
    user_id INT,
    memo_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (memo_id) REFERENCES memos(id)
);