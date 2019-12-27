# VuePress Blog

## CI/CD
### Drone
```sh
# command
node ./scripts/deploy.js staging001

openssl rand -hex 16
9a3e564e1d6d8649d4111f14332c0292

# 安装 docker server
docker run \
  --volume=/var/lib/drone:/data \
  --env=DRONE_AGENTS_ENABLED=true \
  --env=DRONE_GITHUB_SERVER=https://github.com \
  --env=DRONE_GITHUB_CLIENT_ID=f13429f784f3315391b3 \
  --env=DRONE_GITHUB_CLIENT_SECRET=929dff15b90c1c8de2f487622c47f2eb02003c09 \
  --env=DRONE_RPC_SECRET=9a3e564e1d6d8649d4111f14332c0292 \
  --env=DRONE_SERVER_HOST=111.229.81.101 \
  --env=DRONE_SERVER_PROTO=http \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --detach=true \
  --name=drone \
  drone/drone:1
```
