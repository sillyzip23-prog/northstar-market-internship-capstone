# Verification notes

## Automated and manual checks

- Node syntax checks passed for `server/index.js`, `client/js/app.js`, `client/js/api.js`, and `client/js/data.js`.
- Local `GET /api/health` returned `{ "ok": true }` and `GET /api/products` returned 8 catalog items.
- API create, update, and delete each succeeded with a temporary catalog item; the item was deleted after the check.
- Browser check confirmed category filtering changes the visible collection from 8 items to the 2 technology items. Adding headphones changed the cart count to 1 and announced the addition.
- GOV.UK keyboard pass confirmed the focused skip link is visible and Enter moves focus to the main landmark.
- Lighthouse/PageSpeed results and five prioritized findings are recorded in `docs/accessibility-audit.md`.
- The first W3C Nu validation found two ARIA errors (an `aria-label` on a generic `<span>` and on a generic `<div>`). Both source issues were corrected. Final validation with Nu Html Checker vnu 26.9.16 reported: “No errors or warnings to show.”
- Responsive browser screenshots are saved in `docs/screenshots/` at 320, 768, 1024, and 1440 CSS pixels. At each viewport, `documentElement.scrollWidth` and `body.scrollWidth` equaled the viewport width (320, 768, 1024, and 1440 respectively), with no horizontal page overflow.

## Evidence still to capture

A keyboard pass through every storefront interaction remains to be recorded. This check was limited to layout overflow and screenshots; it is not a full device, browser, or assistive-technology compatibility sign-off.
