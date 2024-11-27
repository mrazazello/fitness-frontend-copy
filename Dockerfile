FROM node:18.19.0

WORKDIR /var/app

ARG CONTAINER_UID=1000
ARG CONTAINER_GID=1000

RUN usermod -u $CONTAINER_UID node && groupmod -g $CONTAINER_GID node

#RUN set -ex                                                 && \
#    echo 'Giving permissions to files'                      && \
#    chown -R node:node /var/app                             

USER node

EXPOSE 3000

