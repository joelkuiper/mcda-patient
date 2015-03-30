(ns mcda-patient.middleware
  (:require [mcda-patient.session :as session]
            [mcda-patient.security :as security]
            [taoensso.timbre :as timbre]
            [environ.core :refer [env]]
            [selmer.middleware :refer [wrap-error-page]]
            [prone.middleware :refer [wrap-exceptions]]
            [ring.util.response :refer [redirect]]
            [ring.middleware.defaults :refer [site-defaults wrap-defaults]]
            [ring.middleware.session-timeout :refer [wrap-idle-session-timeout]]
            [noir-exception.core :refer [wrap-internal-error]]
            [ring.middleware.session.memory :refer [memory-store]]
            [ring.middleware.format :refer [wrap-restful-format]]
            [buddy.auth.accessrules :refer [wrap-access-rules]]
            [buddy.auth.middleware :refer [wrap-authentication wrap-authorization]]
            [buddy.auth.backends.session :refer [session-backend]]))

(def truthy?  #{"true" "TRUE" "True" "yes" "YES" "y" "1"})
(def in-dev (truthy? (str (:dev env))))

(defn development-middleware [handler]
  (if (env :dev)
    (-> handler
        wrap-error-page
        wrap-exceptions)
    handler))

(defn production-middleware [handler]
  (-> handler
     (wrap-access-rules {:rules security/rules :on-error security/unauthorized-handler})
     (wrap-authentication (session-backend))
     (wrap-authorization (session-backend))
     wrap-restful-format
     (wrap-idle-session-timeout
      {:timeout (* 60 30)
       :timeout-response (redirect "/")})
     (wrap-defaults
      (->
       site-defaults
       (assoc-in [:static :resources] (if in-dev "public" "build"))
       (assoc-in [:session :store] (memory-store session/mem))))
     (wrap-internal-error :log #(timbre/error %))))
