(defproject mcda-patient "0.1.0-SNAPSHOT"

  :description "MCDA Application for eliciting patient preferences"
  :url "http://drugis.org"

  :dependencies [[org.clojure/clojure "1.6.0"]
                 [ring-server "0.4.0"]
                 [selmer "0.8.2"]
                 [com.taoensso/timbre "3.4.0"]
                 [markdown-clj "0.9.64"]
                 [environ "1.0.0"]
                 [im.chit/cronj "1.4.3"]
                 [cheshire "5.4.0"]
                 [compojure "1.3.2"]
                 [ring/ring-defaults "0.1.4"]
                 [ring/ring-session-timeout "0.1.0"]
                 [ring-middleware-format "0.4.0"]
                 [noir-exception "0.2.3"]
                 [bouncer "0.3.2"]
                 [lib-noir "0.9.5"]
                 [prone "0.8.1"]
                 [buddy "0.4.1"]
                 [ragtime "0.3.8"]
                 [yesql "0.5.0-rc1"]
                 [crypto-random "1.2.0"]
                 [com.h2database/h2 "1.4.186"]]

  :min-lein-version "2.0.0"
  :uberjar-name "mcda-patient.jar"
  :repl-options {:init-ns mcda-patient.handler}
  :jvm-opts ["-server"]

  :main mcda-patient.core

  :plugins [[lein-ring "0.9.1"]
            [lein-environ "1.0.0"]
            [lein-ancient "0.6.0"]
            [ragtime/ragtime.lein "0.3.8"]]


  :ring {:handler mcda-patient.handler/app
         :init    mcda-patient.handler/init
         :destroy mcda-patient.handler/destroy
         :uberwar-name "mcda-patient.war"}

  :ragtime {:migrations ragtime.sql.files/migrations
            :database "jdbc:h2:./site.db"}

  :env {:admin-password "bcrypt+sha512$6007942c86cba182636c3abe$12$2432612431322432566d337061496d70782e5852672e5454725548742e3368365266627a6b6f697230796959686675756e6c7079562e71496d325a79" ; test
        }

  :profiles {:uberjar {:omit-source true
                       :env {:production true}
                       :aot :all}
             :production {:ring {:open-browser? false
                                 :stacktraces?  false
                                 :auto-reload?  false}}
             :dev {:dependencies [[ring-mock "0.1.5"]
                                  [ring/ring-devel "1.3.2"]
                                  [pjstadig/humane-test-output "0.7.0"]]
                   :injections [(require 'pjstadig.humane-test-output)
                                (pjstadig.humane-test-output/activate!)]
                   :env {:dev true}}})
