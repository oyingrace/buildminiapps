# Build Onchain Mini Apps with AI

This project is a web-based builder that lets teams design, preview, and iterate on onchain mini apps with the help of AI-assisted workflows. The interface focuses on fast feedback loops, showcasing the current project snapshot alongside contextual editing tools so product, design, and engineering stakeholders can collaborate without leaving the browser.

## Key Features
- AI-guided prompts that turn natural-language requirements into deployable onchain modules.
- Real-time preview pane with live reload so changes are immediately visible.
- Project library for organizing drafts, published apps, and community templates.
- Account management, settings, and pricing flows tailored for multi-seat teams.
- Opinionated UI components (navbar, sidebar, loaders, footer) that keep the overall experience consistent.

## Architecture Overview
- Built with Vite + React + TypeScript for a snappy developer experience.
- Centralized providers and configs handle auth, API calls, and shared state.
- Modular page structure (`Home`, `Projects`, `Community`, `Pricing`, `Settings`, and more) keeps routing clear.
- Shared utilities in `src/lib` and `src/types` promote consistency across views.