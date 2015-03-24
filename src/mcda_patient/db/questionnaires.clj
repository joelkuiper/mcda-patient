(ns mcda-patient.db.questionnaires
  (:refer-clojure :exclude [get assoc! dissoc!])
  (:require [mcda-patient.layout :as layout]
            [yesql.core :refer [defquery defqueries]]
            [taoensso.timbre :as timbre]
            [cheshire.core :refer :all]
            [mcda-patient.db.core :refer [db-spec]]
            [clojure.java.jdbc :as jdbc]))

(defqueries "sql/questionnaires.sql"
  {:connection db-spec})

(timbre/refer-timbre)

(defn random-url [] (crypto.random/url-part 5))

(defn query [] (query-questionnaires))

(defn with-decoded-problem
  [questionnaire]
  (update-in questionnaire [:problem] parse-string))

(defn get
  ([id] (jdbc/with-db-transaction [tx db-spec] (get id tx)))
  ([id tx]
   (when-let [questionnaire (first (get-questionnaire {:id id} {:connection tx}))]
     (with-decoded-problem questionnaire))))

(defn round-trip-json
  "This round trips the JSON, will fail if the input was not valid JSON.
  It's a nasty hack to get some fail-fast input validation"
  [str]
  (generate-string (parse-string str)))

(defn create!
  [title problem num-urls]
  (let [id (first (vals (create<! {:title title :problem (round-trip-json problem)})))
        urls (map vector (repeat id) (repeatedly num-urls random-url))]
    (jdbc/with-db-transaction [tx db-spec]
      (doall
       (map (fn [[id url]] (insert-result! {:id id :url url} {:connection tx})) urls)))
    id))

(defn edit!
  [id title problem num-urls]
  (edit-questionnaire!
   {:id id
    :problem (round-trip-json problem)
    :title title}))

(defn visit
  [url]
  (jdbc/with-db-transaction [tx db-spec]
    (let [questionnaire (first (get-questionnaire-by-url {:url url} {:connection tx}))]
      (visit-questionnaire! {:url url} {:connection tx})
      (with-decoded-problem questionnaire))))

(defn save-result!
  [url answers]
  (save-answers! {:answers (generate-string answers) :url url}))

(defn results
  [id]
  (jdbc/with-db-transaction [tx db-spec]
    (let [results (get-results-by-id {:id id} {:connection tx})]
      (doall
       (map (fn [result]
              (update-in result [:answers] parse-string)) results)))))

(defn get-urls
  [id]
  (map :url (get-urls-by-id {:id id})))
