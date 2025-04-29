
-- TODO no need to run this table create commands
CREATE TABLE IF NOT EXISTS "authors" (
	"id" SERIAL NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NULL DEFAULT NULL,
	"password" VARCHAR(255) NULL DEFAULT NULL,
	"bio" TEXT NULL DEFAULT NULL,
	"birthdate" DATE NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("id"),
	UNIQUE "authors_email_unique" ("email")
);

-- TODO no need to run this table create commands
CREATE TABLE IF NOT EXISTS "books" (
	"id" SERIAL NOT NULL,
	"title" VARCHAR(255) NOT NULL,
	"description" TEXT NULL DEFAULT NULL,
	"published_date" DATE NOT NULL,
	"author_id" INTEGER NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("id"),
	CONSTRAINT "books_author_id_foreign" FOREIGN KEY ("author_id") REFERENCES "authors" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);


-- Run The command for insert author data
INSERT INTO "authors" ("id", "name", "email", "password", "bio", "birthdate", "created_at", "updated_at") VALUES
	(2, 'Soriful Islam', NULL, NULL, 'Establish Your Writing Space: Choose a comfortable and conducive environment for creativity, whether it''s a cozy nook at home or a favorite local café.', '0204-01-20', '2025-04-29 16:10:57.580879+00', '2025-04-29 16:10:57.580879+00'),
	(1, 'Sihab Uddin Molla', NULL, NULL, 'Sihab Uddin Molla is a backend developer', '0204-01-20', '2025-04-29 16:05:04.216215+00', '2025-04-29 16:05:04.216215+00'),
	(3, 'Sahadat Islam Alomgir', NULL, NULL, 'Conduct Research: For nonfiction or research-intensive projects, set goals related to the amount of research you need to complete.', '0204-01-20', '2025-04-29 16:11:24.065056+00', '2025-04-29 16:11:24.065056+00'),
	(5, 'First User', 'user@gmail.com', '$2b$10$p8ZoWYAwTjdMuSL6aYNXreaZff01057M/X2qnmqDuFL6wOVKDX9.2', 'This is First Test User', '1990-05-20', '2025-04-29 16:49:46.215886+00', '2025-04-29 16:49:46.215886+00');

-- Run The command for insert books data
INSERT INTO "books" ("id", "title", "description", "published_date", "author_id", "created_at", "updated_at") VALUES
	(1, 'To Kill a Mockingbird', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 1, '2025-04-29 16:36:08.926965+00', '2025-04-29 16:36:08.926965+00'),
	(2, '1984 ', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 1, '2025-04-29 16:36:21.330989+00', '2025-04-29 16:36:21.330989+00'),
	(3, 'The Alchemist', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 1, '2025-04-29 16:36:32.006836+00', '2025-04-29 16:36:32.006836+00'),
	(4, 'The Catcher in the Rye', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 1, '2025-04-29 16:36:43.783047+00', '2025-04-29 16:36:43.783047+00'),
	(5, 'Pride and Prejudice', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 1, '2025-04-29 16:36:55.59416+00', '2025-04-29 16:36:55.59416+00'),
	(6, 'Business & Productivity', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 1, '2025-04-29 16:37:05.943119+00', '2025-04-29 16:37:05.943119+00'),
	(7, 'Atomic Habits', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 3, '2025-04-29 16:37:18.338501+00', '2025-04-29 16:37:18.338501+00'),
	(8, 'Rich Dad Poor Dad', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 3, '2025-04-29 16:37:35.008599+00', '2025-04-29 16:37:35.008599+00'),
	(9, 'The 7 Habits of Highly Effective People', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 3, '2025-04-29 16:37:44.657527+00', '2025-04-29 16:37:44.657527+00'),
	(10, 'Think and Grow Rich', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 3, '2025-04-29 16:37:56.366998+00', '2025-04-29 16:37:56.366998+00'),
	(11, 'Self-Improvement & Psychology', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 2, '2025-04-29 16:38:18.515776+00', '2025-04-29 16:38:18.515776+00'),
	(12, 'Man’s Search for Meaning', 'An adventurous tale about a group of explorers searching for a hidden ancient city in the jungles of South America. Along the way, they encounter dangerous wildlife, cryptic clues, and dark secrets.', '2025-05-07', 3, '2025-04-29 16:38:26.757341+00', '2025-04-29 16:38:26.757341+00');




-- TODO no need to run this migration commands
CREATE TABLE IF NOT EXISTS "knex_migrations" (
	"id" SERIAL NOT NULL,
	"name" VARCHAR(255) NULL DEFAULT NULL,
	"batch" INTEGER NULL DEFAULT NULL,
	"migration_time" TIMESTAMPTZ NULL DEFAULT NULL,
	PRIMARY KEY ("id")
);

INSERT INTO "knex_migrations" ("id", "name", "batch", "migration_time") VALUES
	(1, '20250427163833_create_authors_table.ts', 1, '2025-04-29 15:59:34.406+00'),
	(2, '20250427164047_create_books_table.ts', 1, '2025-04-29 15:59:35.151+00');

CREATE TABLE IF NOT EXISTS "knex_migrations_lock" (
	"index" SERIAL NOT NULL,
	"is_locked" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("index")
);

INSERT INTO "knex_migrations_lock" ("index", "is_locked") VALUES
	(1, 0);
