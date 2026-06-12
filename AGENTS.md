# Agent Notes

## Project Structure

- `src/app/` contains Next.js App Router layouts and pages.
- `src/components/` contains shared UI components such as the header, footer, buttons, accordions, and dialogs.
- `src/service/` contains Strapi-facing service helpers.
- `src/stories/` contains Storybook stories.
- `public/` contains static assets served by Next.js.
- `docs/` contains agent-facing notes about meaningful changes.

## Tooling

- Use `pnpm` for Node.js dependency installation and scripts.
- Use a Python virtual environment for any Python work.
- This is a Next.js and React project styled with Tailwind CSS.
- Storybook is available through the package scripts.

## Conventions

- Keep route-level changes in `src/app/` and shared UI changes in `src/components/`.
- Header navigation is configured from `menuLinks` in `src/app/layout.tsx`.
- Prefer existing components and patterns before introducing new abstractions.
