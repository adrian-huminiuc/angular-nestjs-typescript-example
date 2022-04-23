FROM node:17-stretch AS base

RUN apt-get update && apt-get install -y gettext-base

USER node
WORKDIR /home/node/service

COPY --chown=node:node package*.json .
RUN npm install --no-cache --no-optional --cache=false

COPY --chown=node:node . .

CMD [ "npm", "start", "--host", "0.0.0.0"]
