FROM gitpod/workspace-full:latest

USER root
# express
RUN npm install express node-fetch moment
# Setup Heroku CLI
RUN curl https://cli-assets.heroku.com/install.sh | sh
RUN chown -R gitpod:gitpod /home/gitpod/.cache/heroku
