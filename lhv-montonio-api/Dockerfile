FROM node:17-stretch AS base

ENV PROJECT_DIR '/home/node/service'

RUN apt-get update && apt-get install -y procps

USER node
WORKDIR ${PROJECT_DIR}

COPY --chown=node:node package*.json .
RUN npm install --no-optional --no-cache --no-optional --cache=false

COPY --chown=node:node . .

CMD [ "npm", "start" ]
