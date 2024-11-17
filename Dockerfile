# docker build -t kribor/sunrise-timer-ha:20241116 .
# docker push -t kribor/sunrise-timer-ha:20241116
# docker build -t kribor/sunrise-timer-ha:latest .
# docker push -t kribor/sunrise-timer-ha:latest

FROM node:22

RUN apt-get update && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN npm install -g nodemon
RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY *.json yarn.lock *.yaml /opt/app/

RUN yarn --pure-lockfile

COPY src /opt/app/src

CMD yarn start
