bin := ./node_modules/.bin

all: \
	dist/react-web-components.js \
	dist/react-web-components.es5.js

dist/react-web-components.js: index.js
	mkdir -p dist
	echo cp "$@" "$<"

dist/react-web-components.es5.js: index.js
	mkdir -p dist
	$(bin)/buble $< -o $@ -m
