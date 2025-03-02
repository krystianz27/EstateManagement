#!/bin/bash

set -o errexit
set -o nounset

worker_ready() {
  celery -A config.celery_app inspect ping
}

until worker_ready; do
  >&2 echo 'Celery Workers not available'
  sleep 1
done

echo >&2 'Celery Workers are available'

exec celery \
  -A config.celery_app \
  -b "${CELERY_BROKER_URL}" \
  flower \
  --basic_auth="${CELERY_FLOWER_USER}:${CELERY_FLOWER_PASSWORD}"
