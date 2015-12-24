.DEFAULT_GOAL := build
GULP = node_modules/.bin/gulp
JSCS = node_modules/.bin/jscs --esnext --config jscs.json
JSHINT = node_modules/.bin/jshint --extract=auto --config jshint.json
NODEMON = node_modules/.bin/nodemon --ext hbs,js,json --watch lib --harmony lib/server.js
NPM = npm
TSC = node_modules/.bin/tsc

SRC_NODE = $(shell find . -path './lib/*' -not -name '*.hbs')
TS_FILES = $(shell find public/ -name  '*.ts')


.PHONY: clean lint setup setup-dependencies setup-hooks start


clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf tmp

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
