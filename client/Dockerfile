FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

EXPOSE 3000

CMD ["npm", "run", "dev"]
