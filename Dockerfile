FROM ubuntu:14.10
ENV DEBIAN_FRONTEND noninteractive

RUN echo "Europe/Amsterdam" > /etc/timezone
RUN dpkg-reconfigure tzdata

# Set locale
RUN locale-gen en_US.UTF-8
RUN update-locale LANG=en_US.UTF-8

RUN apt-get update
RUN apt-get upgrade -y

# create deploy user
RUN useradd --create-home --home /var/lib/deploy deploy

RUN apt-get -y install openjdk-8-jre-headless --no-install-recommends --no-install-suggests

ADD ./target/mcda-patient.jar /var/lib/deploy/mcda-patient.jar
ADD ./site.db.mv.db /site.db.mv.db
ADD ./site.db.trace.db /site.db.trace.db

RUN chown deploy.deploy /site.db.trace.db
RUN chown deploy.deploy /site.db.mv.db

USER deploy
EXPOSE 3000
ENV HOME /var/lib/deploy
ENV DEV false
ENTRYPOINT ["java"]
CMD ["-jar", "/var/lib/deploy/mcda-patient.jar"]
