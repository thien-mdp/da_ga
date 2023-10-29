FROM node:20
WORKDIR /da-ga

COPY package.json .
RUN yarn install

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
