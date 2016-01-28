.DEFAULT_GOAL := build
GULP = node_modules/.bin/gulp
JSCS = node_modules/.bin/jscs --esnext --config jscs.json
JSHINT = node_modules/.bin/jshint --extract=auto --config jshint.json
MOHCA = node_modules/.bin/mocha --harmony
NODE = node
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


.PHONY: lint
lint:
	@$(JSHINT) -- $(SRC_NODE)
	@$(JSCS) -- $(SRC_NODE)


.PHONY: setup
setup: setup-dependencies


.PHONY: setup-dependencies
setup-dependencies:
	$(NPM) install

.PHONY: setup-dist
setup:
	$(GULP) build


.PHONY: start
start:
	$(GULP) build
	$(NODE) ./lib/server.js


.PHONY: watch
watch:
	$(MAKE) start-server & $(MAKE) start-client


.PHONY: start-server
start-server:
	$(NODEMON) start


.PHONY: start-client
start-client:
	$(GULP) build-watch


.PHONY: test
test:
	$(MOCHA) $(SRC_TEST)
