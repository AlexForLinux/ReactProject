#!/bin/bash

sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo

sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl enable docker
sudo systemctl start docker

cat > Dockerfile << EOF
FROM node:alpine AS development
ENV NODE_ENV development

WORKDIR .

COPY ./reactapp/package*.json .

RUN npm install

COPY ./reactapp .

CMD ["npm","start"]

EXPOSE 3000
EOF

sudo docker build -t react .

cat > docker-compose.yml << EOF

version: '3'

services:
 reactapp:
  image: react
  restart: always
  ports:
   - 3000:3000

EOF