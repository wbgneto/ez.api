FROM node:12.14.1

WORKDIR . /user/app

COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install

EXPOSE 3000
