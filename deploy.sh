#!/usr/bin/env bash
# deploy.sh: ENZONIC_TOKEN=ecl_… PROJECT_ID=… ./deploy.sh [folder]
set -euo pipefail
API=https://panel.enzonic.com/api/cloud/v1
AUTH="Authorization: Bearer $ENZONIC_TOKEN"
tar -czf /tmp/site.tgz -C "${1:-.}" --exclude=./.git --exclude=./node_modules .
UP=$(curl -fsS -X POST $API/uploads -H "$AUTH" -H "Content-Type: application/json" -d '{"filename":"site.tgz"}')
curl -fsS -X PUT "$(jq -r .put_url <<<"$UP")" -H "Content-Type: application/gzip" --data-binary @/tmp/site.tgz
curl -fsS -X POST $API/projects/$PROJECT_ID/deployments -H "$AUTH" -H "Content-Type: application/json" \
  -d "$(jq -nc --arg u "$(jq -r .upload_id <<<"$UP")" '{upload_id: $u, target: "production"}')" | jq -r .url
  
