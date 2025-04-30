FROM node:latest

# COPY index.js /home/app/index.js
# COPY package.json /home/app/package.json

# or

COPY . /home/app

WORKDIR /home/app/

RUN npm install

EXPOSE 5000

CMD [ "node", "index"]