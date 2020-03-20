FROM node:11.10.1
WORKDIR /myapp/client
COPY package*.json ./
RUN yarn install; \
    yarn global add serve
COPY . .
RUN yarn build
EXPOSE 3001

CMD serve -p $PORT -s build