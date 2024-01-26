# Use a base image that supports both ARM and x86 architectures
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Set environment variables if needed
# ENV NODE_ENV=production

# Command to run your application
CMD ["node", "index.js"]
