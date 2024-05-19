#!/bin/sh

# Define the application base directory
APP_DIR="/app/api"

# Navigate to the application directory
cd "$APP_DIR" || { echo "Failed to change directory to $APP_DIR. Exiting."; exit 1; }

# Check if the required arguments are provided
if [ "$#" -ne 6 ]; then
    echo "Usage: $0 -u <username> -e <email> -p <password>"
    exit 1
fi

# Parse the arguments
while getopts "u:e:p:" opt; do
    case $opt in
        u) USERNAME="$OPTARG"
        ;;
        e) EMAIL="$OPTARG"
        ;;
        p) PASSWORD="$OPTARG"
        ;;
        \?) echo "Invalid option -$OPTARG" >&2
            exit 1
        ;;
    esac
done

# Export script to the PYTHONPATH to avoid relative import issues
export PYTHONPATH="$PYTHONPATH:$APP_DIR/src/scripts/create_admin.py"

# Run the Python script with the provided arguments
python3.11 -m src.scripts.create_admin -u "$USERNAME" -e "$EMAIL" -p "$PASSWORD"
