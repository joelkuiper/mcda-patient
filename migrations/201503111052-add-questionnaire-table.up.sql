CREATE TABLE questionnaires
(id IDENTITY PRIMARY KEY,
 title VARCHAR,
 problem TEXT,
 date_created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE results
(id IDENTITY PRIMARY KEY,
 questionnaire_id BIGINT REFERENCES questionnaires (id),
 answers TEXT,
 last_completed TIMESTAMP DEFAULT NULL,
 last_visited TIMESTAMP DEFAULT NULL,
 url VARCHAR(8) UNIQUE,
);
CREATE INDEX ON results (questionnaire_id);
CREATE INDEX ON results (url);
