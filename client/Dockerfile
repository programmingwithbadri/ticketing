FROM node:alpine
# Minor bug fix specified only for react app
ENV CI=true
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]