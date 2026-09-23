# Accessibility and architecture audit worksheet

## Target and method

**Target:** GOV.UK homepage, <https://www.gov.uk/>. Public service landing page chosen as an example reference for clear task-oriented navigation. Audit date: 2026-09-23.

**Method:** Google PageSpeed Insights ran Lighthouse 13.5.0 on an emulated Moto G Power with slow 4G. Mobile report: [GOV.UK Lighthouse report](https://pagespeed.web.dev/analysis/https-www-gov-uk/41u4ucfs0b?form_factor=mobile). A keyboard-only pass used Tab and Enter from the homepage, after rejecting optional cookies.

## Findings and remediation order

| Priority | Area | Evidence to capture | Recommended remediation | Owner |
|---|---|---|---|---|
| Priority | Area | Evidence | Recommended remediation | Owner |
|---|---|---|---|---|
| P1 | Cumulative layout shift | Mobile Lighthouse CLS **0.565**, well above the 0.1 “good” threshold; the report identifies layout shift culprits | Reserve image/ad dimensions, avoid late insertion above existing content, and stabilize font loading; re-run until CLS is under 0.1 | Frontend |
| P1 | Mobile performance | Lighthouse performance score **76** on the emulated Moto G Power / slow 4G run | Address the blocking resources and layout shifts first, then re-run with the same profile and compare | Frontend |
| P2 | Render-blocking resources | Lighthouse estimates **880 ms** savings in “Render-blocking requests” | Defer non-critical scripts and inline only essential above-the-fold styles where appropriate | Frontend |
| P2 | Unused CSS | Lighthouse estimates **38 KiB** savings in “Reduce unused CSS” | Split route-specific styles and remove unused rules from the initial page payload | Frontend |
| P3 | Legacy JavaScript | Lighthouse estimates **9 KiB** savings in “Legacy JavaScript” | Serve modern bundles where supported and review compatibility transforms/polyfills | Frontend |

Automated Lighthouse accessibility score: **100**. Lighthouse still lists ten manual accessibility checks; the score does not establish WCAG conformance. The keyboard pass confirmed that the skip link receives visible focus and Enter moves focus to the main content landmark. The accessibility tree showed a page-level h1, a labeled Search combobox, section headings, and distinct navigation/main content regions.

## Evidence log

The dated PageSpeed Insights report URL above is reproducible evidence. Its captured run was 2026-09-23 20:38 GMT+5:30 and used Lighthouse 13.5.0 / Headless Chromium 153 on mobile with slow 4G. Field data in the same report says Core Web Vitals passed (LCP 0.7 s, INP 109 ms, CLS 0); those CrUX field metrics describe real visitors over 28 days and differ from the single Lighthouse lab run (LCP 1.8 s, CLS 0.565). No screenshot file is included yet. Lighthouse is a useful automated screen, not a substitute for keyboard and screen-reader review.

## Remediation sequence

Fix keyboard access and names first, then contrast and responsive reflow. Repeat keyboard testing after each interaction change. Track each issue with an owner and verify against WCAG 2.1 AA criteria before closing.
