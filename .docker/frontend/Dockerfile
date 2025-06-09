FROM node:22

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY frontend .

RUN npm install -g ts-node typescript

EXPOSE 4010

# CMD ["export", "PORT=4010"]
CMD ["npm", "start"]
