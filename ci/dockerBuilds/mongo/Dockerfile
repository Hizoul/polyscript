from ubuntu:16.04

RUN apt-get update -y && apt-get upgrade -y && apt-get install busybox mongodb -y

VOLUME /data/db
EXPOSE 27017 28017

CMD [ "mongod" ]