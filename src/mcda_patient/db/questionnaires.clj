(ns mcda-patient.db.questionnaires
  (:refer-clojure :exclude [get assoc! dissoc!])
  (:require [mcda-patient.layout :as layout]
            [yesql.core :refer [defquery defqueries]]
            [mcda-patient.db.core :refer [db-spec]]
            [clojure.java.jdbc :as jdbc]))

(defqueries "sql/questionnaires.sql"
  {:connection db-spec})

(defn get
  [id])

(defn create!
  [title problem urls])

(defn edit!
  [id title problem urls])
