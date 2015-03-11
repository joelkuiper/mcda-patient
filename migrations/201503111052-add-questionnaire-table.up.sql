CREATE TABLE questionnaires
(id IDENTITY PRIMARY KEY,
 title VARCHAR,
 problem CLOB,
 date_created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE results
(id IDENTITY PRIMARY KEY,
 questionnaire_id BIGINT REFERENCES questionnaires (id),
 answers CLOB,
 last_completed TIMESTAMP DEFAULT current_timestamp,
 last_visited TIMESTAMP DEFAULT current_timestamp,
 url VARCHAR(5) UNIQUE,
);
CREATE INDEX ON results (questionnaire_id);
CREATE INDEX ON results (url);
