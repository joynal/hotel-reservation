FROM node:12-alpine3.10

# Set a working directory
WORKDIR /usr/src/app

# Copy application files
COPY . /usr/src/app

RUN npm i --production

CMD ["npm", "run", "start"]