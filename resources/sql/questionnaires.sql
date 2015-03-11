-- name: get
-- Gets a questionnaire by id
SELECT * FROM questionnaires WHERE id = :id

-- name: get-with-results
-- Gets a questionnaire with associated results
SELECT (questionnaires.*, results.*)
FROM questionnaires, results
WHERE questionnaire.id = :id AND results.questionnaire_id = questionnaire.id

-- name: create<!
-- Creates a questionnaire
INSERT INTO questionnaires (title, problem) VALUES (:title, :problem) RETURNING id

-- name: edit!
-- Edits the questionnaire title and description
UPDATE projects
SET
  title = :title,
  problem = :problem,
WHERE id = :id

-- name: insert-results!
-- Inserts a list of urls to results for the specified questionnaire_id
INSERT INTO results (questionnaire_id, url) VALUES IN (:urls)

-- name: save-result!
-- Saves the result associated with a certain url
UPDATE results
SET
  answers = :answers
  last_completed = current_timestamp
WHERE url = :url
