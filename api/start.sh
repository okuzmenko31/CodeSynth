#!/bin/sh

sleep 10

cd /apps/api


alembic upgrade head

if [ "$(grep -i '^DEBUG=True' .env)" ]; then
    uvicorn src.main:app --reload --host 0.0.0.0
else
    gunicorn src.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000 --reload
fi
