.DEFAULT_GOAL := build
GULP = node_modules/.bin/gulp
JSCS = node_modules/.bin/jscs --esnext --config jscs.json
JSHINT = node_modules/.bin/jshint --extract=auto --config jshint.json
MOHCA = node_modules/.bin/mocha --harmony
NODEMON = node_modules/.bin/nodemon --ext hbs,js,json --watch lib --harmony ./lib/server.js
NPM = npm
NG = node_modules/.bin/ng

SRC_NODE = $(shell find . -path './lib/*' -not -name '*.hbs')
TS_FILES = $(shell find . -path './public/*' -name  '*.ts')
SRC_TEST = $(shell find . -path './tests/*' -name '*.js')


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
start:
	$(MAKE) start-server & $(MAKE) start-client & open http://localhost:3000/


.PHONY: start-server
start-server:
	$(NODEMON) start


.PHONY: start-client
start-client:
	$(NG) serve


.PHONY: test
test:
	$(MOCHA) $(SRC_TEST)
