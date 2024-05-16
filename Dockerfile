FROM node

COPY package.json /app/
COPY server.js /app/
COPY controllers /app/
COPY db /app/
COPY models /app/
COPY routes /app/

WORKDIR /app

RUN npm install 

CMD ["node", "server.js"]