FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY backend .

RUN npm install -g ts-node typescript

EXPOSE 4010

CMD ["npx", "ts-node", "src/server.ts"]
