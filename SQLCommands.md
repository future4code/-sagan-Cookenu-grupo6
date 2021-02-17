**Comandos usados para criar e alterar as tabelas utilizadas.**

~~~
CREATE TABLE CookenuUser(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE CookenuRecipes(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES CookenuUser(id)
);

CREATE TABLE UserFollowers(
    follower_user_id VARCHAR(255) PRIMARY KEY,
    following_user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(follower_user_id) REFERENCES CookenuUser(id),
    FOREIGN KEY(following_user_id) REFERENCES CookenuUser(id)
);

ALTER TABLE CookenuUser ADD COLUMN role VARCHAR(255) DEFAULT "normal";

CREATE TABLE RefreshToken(
	refresh_token VARCHAR(255) PRIMARY KEY,
    device VARCHAR(255) NOT NULL UNIQUE,
    is_active TINYINT NOT NULL DEFAULT 1,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES CookenuUser(id)
)