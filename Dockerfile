FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

# have no idea where remix sets it, use the default
EXPOSE 3000

#start the remix server
CMD ["npm", "start"]
