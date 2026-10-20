# Application Cycle Update

- Application links (header "Join Us", membership "Apply Now", join dialog) point to `https://tally.so/r/Qo2WEk`.
- Info event links point to the internal `/info-event` "Coming Soon" page (`src/app/info-event/page.tsx`) until the registration link is ready; replace `infoEventUrl` in `src/app/layout.tsx`, `src/app/membership/page.tsx`, and `src/app/membership/info/info.tsx` once it is.
- Q&A session: Date TBA. Application deadline: Sunday, 8 November 2026 at 23:59 CEST (`applicationDeadline` in `src/app/layout.tsx` drives the join dialog countdown).
