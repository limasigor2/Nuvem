FROM node:alpine

WORKDIR /app

COPY build/ ./

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "./"]
