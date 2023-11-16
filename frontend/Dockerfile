# Define the image you want to build from.
# In this case, we are using the latest LTS (long term support) version of Node.
FROM node:18
# Create app directory to hold application code inside the image.
WORKDIR /usr/src/app
# The image comes with Node.js and NPM already installed.
# We just need to install the rest of our dependencies.
# Copy package.json and package-lock.json to the app directory on the image.
COPY package*.json ./
# Install dependencies.
RUN npm install
# Uncomment the following line if you are building code for production.
# RUN npm ci --omit=dev
# Bundle the app's source code inside the Docker image.
COPY . .

# ################## FOR PROD #######################
# # Build React app for production
RUN npm run build
# Serve the build version in a static server
RUN npm install -g serve
# Expose port 8080 so it can be mapped by Docker daemon to Google App Engine.
EXPOSE 8080
# Define the command to run your app using CMD which defines your runtime.
CMD [ "serve", "-s", "dist", "-p", "8080" ]
# ###################################################

################## FOR DEV #######################
# # Expose port 5173 so it can be mapped by Docker daemon to Google App Engine.
# EXPOSE 5173
# # Define the command to run your app using CMD which defines your runtime.
# CMD [ "npm", "run", "dev" ]
###################################################