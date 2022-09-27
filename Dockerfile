FROM node:16.15-bullseye

RUN apt update

ENV NODE_PATH=/usr/local/node_modules

WORKDIR /project

RUN npm install -y --location=global npm@6 --prefix /usr/local/
RUN npm install --save-dev -y express --prefix /usr/local/
RUN npm install --save-dev -y express-graphql --prefix /usr/local/
RUN npm install --save-dev -y graphql --prefix /usr/local/
RUN npm install --save-dev -y superagent --prefix /usr/local/
RUN npm install --save-dev -y mocha --prefix /usr/local/
RUN npm install --save-dev -y sequelize --prefix /usr/local/
RUN npm install --save-dev -y pg pg-hstore --prefix /usr/local/
RUN npm install --save-dev -y dotenv --prefix /usr/local/
RUN npm install --save-dev -y simple-git --prefix /usr/local/
RUN npm install --save-dev -y crypto-js@^4.1.1 --prefix /usr/local/
RUN npm install --save-dev -y child_process@^1.0.2 --prefix /usr/local/
RUN npm install --save-dev -y uuidv4@^6.2.13 --prefix /usr/local/

RUN apt-get update && \
    apt-get -y install tar


COPY . .

EXPOSE 4005/tcp

CMD npm start
