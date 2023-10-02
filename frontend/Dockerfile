#Using Node LTS Image
FROM node:18-alpine

# Install git for web3 package
RUN apk update && \
    apk add --no-cache python3 git build-base

# Create app directory
WORKDIR /app

COPY package.json /app
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]