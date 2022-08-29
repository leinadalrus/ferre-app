# syntax=docker/dockerfile:1
FROM node:16.17.1
ENV NODE_ENV=production
WORKDIR /src/
COPY ["package.json", "yarn.lock", "./"]
RUN npm i --production
COPY ..
CMD ["node", "app.js"]