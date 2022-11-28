FROM node

WORKDIR /ts-api

COPY package*.json ./

RUN npm install --only=production

COPY ./build .

EXPOSE 3000

CMD [ "npm", "start" ]