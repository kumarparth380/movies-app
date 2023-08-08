# Changelog

This file contains all changelogs for the commits.

## Commit #1

Setting up eslint, prettier, tsconfig and pre-commit hooks.

## Commit #2

- Navigation setup with Home, Search and Movie Details screen.
- Setup jest and detox for e2e testing. Using Jest + Testing library for unit and integration test.
- Internationalization setup for multi-lingual support.
- Common style utils to avoid re-writing styles.

## Commit #3

- Setup api and data managers with zustand

## Commit #4

- Movies listing and details screen with api.
- Added navigation service for useful nav utils
- Added typography component to make text consistent throughout the app.

## Commit #5

- Handled loading and empty states by creating common component for the same.
- Started normalizing data and saving it in the stores to achieve indexing and handling complex data.
- Completed home and search screen functionality

## Commit #6

- Added ErrorBoundary to catch errors anywhere in its child component tree, log those errors, and displays a fallback UI instead of the app crash.
- Completed favorites features using zustand state.
- Refactoring loading/error states.

## Commit #7

- Added integration tests for core app functionality and some tests for zustand store by fixing the mock for zustand.
- Added debounce to search api.
