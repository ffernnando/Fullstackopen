FROM node:20

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://server:3000

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
