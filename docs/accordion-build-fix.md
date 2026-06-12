# Accordion Build Fix

Resolved a Tailwind build error in `src/components/accordion/accordion.css`.

The accordion chevron previously used `group-data-[state=open]:rotate-180` inside `@apply`. Tailwind 3.4 did not expand that arbitrary group-data variant from CSS during the Next.js Turbopack build.

The open-state rotation now uses a normal CSS selector:

- `.accordion-item[data-state="open"] .accordion-chevron`

This preserves the Radix accordion behavior while keeping the class expansion compatible with the current Tailwind/PostCSS pipeline.
