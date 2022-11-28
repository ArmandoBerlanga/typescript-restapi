#  docker build -t ts-api .   
#  docker run --name diary-api -p 3000:3000 ts-api

FROM node:14.17.0-alpine3.13

WORKDIR /ts-api

COPY package*.json ./

RUN npm install --only=production

COPY ./build .

EXPOSE 3000

CMD [ "npm", "start" ]