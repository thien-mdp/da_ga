FROM node:20
WORKDIR /da-ga

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
