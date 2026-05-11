# Use a lightweight version of Node
   FROM node:18-alpine
   
   # Set the working directory inside the container
   WORKDIR /usr/src/app
   
   # Copy package files first
   COPY package*.json ./
   
   # Install dependencies
   RUN npm install --production
   
   # Copy the rest of the code
   COPY . .
   
   # Expose port 3000
   EXPOSE 3000
   
   # Start the app
   CMD [ "node", "server.js" ]
