#!/bin/sh

# Define the application base directory
APP_DIR="/app/api"

# Wait for dependent services to be ready (if necessary)
sleep 5

# Automatically load the .env file if found
set -a
if [ -e "$APP_DIR/.env" ]; then
    . "$APP_DIR/.env"
else
    echo "No .env file found. Exiting."
    exit 1
fi
set +a


# Navigate to the application directory
cd "$APP_DIR" || { echo "Failed to change directory to $APP_DIR. Exiting."; exit 1; }

# Database migration
if grep -qi '^RUN_MIGRATIONS=True' .env; then
    alembic upgrade head || { echo "Alembic upgrade failed. Exiting."; exit 1; }
fi

# Check for debug mode and start the server accordingly
APP_MODE_MESSAGE="Starting the application in %s mode..."
if grep -qi '^DEBUG=True' .env; then
    printf "$APP_MODE_MESSAGE\n" "debug"
    uvicorn src.main:app --reload --host 0.0.0.0 --port "$API_APP_PORT"
else
    printf "$APP_MODE_MESSAGE\n" "production"
    gunicorn src.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind "0.0.0.0:$API_APP_PORT"
fi
