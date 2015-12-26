.DEFAULT_GOAL := build
GULP = node_modules/.bin/gulp
JSCS = node_modules/.bin/jscs --esnext --config jscs.json
JSHINT = node_modules/.bin/jshint --extract=auto --config jshint.json
NODEMON = node_modules/.bin/nodemon --ext hbs,js,json --watch lib --harmony ./lib/server.js
NPM = npm
NG = node_modules/.bin/ng

SRC_NODE = $(shell find . -path './lib/*' -not -name '*.hbs')
TS_FILES = $(shell find public/ -name  '*.ts')


.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf tmp


.PHONY: lint
lint:
	@$(JSHINT) -- $(SRC_NODE)
	@$(JSCS) -- $(SRC_NODE)


.PHONY: setup
setup: setup-hooks setup-dependencies


.PHONY: setup-dependencies
setup-dependencies:
	$(NPM) install
	$(NG) build


.PHONY: setup-hooks
setup-hooks:
	chmod oug+x githooks/*
	cp githooks/* .git/hooks/


.PHONY: start
start: start-server start-client


.PHONY:start-server
start-server:
	$(NODEMON) start


.PHONY: start-client
start-client:
	$(NG) serve
