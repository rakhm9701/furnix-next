FROM node:20.17.0-alpine AS deps

WORKDIR /usr/src/furnix-next

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps AS build

ARG REACT_APP_API_URL
ARG REACT_APP_API_GRAPHQL_URL
ARG REACT_APP_API_WS

ENV NEXT_TELEMETRY_DISABLED=1
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_GRAPHQL_URL=$REACT_APP_API_GRAPHQL_URL
ENV REACT_APP_API_WS=$REACT_APP_API_WS

COPY . .
RUN yarn build

FROM node:20.17.0-alpine AS production

WORKDIR /usr/src/furnix-next

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY --from=build /usr/src/furnix-next/.next ./.next
COPY --from=build /usr/src/furnix-next/public ./public
COPY --from=build /usr/src/furnix-next/next.config.js ./next.config.js
COPY --from=build /usr/src/furnix-next/next-i18next.config.js ./next-i18next.config.js

RUN chown -R node:node /usr/src/furnix-next

USER node
EXPOSE 3000

CMD ["yarn", "start"]
