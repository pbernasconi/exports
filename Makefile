.DEFAULT_GOAL := build
BOWER = node_modules/.bin/bower
JSCS = node_modules/.bin/jscs --esnext --config jscs.json
JSHINT = node_modules/.bin/jshint --extract=auto --config jshint.json
NODEMON = node_modules/.bin/nodemon --ext hbs,js,json --watch lib --harmony lib/server.js
NPM = npm

SRC_NODE = $(shell find . -path './lib/*' -not -name '*.html')


.PHONY: clean lint setup setup-dependencies start setup-hooks


clean:
	rm -rf node_modules

lint:
	@$(JSHINT) -- $(SRC_NODE)
	@$(JSCS) -- $(SRC_NODE)

setup: setup-hooks setup-dependencies

setup-dependencies:
	$(NPM) install

setup-hooks:
	chmod oug+x githooks/*
	cp githooks/* .git/hooks/

start:
	$(NODEMON) start
