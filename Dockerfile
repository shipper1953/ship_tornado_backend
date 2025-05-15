# Start from an official Node.js image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy only package.json and lock file first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app source
COPY . .

# Expose app port
EXPOSE 5001

# Start the app
CMD ["npm", "start"]
