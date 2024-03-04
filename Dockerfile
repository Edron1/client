FROM node:20

WORKDIR /client/

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080

CMD npm run dev