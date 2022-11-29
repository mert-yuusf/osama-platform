FROM node:16-alpine

WORKDIR /app

ADD ./pachage*.json ./app

ADD . /app

RUN npm install

EXPOSE 8080


CMD [ "npm" ,"start"]