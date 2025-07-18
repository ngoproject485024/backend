FROM alpine:latest

WORKDIR /app

COPY . .

RUN npm install &&\
    nest build

EXPOSE 4000

CMD ["node", "dist/main.js"]
