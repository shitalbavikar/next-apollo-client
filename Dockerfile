FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the frontend app."
LABEL maintainer = ["bavikarster@gmail.com"]

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "dev"]