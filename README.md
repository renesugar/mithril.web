# Mithril

[![Greenkeeper badge](https://badges.greenkeeper.io/Nebo15/mithril.web.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/Nebo15/mithril.web.svg?branch=master)](https://travis-ci.org/Nebo15/mithril.web)

[![Build history](https://buildstats.info/travisci/chart/Nebo15/mithril.web)](https://travis-ci.org/Nebo15/mithril.web)

API: https://github.com/Nebo15/mithril.api


## Demo


Try it here: http://mithril-web.herokuapp.com/

## Installation

### Heroku One-Click Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nebo15/mithril.web)

### Docker

Dashboard can be deployed as a single container from [nebo15/man.web](https://hub.docker.com/r/nebo15/mithril.web/) Docker Hub.

## Configurations

Application supports these environment variables:

| Environment Variable  | Default Value           | Description |
| --------------------- | ----------------------- | ----------- |
| `PORT`                | `8080`                  | Node.js server port. |
| `API_HOST`            | `http://dev.ehealth.world` | Ehealth API host. |
| `SITEMAP_HOSTNAME`    | `http://localhost:8080` | URL will be used in sitemap generated urls |
| `LANG_COOKIE_NAME`    | `lang`                  | Name of the cookie, where storing language variable |
| `AUTH_COOKIE_NAME`    | `token`                  | Name of the cookie, where storing token variable |
| `CLIENT_ID`           | `62c19cb9-1811-41a0-888d-3e5d9d963389`             | Front-End client id |
| `CLIENT_SECRET`       | `Qi9PR2F4KzJoeThkVlJERGwyVnpMQT09`                 | Front-End client secret |
| `SCOPES`              | `app:read app:write app:delete token:read token:write token:delete user:read user:write user:delete role:read role:write role:delete client_type:read client_type:write client_type:delete client:read client:write client:delete`                  | EHEALTH auth scopes |
| `OAUTH_URL`           | `http://auth.dev.ehealth.world/sign-in`            | Front-End client id |
| `OAUTH_REDIRECT_PATH` | `/auth/redirect`             | Redirect path for create token in EHEALTH |

## Docs

Dashboard works on top of [Mithril management API](http://docs.mithril1.apiary.io/).

## Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

## Workflow

### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

### PR

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.

## License

See [LICENSE.md](LICENSE.md).
