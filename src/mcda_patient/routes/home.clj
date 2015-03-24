(ns mcda-patient.routes.home
  (:require [mcda-patient.layout :as layout]
            [mcda-patient.db.questionnaires :as questionnaires]
            [ring.util.response :as response]
            [taoensso.timbre :as timbre]
            [compojure.core :refer :all]
            [clojure.java.io :as io]))

(timbre/refer-timbre)

(defn home
  [url-part req]
  (if-let [questionnaire (questionnaires/visit url-part)]
    (layout/render "home.html"
                   {:id url-part
                    :problem (:problem questionnaire)})
    (response/not-found (str "could not find questionnaire " url-part))))

(defn save
  [url-part {:keys [params] :as  req}]
  (let [{:strs [results]} params]
    (questionnaires/save-result! url-part results))
  (response/status {} 200))

(defroutes home-routes
  (GET "/" [] (response/redirect "/admin"))
  (context "/:url-part" [url-part]
           (POST "/" [:as req] (save url-part req))
           (GET  "/" [:as req] (home url-part req))))
