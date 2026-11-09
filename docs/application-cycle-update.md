# Application Cycle Update

- Application links (header "Join Us", membership "Apply Now", join dialog) point to `https://tally.so/r/Qo2WEk`.
- The online info event and Q&A session are removed entirely: no CTAs on the membership page or in the join dialog, and the `/info-event` page is deleted. `/info-event` redirects to `/membership` (`next.config.ts`) so old links still land somewhere useful.
- Application deadline: Sunday, 15 November 2026 at 23:59 CET (`applicationDeadline` in `src/app/layout.tsx` drives the join dialog countdown; the membership page text states the same date). Extended from 8 November; the countdown removed in ad36b79 is back.
- The conference is over: its CTAs and date lines are gone from the membership page and the join dialog, and the "Can I meet the club before applying?" FAQ entry is removed.
