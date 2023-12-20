# Use an official Node runtime as the base image
FROM node:14

# The working directory for both the frontend and backend in the container will be /mynodeapp
WORKDIR /mynodeapp

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application source code into the working directory
COPY . .

# The WORKDIR's context is /mynodeapp, so this will correctly place your source files including the 
# public directory and src

# Map port 3000 to the outside of the container
EXPOSE 3000

# If index.js resides in the src directory, we need to adjust the CMD to reflect that
CMD ["node", "src/index.js"]