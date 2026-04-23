# EZDRY — Folder Structure

---

## Current Structure (as of April 2025)

```
ezdryco_frontend/
├── public/
│   ├── favicon.svg              # EZDRY brand favicon (sky-500 + white EZ)
│   ├── manifest.json            # PWA manifest
│   └── ezdry-logo.svg           # Logo asset
├── project/                     # ← THIS documentation folder
│   ├── PRD.md
│   ├── tech_stack.md
│   ├── folder_structure.md
│   ├── api_spec.md
│   ├── db_schema.md
│   ├── tasks.md
│   └── UI_reference/
│       └── design_system.md
├── src/
│   ├── App.tsx                  # Root — router + QueryClient setup
│   ├── main.tsx                 # Vite entry point
│   ├── index.css                # Global styles + Tailwind directives
│   │
│   ├── components/
│   │   ├── Logo.tsx             # WashifyLogo component (renders "EZDRY")
│   │   ├── BlogCard.tsx         # Reusable blog card component
│   │   ├── FAQAccordion.tsx     # Reusable animated FAQ accordion
│   │   ├── NotificationPanel.tsx
│   │   └── ui/                  # shadcn/ui primitives
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── toaster.tsx
│   │       ├── tooltip.tsx
│   │       └── ... (20+ components)
│   │
│   ├── hooks/
│   │   ├── useSEO.ts            # Sets document title + meta description
│   │   ├── use-mobile.tsx       # Mobile breakpoint detection
│   │   └── use-toast.ts         # Toast notification state
│   │
│   ├── layouts/
│   │   ├── public-layout.tsx    # ← GLOBAL: navbar + footer for all public pages
│   │   ├── customer-layout.tsx  # Customer portal layout
│   │   ├── business-layout.tsx  # Business portal layout
│   │   └── admin-layout.tsx     # Admin portal layout
│   │
│   ├── lib/
│   │   ├── auth-api.ts          # Auth endpoints (register/login)
│   │   ├── session.ts           # localStorage session helpers
│   │   ├── blogs.ts             # Blog data + API fetch
│   │   ├── profile-api.ts       # Profile update API
│   │   ├── utils.ts             # cn() utility (tailwind-merge)
│   │   └── api-client-react/
│   │       ├── custom-fetch.ts  # Core HTTP client
│   │       ├── index.ts
│   │       └── generated/
│   │           ├── api.ts       # orval-generated React Query hooks
│   │           └── api.schemas.ts # TypeScript types
│   │
│   └── pages/
│       ├── landing.tsx          # / (home)
│       ├── portal-selector.tsx  # Portal selection page
│       ├── not-found.tsx        # 404 page
│       │
│       ├── services.tsx         # /services
│       ├── how-it-works.tsx     # /how-it-works
│       ├── pricing.tsx          # /pricing
│       ├── about.tsx            # /about
│       ├── contact.tsx          # /contact
│       ├── privacy.tsx          # /privacy
│       ├── terms.tsx            # /terms
│       ├── refund.tsx           # /refund
│       │
│       ├── seo/
│       │   ├── laundry-service-narnaul.tsx  # /laundry-service-narnaul
│       │   ├── dry-cleaning-narnaul.tsx     # /dry-cleaning-narnaul
│       │   ├── laundry-near-me-narnaul.tsx  # /laundry-near-me-narnaul
│       │   ├── blog-index.tsx               # /blog
│       │   └── blog-post.tsx                # /blog/:slug
│       │
│       ├── customer/
│       │   ├── login.tsx
│       │   ├── register.tsx
│       │   ├── home.tsx
│       │   ├── book.tsx
│       │   ├── select-items.tsx
│       │   ├── schedule.tsx
│       │   ├── checkout.tsx
│       │   ├── payment-success.tsx
│       │   ├── track.tsx
│       │   ├── review.tsx
│       │   ├── orders.tsx
│       │   └── profile.tsx
│       │
│       ├── business/
│       │   ├── login.tsx
│       │   ├── register.tsx
│       │   ├── dashboard.tsx
│       │   ├── orders.tsx
│       │   ├── pricing.tsx
│       │   ├── coupons.tsx
│       │   ├── riders.tsx
│       │   ├── customers.tsx
│       │   └── notifications.tsx
│       │
│       └── admin/
│           ├── login.tsx
│           ├── dashboard.tsx
│           ├── businesses.tsx
│           ├── commission.tsx
│           ├── users.tsx
│           ├── notifications.tsx
│           └── blogs.tsx
│
├── index.html                   # Vite entry HTML (favicon, fonts, meta)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Layout Architecture

```
App.tsx
  └── WouterRouter
        ├── PublicLayout (wraps all public pages)
        │     ├── Fixed navbar (Logo + Nav + Book Now + Hamburger)
        │     ├── <main> {children}
        │     └── Footer (4-col: Brand | Pages | Narnaul | Legal)
        │
        ├── CustomerLayout (wraps /customer/* pages)
        ├── BusinessLayout (wraps /business/* pages)
        └── AdminLayout (wraps /admin/* pages)
```

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| `PublicLayout` as single wrapper | One nav/footer change updates all 10+ public pages |
| `FAQAccordion` reusable component | Used on 6 pages — consistent UX, single animation logic |
| orval-generated API hooks | API always stays in sync with backend OpenAPI spec |
| `customFetch` wrapper | Single place to manage base URL, auth headers, error parsing |
| localStorage sessions | No cookie complexity; simple JWT storage |
