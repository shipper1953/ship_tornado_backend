# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install all dependencies (including express, bcrypt, knex, etc.)
RUN npm install --build-from-source

# Copy rest of the app
COPY . .

# Default command
CMD ["npx", "nodemon", "src/index.js"]
