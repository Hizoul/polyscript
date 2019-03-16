FROM alpine:latest
MAINTAINER Matthias Müller-Brockhausen <matthias@mueller-brockhausen.de>
RUN apk --update --no-progress add ffmpeg perl openssh nodejs nodejs-npm unrar bash git python xz musl iptables busybox build-base p7zip && rm -rf /var/cache/apk/* && npm install npm@latest -g && npm cache clean -g --force
RUN mkdir -p /var/app
ADD build.7z /var/app
RUN cd /var/app && 7za x build.7z && cd server && npm install
EXPOSE 4202
CMD cd /var/app/server && node isoapp.js