MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := run

# all targets are phony
.PHONY: $(shell egrep -o ^[a-zA-Z_-]+: $(MAKEFILE_LIST) | sed 's/://')

ifneq ("$(wildcard ./.env)","")
  include ./.env
endif

run: ## Run Server
	@npm run dev

run-static: ## Run generate html
	@npm start

build: ## Build contents
	@npm run build

generate: ## Generate html files
	@npm run generate

clean: ## Clean packages
	@rm -fr node_modules package-lock.json

install: clean ## Install packages
	@npm install

help: ## Print this help
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
