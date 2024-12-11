# Step 1: Use Node.js as the base image
FROM node:18-alpine
 
# Step 2: Set the working directory in the container
WORKDIR /app
 
# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./
 
# Step 4: Install dependencies
RUN npm install
 
# Step 5: Copy the entire project to the container
COPY . .
 
# Step 6: Build the application
RUN npm run build
 
# Step 7: Expose the port that the app will run on
EXPOSE 3000
 
# Step 8: Start the application
CMD ["npm", "start"]