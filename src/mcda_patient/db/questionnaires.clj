(ns mcda-patient.db.questionnaires
  (:refer-clojure :exclude [get assoc! dissoc!])
  (:require [mcda-patient.layout :as layout]
            [yesql.core :refer [defquery defqueries]]
            [taoensso.timbre :as timbre]
            [mcda-patient.db.core :refer [db-spec]]
            [clojure.java.jdbc :as jdbc]))

(defqueries "sql/questionnaires.sql"
  {:connection db-spec})

(timbre/refer-timbre)

(defn random-url [] (crypto.random/url-part 5))

(defn query [] (query-questionnaires))

(defn get [id] (first (get-questionnaire {:id id})))

(defn results [id]
  (get-results {:id id}))

(defn create!
  [title problem num-urls]
  (debug title problem num-urls)

  (let [id (first (vals (create<! {:title title :problem problem})))
        urls (map vector (repeat id) (take num-urls (repeatedly random-url)))]
    (debug "inserting" urls "with id" id)
    (jdbc/with-db-transaction [connection db-spec]
      (doall (map (fn [[id url]] (insert-result! {:id id :url url})) urls)))
    id))

(defn edit!
  [id title problem urls])
