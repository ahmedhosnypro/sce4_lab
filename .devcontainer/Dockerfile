FROM mcr.microsoft.com/devcontainers/dotnet:latest

# Install additional tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    htop \
    net-tools \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install .NET tools for development
RUN dotnet tool install -g dotnet-ef || true
RUN dotnet tool install -g dotnet-aspnet-codegenerator || true

ENV PATH=$PATH:/root/.dotnet/tools

# Copy Oh My Zsh installation script and config
COPY scripts/install_ohmyzsh.sh /tmp/install_ohmyzsh.sh
COPY scripts/.p10k.zsh /tmp/.p10k.zsh

# Install Oh My Zsh, Powerlevel10k, and plugins
RUN chmod +x /tmp/install_ohmyzsh.sh && \
    /tmp/install_ohmyzsh.sh && \
    rm /tmp/install_ohmyzsh.sh

# Set zsh as default shell
ENV SHELL=/usr/bin/zsh
SHELL ["/usr/bin/zsh", "-c"]

# Copy bun installation script
COPY scripts/install_bun.sh /tmp/install_bun.sh

# Install bun
RUN chmod +x /tmp/install_bun.sh && \
    /tmp/install_bun.sh && \
    rm /tmp/install_bun.sh