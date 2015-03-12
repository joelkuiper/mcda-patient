(ns mcda-patient.routes.auth
  (:require [compojure.core :refer :all]
            [ring.util.response :refer [response redirect content-type]]
            [environ.core :refer [env]]
            [buddy.hashers :as hashers]
            [taoensso.timbre :as timbre]
            [buddy.auth :refer [throw-unauthorized authenticated?]]
            [mcda-patient.layout :as layout]))

(def users
  {:admin {:password (or (env :admin-password) (hashers/encrypt "FIXME"))}})

(defn handle-login [username password request]
  (let [session (:session request)
        user (get users (keyword username))]
    (if (and user (hashers/check password (:password user)))
      (->
       (redirect (get-in request [:query-params "next"] "/"))
       (assoc :session (assoc session :identity (keyword username))))
      (layout/render "admin/login.html" {:login-error "Invalid username or password"}))))

(defn logout []
  (-> (redirect "/")
     (assoc :session {})))

(defn login []
  (layout/render "admin/login.html"))

(defroutes auth-routes
  (GET "/login" [:as req] (login))
  (POST "/login" [id pass :as req]
        (handle-login id pass req))
  (GET "/logout" [:as req] (logout)))
