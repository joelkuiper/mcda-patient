# Stakeholder preferences elicitation

Internal project to elicit benefit-risk trade-offs from stakeholders in a questionnaire.

# To develop
This repository is build on Luminus (a Clojure web framework), Angular.js, Bower and SASS.
The steps below should get you started, provided you have installed the relevant dependencies.

````
git clone <this repo>
git submodule update --init --recursive
cd resources/
bower install
compass compile # optional

DEV=1 lein ring server-headless

````

# Config
The admin password is 'test' by default, but can changed by providing a `bcrypt+sha512` hash of a password as the
`ADMIN_PASSWORD` env variable.

By default assets are served from the `public` folder, this can be switched to `build` by passing the `DEV=0` env variable.


# To deploy

We use Leiningen (Clojure) to build a stand-alone jar which is contained in a Docker container.

````
lein ragtime migrate
lein uberjar

cd resources && r.js -o public/build.js # optional to minify the assets, required if DEV=0

docker build -t mcda/server .
````
