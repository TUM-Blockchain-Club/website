# Storybook 10 Dependency Alignment

- CI (`npm install` on Node 20 / npm 10.8.2) failed with ERESOLVE because Storybook 8 addons were installed next to Storybook 10 core.
- Removed `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/blocks`, and `@storybook/test` (merged into Storybook 10 core / `@storybook/addon-docs`). Imports now use `storybook/test` and `@storybook/addon-docs/blocks`.
- Removed `@storybook/addon-styling-webpack` (no Storybook 10.5+ support; `@storybook/nextjs` already handles CSS/PostCSS).
- Storybook packages are pinned to `~10.1.10` and `@chromatic-com/storybook` to `~5.1.2`. Newer `storybook` (10.3+) and `chromatic` (16+) declare optional peers on the vitest stack, which crashes npm 10.8.2 with `Cannot read properties of null (reading 'edgesOut')`. Loosen these ranges only after CI moves to Node 22 / npm >= 10.9.
- `.storybook/main.ts` uses `createRequire(import.meta.url)` because Storybook 10 requires an ESM main config.
