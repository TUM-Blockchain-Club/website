# Application Cycle Update

- Application links (header "Join Us", membership "Apply Now", join dialog) point to `https://tally.so/r/Qo2WEk`.
- The online info event and Q&A session are removed entirely: no CTAs on the membership page or in the join dialog, and the `/info-event` page is deleted. `/info-event` redirects to `/membership` (`next.config.ts`) so old links still land somewhere useful.
- The membership page states the application deadline as Sunday, 8 November 2026 at 23:59 CET.
- The join dialog has no countdown or automatic deadline expiry. It still appears after a short delay and can be dismissed for the rest of the day.
