# Application Cycle Update

- Application links (header "Join Us", membership "Apply Now", join dialog) point to `https://tally.so/r/Qo2WEk`.
- The online info event and Q&A session are over: their CTAs were removed from the membership page, its CTA section, and the join dialog. The `/info-event` page still exists but is no longer linked from these places.
- Application deadline: Sunday, 8 November 2026 at 23:59 CET (`applicationDeadline` in `src/app/layout.tsx` drives the join dialog countdown; the membership page text states the same date).
