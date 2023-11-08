FROM node:lts-alpine as base
WORKDIR /user/app/
COPY . /user/app/
RUN npm install --omit=dev
FROM base as production
ARG API_URL
ENV API_URL ${API_URL}
EXPOSE 3000
RUN npm install typescript
RUN npx tsc && cp -R views dist 
CMD ["node", "dist/app.js"]

