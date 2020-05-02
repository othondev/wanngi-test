FROM node:10
WORKDIR /usr/src/app/mongo

RUN npm install -g migrate-mongo
RUN npm install bcrypt

COPY . .

CMD [ "migrate-mongo", "up" ]

