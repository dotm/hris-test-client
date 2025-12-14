# Notes

How to Run in Local: yarn dev

## Deploying Changes to Production

- Just push to origin/master in the frontend repo

## First Deploy to Production

Local Docker Build:

- Make sure Docker is running in host
- Deploy the backend repo first
- Fill .env.production with environment variables
- docker build -f Dockerfile.release -t hris-release-frontend .
- Optional step: docker run -it -p 3000:3000 hris-release-frontend bash
  - Do this only if you want to test the release in local
- docker create --name hris-tar-frontend hris-release-frontend
- From host (if you haven't): mkdir tar-release
  - also add this directory to .gitignore
- docker cp hris-tar-frontend:/root/hris/hris.tar.gz ./tar-release/hris.tar.gz
- docker rm hris-tar-frontend

Setup instance:
- ssh -i "hris-test-ec2-key-pair.pem" ubuntu@ec2-13-229-208-46.ap-southeast-1.compute.amazonaws.com
- mkdir frontend

Upload build:
- scp -i "hris-test-ec2-key-pair.pem" ./tar-release/hris.tar.gz ubuntu@ec2-13-229-208-46.ap-southeast-1.compute.amazonaws.com:~/frontend
- scp -i "hris-test-ec2-key-pair.pem" ./package.json ubuntu@ec2-13-229-208-46.ap-southeast-1.compute.amazonaws.com:~/frontend
- ssh -i "hris-test-ec2-key-pair.pem" ubuntu@ec2-13-229-208-46.ap-southeast-1.compute.amazonaws.com
  - cd ~/frontend
  - tar -xzvf hris.tar.gz

Serve:
- cd ~/frontend
- yarn install --production
- sudo pm2 start "yarn start -p 3000" --name hris-web
  - sudo pm2 logs hris-web

You can also use Netlify (need to have HTTPS backend with domain):

- Push frontend to GitHub repo
- Sign in to Netlify using the same GitHub account that has the repo above
  - https://app.netlify.com/
- In Projects menu, click Add new project, and then Import an existing project
- Deploy project with GitHub
  - Authorize Netlify
- Select the frontend repo
- Fill:
  - Project name: HRISCodingTest
  - Branch to deploy: master
  - Build command: CI=false yarn build
  - Add environment variables

## Local Setup Steps

- git init
- yarn install
- ignore env files (see git commit)
- add and fill .env.local file
- cp .env.local .env
- yarn dev

# Kotakodelab Full-Stack / Frontend homework (TypeScript, REST API)

## Requirements

- [Node.js 16.14.2](https://nodejs.org) or later
- [Yarn 1.22.17](https://classic.yarnpkg.com) or later

## Configuration

Copy file `.env.example` to `.env`

```bash
cp .env.example .env
```

| Key                      | Description                       | Required | Type     |
|--------------------------|-----------------------------------|----------|----------|
| `APP_NAME`               | App Name                          | **✓**    | `string` |
| `APP_VERSION`            | App Version                       |          | `string` |
| `APP_BUILD_SIGNATURE`    | App Build Signature               |          | `string` |
|                          |                                   |          |          |
| `API_BASE_URL`           | API Base URL                      | **✓**    | `string` |
|                          |                                   |          |          |
| `MOCK_API_BASE_URL`      | Mock API Base URL                 |          | `string` |
| `MOCK_API_CLIENT_ID`     | Mock API Credential Client ID     |          | `string` |
| `MOCK_API_CLIENT_SECRET` | Mock API Credential Client Secret |          | `string` |

## Installation

```bash
yarn install --frozen-lockfile
```

> Why use `--frozen-lockfile`?
>
> See https://classic.yarnpkg.com/en/docs/cli/install#toc-yarn-install-frozen-lockfile

## Usage

- Start Application
  ```bash
  yarn dev
  ```
- Build Application
  ```bash
  yarn build
  ```
- Check `package.json` to see more script.

## Requirements Checklist
- [x] Staff should be able to login
- [ ] Staff should be able to logout
- [ ] Staff should be able to see another staff
- [ ] Staff should be able to update the staff data
- [ ] Staff should not be able to update another staff data
- [ ] Staff should be able to clock in
- [ ] Staff should be able to clock out