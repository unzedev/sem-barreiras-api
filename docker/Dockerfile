FROM node:16.14

WORKDIR /app

COPY package.json ./

RUN npm install -g npm@8.19.2
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev:server"]
