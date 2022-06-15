FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./

FROM base AS build
# ENV NODE_ENV=production

RUN yarn

COPY . .
RUN yarn build

FROM base as prod-build

RUN yarn install --production
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public

EXPOSE 80
CMD ["yarn", "start"]
