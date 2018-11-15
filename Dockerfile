FROM ubuntu:18.04

USER root

EXPOSE 8080

# Create folder
RUN mkdir -p /var/www

VOLUME /var/www

# Install NodeJS
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y nodejs gnupg python gcc make g++ curl

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# Install Git
RUN apt-get install git -y

# Install Python 2.7
RUN apt-get install python2.7 -y
ENV PYTHON python2.7

# Install make
RUN apt-get install build-essential -y

# Install gcc
RUN apt-get install gcc -y

# Install PM2
RUN npm install pm2 -g

# Setup environment variables
##
### MongoDB
# Set URI of your MongoDB server
ENV MONGO_HOST mongo
# Set port of your MongoDB server (defautl : 27017)
ENV MONGO_PORT 27017
# Set name of your database
ENV MONGO_DB nuitinfo
##
### API settings
ENV API_URL http://localhost:8080
ENV WEBSERVER_URL http://localhost:8080
##
### YOU HAVE TO CHANGE THE SECRET
ENV BCRYPT_SALT_ROUNDS 10

WORKDIR /var/www

CMD npm i && npm run build && npm run serve
