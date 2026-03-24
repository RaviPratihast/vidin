# VidIn

VidIn is a React video library app with browsing, search, auth-gated lists, and playback flows.

## Overview

The app supports a full watch flow:

- Explore and search videos
- Open a single video details page
- Manage liked videos, watch later, history, and playlists
- Authenticate users before protected routes

## Responsive Design

The UI is mobile-first and supports both mobile and desktop:

- Fixed responsive header with mobile menu
- Shared search experience across breakpoints
- Route links with active-state handling on desktop and mobile
- Content pages built with responsive spacing utilities

## Local Development

```bash
git clone git@github.com:RaviPratihast/vidin.git
cd vidin
npm install
npm start
```

## Scripts

- `npm start` - runs the app in development mode
- `npm run build` - creates a production build
- `npm test` - runs tests

## Tech Stack

- React 18
- React Router 6
- Tailwind CSS 3.4
- React Toastify
- Lucide React

## Demo

![VidIn](/public/image/vidIn.gif)

## Notes

Current implementation is JavaScript-first. A strict TypeScript migration can be done in a separate incremental pass to avoid destabilizing runtime behavior.
