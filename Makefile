.DEFAULT_GOAL := build
BOWER = ./node_modules/.bin/bower
NPM = npm
NODEMON = ./node_modules/.bin/nodemon


SRC_NODE    = $(shell find . \( -path './lib/*' -or -path './test/*' \) \
 								-not -path './test/fixtures/*' -name '*.js')
SRC_BROWSER = $(shell find . -path './public/*' -not -path './public/vendor/*' \
 								\( -name '*.js' -or -name '*.html' \))


SRC_ALL = $(SRC_NODE) $(SRC_BROWSER)

.PHONY: lint
lint:
	@$(JSHINT_BROWSER) -- $(SRC_BROWSER)
	@$(JSHINT_NODE) -- $(SRC_NODE)
	@$(DEV_TOOLS)/bin/check-use-strict $(SRC_NODE)
	@$(DEV_TOOLS)/bin/check-comments $(SRC_NODE)
	@$(JSCS) -- $(SRC_NODE)

.PHONY: setup
setup: setup-hooks setup-dependencies


.PHONY: setup-dependencies
setup-dependencies:
	$(NPM) install


.PHONY: start
start:
	$(NPM) start


.PHONY: clean
clean:
	$(NPM) rm -rf public/vendor && rm -rf node_modules


.PHONY: setup-hooks
setup-hooks:
	chmod oug+x githooks/*
	cp githooks/* .git/hooks/


.PHONY: test
test:
	$(ISTANBUL) cover node_modules/.bin/_mocha -- --recursive
	$(ISTANBUL) check-coverage --branches 100
