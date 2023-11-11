# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.183.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12 (overriden in .devcontainer)
ARG VARIANT="20"
FROM mcr.microsoft.com/devcontainers/typescript-node:${VARIANT}

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive

# Installing additional OS Packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
    curl \
    git-core \
    gnupg \
    locales \
    zsh \
    wget \
    tree \
    jq \
    fonts-powerline \
    # set up locale
    && locale-gen en_US.UTF-8 && fc-cache -vf \
    # update pnpm
    && npm install -g pnpm

ENV DEBIAN_FRONTEND=dialog
ENV SHELL=/bin/zsh

ARG USER="node"
ARG GROUP="node"

USER ${USER}

# Make variables available in Shell Env
ENV USER=${USER}
ENV GROUP=${GROUP}

# Set pnpm store dir in home dir instead of default workspace forlder.
# This will allow pnpm to symlink to `node_modules` since `node_modules` is on the local volume and not shared
RUN pnpm config set store-dir /home/${USER}/pnpm-store

# Install powerlevel10k
RUN git clone https://github.com/romkatv/powerlevel10k.git /home/${USER}/.oh-my-zsh/custom/themes/powerlevel10k
ADD --chown=${USER}:${GROUP} .zshrc /home/${USER}
