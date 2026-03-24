# Engineering Contract

This document defines implementation standards for this repository.

## Core Principles

- Keep changes minimal and production-safe.
- Prioritize readability and maintainability.
- Handle loading, error, empty, and edge states.
- Avoid shortcuts that hide risk.

## Coding Standards

- Prefer explicit, predictable logic over clever one-liners.
- Use early returns to reduce nesting.
- Keep constants centralized and clearly named.
- Avoid comments unless they explain non-obvious intent.

## Type Safety Direction

- Target strict TypeScript for all new code.
- Do not use `any` unless there is no safer option and it is documented.
- Prefer `unknown` plus narrowing when input shape is uncertain.

## React and UI

- Functional components only.
- Keep component responsibilities narrow.
- Ensure keyboard and focus-safe interactions for controls and menus.
- Use responsive, mobile-first layouts that also scale to desktop.
- Keep spacing controlled by parent layout containers.

## Data and State

- Keep data-fetching concerns separate from presentation concerns.
- Handle failed and slow network requests explicitly.
- Validate assumptions around undefined or malformed data.

## Quality Gate

Before completing a task:

1. Verify behavior on mobile and desktop breakpoints.
2. Run lint/test/build checks relevant to changed files.
3. Confirm no debug code, TODOs, or temporary hacks were introduced.
