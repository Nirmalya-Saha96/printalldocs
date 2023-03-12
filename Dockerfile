FROM node
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm run NS_DOCKER
EXPOSE 5000 
EXPOSE 3000
CMD "npm" "run" "dev"