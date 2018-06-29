#!/bin/bash -x

unset http_proxy
export DATABASE_URL='postgres://hydra:password@localhost:5432/hydradb?sslmode=disable'
export SYSTEM_SECRET=d69551a4-88cd-46b9-a937-2719fd1e3543
export LOG_LEVEL=debug
export OAUTH2_ISSUER_URL=http://localhost/
export OAUTH2_LOGIN_URL=http://localhost/provider/login
export OAUTH2_CONSENT_URL=http://localhost/provider/consent
export EXT_OPTS=--dangerous-force-http

hydra serve --dangerous-force-http
