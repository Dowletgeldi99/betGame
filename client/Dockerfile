FROM node:16-alpine

WORKDIR /app/client

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "run", "dev"]