# Stakeholder preferences elicitation

Internal project to elicit benefit-risk trade-offs from stakeholders in a questionnaire.

# To deploy

We use Leiningen (Clojure) to build a stand-alone jar which is contained in a Docker container.

````
lein ragtime migrate
lein uberjar
docker build -t mcda/server .
````
