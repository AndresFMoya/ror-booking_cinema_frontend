FROM node:11.10.1
WORKDIR /myapp/client
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3001

CMD ["yarn", "start"]