#build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY ./package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

# production stage
FROM node:20-alpine

WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 4000

CMD ["npx", "nodemon" , "dist/main.js"]
