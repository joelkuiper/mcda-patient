-- name: query-questionnaires
-- Gets a list of titles and ids
SELECT questionnaires.title, questionnaires.id, COUNT(results.questionnaire_id) AS number_of_results
FROM questionnaires
LEFT JOIN results
ON (questionnaires.id = results.questionnaire_id)
GROUP BY
questionnaires.id

-- name: get-questionnaire
-- Gets a questionnaire by id
SELECT questionnaires.* FROM questionnaires WHERE id = :id

-- name: get-questionnaire-by-url
-- Gets a questionnaire by id
SELECT questionnaires.*
FROM questionnaires, results
WHERE
results.url = :url AND questionnaires.id = results.questionnaire_id
LIMIT 1

-- name: get-results
-- Gets results associated with a questionnaire
SELECT results.*
FROM questionnaires, results
WHERE questionnaires.id = :id AND results.questionnaire_id = questionnaires.id

-- name: create<!
-- Creates a questionnaire
INSERT INTO questionnaires (title, problem) VALUES (:title, :problem)

-- name: edit-questionnaire!
-- Edits the questionnaire title and description
UPDATE questionnaires
SET
  title = :title,
  problem = :problem
WHERE id = :id

-- name: insert-result!
-- Inserts a list of urls to results for the specified questionnaire_id
INSERT INTO results (questionnaire_id, url) VALUES (:id, :url)

-- name: save-answers!
-- Saves the result associated with a certain url
UPDATE results
SET
  answers = :answers,
  last_completed = current_timestamp
WHERE url = :url

-- name: visit-questionnaire!
-- Updates the last visited counter
UPDATE results
SET
  last_visited = current_timestamp
WHERE url = :url
