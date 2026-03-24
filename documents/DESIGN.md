# DESIGN.md

This file defines the UI refactor direction for VidIn.

## Visual Direction

- Reference style: dark media dashboard with editorial hierarchy.
- Primary surfaces: deep slate backgrounds with restrained blue accent.
- Layout model:
  - Mobile first at 375px with drawer navigation.
  - Desktop with persistent sidebar + top utility/search bar.

## Core Rules

- Clarity over novelty.
- No decorative color usage without semantic intent.
- 4pt spacing rhythm via Tailwind scale.
- Minimum touch target size 44x44.
- Focus-visible states required for all interactive elements.
- Empty states are explicit and actionable.

## Tokens (Mapped to Tailwind)

- Background: `bg-slate-950`
- Elevated surface: `bg-slate-900`
- Border: `border-slate-700` / `border-slate-800`
- Primary text: `text-slate-100`
- Secondary text: `text-slate-300` / `text-slate-400`
- Accent action: `bg-blue-500` + hover `bg-blue-400`
- Radius tier:
  - Small: `rounded-lg`
  - Medium: `rounded-xl`
  - Large: `rounded-2xl`

## Interaction States

- Default / hover / focus-visible for buttons, links, inputs.
- Empty list states on every collection page.
- Login and signup form states styled with consistent input controls.

## Responsive Strategy

- `375px`: top bar + drawer nav + full-width cards.
- `768px`: expanded content grid and spacing.
- `1280px+`: fixed left sidebar, top search bar, dense card layout.
