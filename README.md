Exports
---

### Install
To install and setup the project, the Makefile contains a set of commands,
which can all be run at once using

```console
make setup
```


### Run
A server runs locally at `localhost:8000`, and watches both `/lib` and `/src`
files for changes, automatically reloading the server.

```console
make start
```


### Test
We run linting for both `jshint` and `jscs` on all node files. Angular files will
need to be configured more, with separate rules for Typescript.

```console
make lint
make test  # not implemented yet
```
