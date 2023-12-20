# Use an official Node runtime as the base image
FROM node:14

# Work directory will be /mynodeapp/src inside the container
# which corresponds to mynodeapp/src on your host system
WORKDIR /mynodeapp/src

# Copy package.json and package-lock.json to the WORKDIR
COPY package*.json ./

# Install app dependencies
# Note that `node_modules` should not be copied from host to container,
# they should be installed inside the container
RUN npm install

# Now copy the rest of the application source code to the WORKDIR
COPY . /mynodeapp/


# Map port 3000 to the outside of the container
EXPOSE 3000

# Define the command to run app
CMD ["node", "index.js"]