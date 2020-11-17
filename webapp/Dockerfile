FROM node:alpine
RUN apk add python make g++
RUN mkdir -p /usr/src/petfinder-frontend
WORKDIR /usr/src/petfinder-frontend

COPY package.json /usr/src/petfinder-frontend/package.json
COPY yarn.lock /usr/src/petfinder-frontend/yarn.lock

RUN yarn install
COPY . /usr/src/petfinder-frontend

RUN yarn build 
EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["yarn", "start"]