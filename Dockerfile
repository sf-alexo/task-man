# Use a base Node.js image
FROM node:16

# Set working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies for both applications
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React application
RUN cd frontend && npm run build

# Set environment variables for the Nest.js application
ENV NODE_ENV=production

# Expose ports for Nest.js and React
EXPOSE 3000
EXPOSE 3001

# Start both applications using a process manager like PM2
CMD ["npx", "pm2-runtime", "start", "ecosystem.config.js"]
