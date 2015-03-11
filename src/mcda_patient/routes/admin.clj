(ns mcda-patient.routes.admin
  (:require [mcda-patient.layout :as layout]
            [compojure.core :refer [defroutes GET]]
            [clojure.java.io :as io]))

(defn admin-page []
  (layout/render "admin/home.html"))

(defroutes admin-routes
  (GET "/admin" [] (admin-page)))
