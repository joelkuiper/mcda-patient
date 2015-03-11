(ns mcda-patient.routes.admin
  (:require [mcda-patient.layout :as layout]
            [compojure.core :refer :all]
            [taoensso.timbre :as timbre]
            [ring.util.response :as response]
            [noir.response :refer [redirect]]
            [mcda-patient.db.questionnaires :as questionnaires]))


(timbre/refer-timbre)

(defn parse-int [s] (Integer. (re-find  #"\d+" s)))


(defn admin-page []
  (layout/render "admin/home.html"
                 {:questionnaires (questionnaires/query)}))



(defn edit-existing
  [id req]
  (if-let [questionnaire (questionnaires/get id)]
    (layout/render "admin/edit.html"
                   {:questionnaire-id id
                    :questionnaire questionnaire})
    (response/not-found (str "could not find questionnaire " id))))

(defn create-new
  [req]
  (layout/render "admin/edit.html"
                 {:questionnaire-id "new"}))

(defn edit-page
  [id req]
  (if (= id "new")
    (create-new req)
    (edit-existing (parse-int id) req)))

(defn handle-edit
  [id {:keys [params] :as req}]
  (let [{:keys [title problem urls]} params]
    (if (= id "new")
      (let [new-questionnaire (questionnaires/create! title problem (parse-int urls))]
        (redirect (str "/admin/" new-questionnaire)))
      (do
        (questionnaires/edit! (parse-int id) title problem parse-int)
        (redirect (str "/admin/" id))))))

(defn view
  [id req]
  (let [questionnaire (questionnaires/get id)
        results (questionnaires/results id)]
    (if (not (nil? questionnaire))
      (layout/render "admin/view.html"
                     {:results results
                      :questionnaire questionnaire})
      (response/not-found (str "could not find questionnaire " id)))))


(defroutes admin-routes
  (context "/admin" []
           (GET "/" [] (admin-page))
           (context "/:questionnaire-id" [questionnaire-id]
                    (GET "/" [:as req]
                         (view (parse-int questionnaire-id) req))
                    (POST "/" [:as req]
                          (handle-edit questionnaire-id req))
                    (GET "/edit" [:as req]
                         (edit-page questionnaire-id req)))))
