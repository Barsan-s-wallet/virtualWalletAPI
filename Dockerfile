FROM node:alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN apk add --no-cache tini

EXPOSE 5000

WORKDIR /src

COPY package*.json ./

RUN npm install && npm install -g typescript

RUN mkdir -p ./build

COPY . ./

RUN tsc

ENTRYPOINT [ "/sbin/tini","--" ]

CMD ["npm","run","dev"]