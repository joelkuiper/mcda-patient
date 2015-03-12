(ns mcda-patient.security
  (:require
   [ring.util.response :refer [response redirect content-type]]
   [buddy.auth.accessrules :refer (success error)]
   [buddy.auth :refer [authenticated? throw-unauthorized]]))

(defn authenticated-user
  [request]
  (if (authenticated? request)
    true
    (error "Only authenticated users allowed")))

(defn unauthorized-handler
  [request metadata]
  (cond
    ;; If request is authenticated, raise 403 instead
    ;; of 401 (because user is authenticated but permission
    ;; denied is raised).
    (authenticated? request)
    (throw-unauthorized)
    ;; In other cases, redirect it user to login.
    :else
    (let [current-url (:uri request)]
      (redirect (format "/login?next=%s" current-url)))))

(def rules
  [{:pattern #"^/admin.*$"
    :handler authenticated-user}])
