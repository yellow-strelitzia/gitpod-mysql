FROM gitpod/workspace-mysql

USER root
# express
RUN npm install express mysql
# Setup Heroku CLI
RUN curl https://cli-assets.heroku.com/install.sh | sh
RUN chown -R gitpod:gitpod /home/gitpod/.cache/heroku
