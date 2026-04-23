# EZDRY — Task List & Rebuild Roadmap

> Priority: P1 = Critical / P2 = High / P3 = Nice to Have

---

## ✅ COMPLETED TASKS

### Branding
- [x] Replace all "Washify" UI text with "EZDRY"
- [x] Update Logo component fallback to "EZDRY"
- [x] Update admin layout brand name
- [x] Update notification templates
- [x] Update portal selector text

### Layout & Architecture
- [x] Create `PublicLayout` with global navbar + footer
- [x] Migrate Landing page to PublicLayout
- [x] Migrate Blog Index + Blog Post to PublicLayout
- [x] Migrate all 3 SEO pages to PublicLayout
- [x] Add hamburger mobile menu (animated drawer)
- [x] Add Login + Book Now split on desktop navbar
- [x] Active route highlighting in nav

### New Public Pages
- [x] /services — Services overview with pricing
- [x] /how-it-works — 4-step process page
- [x] /pricing — Plans + full price table
- [x] /about — Brand story + values
- [x] /contact — 4 contact cards + coverage map

### Legal Pages
- [x] /privacy — Privacy Policy (8 sections)
- [x] /terms — Terms of Use (10 sections)
- [x] /refund — Refund & Cancellation Policy (8 sections)
- [x] Footer links to all legal pages

### Blog
- [x] 5 published blog articles (Narnaul-focused)
- [x] Homepage shows 3 blog cards
- [x] Blog pages use PublicLayout

### SEO / GEO
- [x] useSEO hook on all public pages
- [x] Meta titles + descriptions on all pages
- [x] "Laundry Service in Narnaul" keywords used
- [x] "Dry Cleaning in Narnaul" keywords used
- [x] Narnaul locality references throughout

### Components
- [x] FAQAccordion — animated, single-open, accessible
- [x] BlogCard — reusable card component
- [x] FAQAccordion used on 6 pages

### Responsiveness
- [x] Mobile hamburger nav on all public pages
- [x] Footer 4-column responsive grid (1→2→4 cols)
- [x] Hero sections responsive (text-4xl → text-5xl)
- [x] All new pages mobile-first

### Favicon & PWA
- [x] EZDRY-branded favicon.svg created
- [x] Linked in index.html
- [x] manifest.json with EZDRY branding

### Bug Fixes
- [x] Shirt, Phone, Mail lucide imports restored in landing.tsx
- [x] All 3 runtime errors resolved (Zero TSC errors in public code)

---

## 🔄 IN PROGRESS

None currently — all public site tasks complete.

---

## 📋 PENDING TASKS (Prioritized)

### P1 — Critical

- [ ] **Session keys cleanup** — `washify_` localStorage keys should be renamed to `ezdry_` for brand consistency (requires coordinated change with session.ts + backend validation)
- [ ] **Fix business/orders.tsx TS error** — `Customer.address` property missing type
- [ ] **Fix customer/select-items.tsx TS error** — `number` not assignable to `string | URL`
- [ ] **Landing page FAQ section** — Not yet using FAQAccordion (landing.tsx has no FAQ currently)

### P2 — High Priority

- [ ] **Customer dashboard branding** — Audit `/customer/*` pages for any remaining "Washify" text
- [ ] **Business dashboard branding** — Audit `/business/*` pages for any remaining "Washify" text
- [ ] **Blog content** — Add full article body content (currently blogs have single-sentence `content` field)
- [ ] **Blog post detail page** — Render full article with proper heading structure + article body
- [ ] **Laundry Near Me Narnaul FAQ** — Add FAQAccordion to laundry-near-me-narnaul.tsx

### P3 — Nice to Have

- [ ] **WhatsApp CTA button** — Floating WhatsApp button on public pages
- [ ] **Image assets** — Real photos for services section
- [ ] **Testimonials section** — Customer reviews on landing page (3 exist in data)
- [ ] **Google Analytics / GTM** — Add tracking for conversions
- [ ] **Sitemap.xml** — Auto-generated for SEO
- [ ] **robots.txt** — Add for search engine directives
- [ ] **Service Worker** — For PWA offline support
- [ ] **OTP login flow** — Frontend page for `/api/auth/send-otp` + verify flow
- [ ] **Portal selector improvement** — Better UX than current 3-card layout
- [ ] **404 page** — Current `not-found.tsx` is minimal

---

## Safety Checklist Before Deployment

| Check | Status |
|---|---|
| `npm install` runs without error | ✅ |
| `npm run dev` starts without error | ✅ |
| Vite build exits code 0 | ✅ |
| Zero new TypeScript errors | ✅ |
| Backend API endpoints unchanged | ✅ |
| Session/auth logic unchanged | ✅ |
| Supabase schema unchanged | ✅ |
| Booking flow: customer register → book → pay | ✅ Untouched |
| Order tracking flow | ✅ Untouched |
| Business dashboard | ✅ Untouched |
| Admin dashboard | ✅ Untouched |

---

## Git Branch Status

| Branch | Purpose |
|---|---|
| `feature/ezdry-rebuild-seo` | Current — all changes committed here |
| `main` | Production — do NOT push until full QA |

Latest commit: `feat(ui): reusable FAQAccordion with animated expand/collapse`
