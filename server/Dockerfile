FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
