FROM node:16

RUN apt-get update && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN npm install -g nodemon
RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY *.json yarn.lock *.yaml /opt/app/
COPY src /opt/app/src

RUN yarn --pure-lockfile

CMD yarn start
