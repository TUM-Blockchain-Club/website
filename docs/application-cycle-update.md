# Application Cycle Update

- Application links (header "Join Us", membership "Apply Now", join dialog) point to `https://tally.so/r/Qo2WEk`.
- The online info event and Q&A session are removed entirely: no CTAs on the membership page or in the join dialog, and the `/info-event` page is deleted. `/info-event` redirects to `/membership` (`next.config.ts`) so old links still land somewhere useful.
- Application deadline: Sunday, 8 November 2026 at 23:59 CET (`applicationDeadline` in `src/app/layout.tsx` drives the join dialog countdown; the membership page text states the same date).
