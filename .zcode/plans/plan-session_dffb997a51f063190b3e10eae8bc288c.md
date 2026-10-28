# Pushpank Upgrade — Phase-by-Phase Execution Plan

Working order: each phase ends with the site building (`npm run build` + `npm run lint` green) before moving on. Decisions: polish the current dark temple identity (no identity overhaul), file-based persistence, add /wishlist, keep placeholder contact data clearly flagged.

## Phase 1 — Bug fixes
1. **Kill the 36px header layout jump** (`announcement-bar.tsx` / `site-header.tsx`): keep the strip mounted, animate height/opacity instead of unmounting at `scrollY > 48`; stop its interval when hidden; 24h expiry on dismissal; scroll hysteresis (collapse 64 / restore 24).
2. **`product-card.tsx:22` crash guard** for empty variants (`.reduce()` without initial).
3. **Product page**: remove the bogus `product.secondaryImage` condition on the delivery note (`products/[slug]/page.tsx:95`); make the gallery interactive (clickable thumbnails + crossfade, keyboard accessible).
4. **Mega menu**: flip/clamp panel near viewport edges; replace the irrelevant filler card in Decorations/More panels with real content; rotate the featured product by day.
5. `scroll-padding-top` per breakpoint to match real header heights.
6. **Footer year** not frozen at build time (tiny client component).
7. **Route parity**: tab bar hidden on `/order-confirmation` (match FAB); `/account` link in mobile menu; 44px touch targets.
8. **Delete dead code**: unused `FeaturedProducts`/`FestiveBento`/`KitsFeature`, `mainNav.book`, `isFeatured`, `data-scroll-behavior`, no-op `Stagger` class (fixed properly in Phase 5), and unused `three` / `@react-three/*` deps.

## Phase 2 — Design tokens
1. Delete the legacy alias block in `globals.css` (`maroon`→gold, `forest`→tulsi, `ivory`, `charcoal` aliases) and migrate all usages — fixes gold-rendering `accent-maroon` in checkout/booking/quote forms.
2. Add missing tokens: `--color-tulsi-100`, radius scale (replaces mixed `rounded-[20px]/2xl/xl`), motion duration tokens, documented z-index scale.
3. Unify label tracking; tokenize the hardcoded header shadow.

## Phase 3 — Premium navigation
1. Header hide-on-scroll-down / show-on-scroll-up (spring, reduced-motion safe); active nav underline always visible.
2. Mega menu: entrance animation, hover-intent delay, real panel content.
3. Mobile menu: exclusive animated accordions with chevrons, stagger on open, Search + Account entries.
4. Tab bar: animated active indicator (shared layoutId), fix `/pandits`+`/bookings` active states.
5. Shared pincode-check component (Escape, outside-click, live region, invalid-submit error) added to desktop header.
6. Announcement bar: pause on hover/focus + `aria-live`.

## Phase 4 — Premium search (command palette)
Rebuild `search-dialog.tsx`:
1. Zustand `ui-store` open API (replaces the DOM-querySelector hack); Cmd/Ctrl+K and `/` shortcuts.
2. Ranked matching (name > description, token prefixes) + Hindi/English synonyms (diya/lamp, mala/garland); index occasions + Hindi names.
3. Full keyboard nav (arrows, Enter, Esc, focus restore) + combobox ARIA.
4. Grouped results with type labels, match highlighting, recent searches (localStorage, last 5), result count live region, `/shop?q=` Enter fallback, mobile panel clear of the header.
5. Wire the built-but-unused `ScrollProgress` bar.

## Phase 5 — Motion system
1. `template.tsx` page transition (subtle fade/rise; verify API against `node_modules/next/dist/docs/` first — this Next version differs from training data).
2. Implement `Stagger` properly (real sequencing class).
3. Stagger children in sheets/menus; animated accordion heights.
4. Consistent hover-lift micro-interaction on cards/buttons.
(CSS-only reveals + reduced-motion coverage stay as the foundation.)

## Phase 6 — Commerce & pages polish
1. **New `/wishlist` page** reading the localStorage store: cards with add-to-cart/remove, empty state; entry points in header, mobile menu, footer.
2. Shop page: URL-synced `q` input matching header-search behavior; pending-state skeletons.
3. Cart: line-removal animation, free-delivery progress nudge (₹999) in drawer + summary.
4. Pandits page cards get the standard card treatment (radius token, hover lift, image zoom) for consistency.

## Phase 7 — Persistence
Replace in-memory Maps in `lib/server/store.ts` with an atomic JSON file store (`data/db.json`, temp-file+rename, same function signatures — no caller changes). Orders/bookings/quotes survive restarts; confirmation links stop dying.

## Verification (every phase)
`npm run build` + `npm run lint` green; manual browser pass at 1440/1024/390px (scroll, mega menu edges, search keyboard flow, cart→checkout→confirmation round-trip, wishlist, reduced-motion spot check, keyboard-only tab pass).

**Out of scope**: real contact data, online payment, auth/accounts, visual identity change.