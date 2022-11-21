# Build environment
FROM node:16.18.0 as build

WORKDIR /usr/app

COPY --chmod=+x package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

# Production environment
FROM node:16.18.0 as production

WORKDIR /usr/app

COPY --chmod=+x --from=build /usr/app/package.json /usr/app/yarn.lock /usr/app/wait-for.sh ./
COPY --chmod=+x --from=build /usr/app/prisma ./prisma
COPY --chmod=+x --from=build /usr/app/dist ./src

RUN chmod +x ./wait-for.sh

RUN yarn --production

EXPOSE 3333

CMD yarn run-s prisma:generate prisma:prod start
