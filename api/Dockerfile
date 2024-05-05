# Use Ubuntu 22.04 LTS as base image
FROM ubuntu:22.04

# Environment settings to avoid Python generating .pyc files
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV POETRY_VIRTUALENVS_CREATE 0

# Set the working directory in the container
WORKDIR /app/api

# Install necessary packages, ensuring the system uses Python 3.11
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    supervisor \
    procps \
    cron \
    python3.11 \
    python3.11-venv \
    python3.11-gdbm \
    wget \
    gnupg \
    unzip \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Install pip for Python 3.11
RUN curl -sSL https://bootstrap.pypa.io/get-pip.py | python3.11

# Install Poetry
RUN pip install poetry

# Copy the Python dependencies file and install dependencies with Poetry
COPY poetry.lock /app/api
COPY pyproject.toml /app/api
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction \
    && rm -rf /root/.cache/pypoetry

# Copy the rest of the application
COPY . .

COPY ./supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Make run script executable
COPY --chmod=765 scripts/run.sh /app/run.sh
RUN chmod +x /app/run.sh

# Run application as root user
USER root

CMD ["/app/run.sh"]