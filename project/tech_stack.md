# EZDRY — Tech Stack

---

## 1. Frontend

| Layer | Technology | Notes |
|---|---|---|
| Framework | **React 18** | Component-based UI |
| Build Tool | **Vite 7** | Fast HMR, ESM, TS support |
| Language | **TypeScript** | Strict mode |
| Routing | **Wouter** | Lightweight client-side router |
| State / Data | **TanStack React Query v5** | Server state, caching, mutation |
| Styling | **Tailwind CSS** | Utility-first, responsive classes |
| UI Components | **shadcn/ui** | Radix-based accessible primitives |
| Animations | **Framer Motion** | Page transitions, accordion, micro-animations |
| Icons | **Lucide React** | Consistent SVG icon set |
| Fonts | **Inter (Google Fonts)** | Loaded via `<link>` in index.html |
| HTTP Client | Custom `customFetch` wrapper | See `src/lib/api-client-react/custom-fetch.ts` |
| API Hooks | **orval** (generated) | Auto-generated React Query hooks from OpenAPI spec |
| Toast | Custom `use-toast` hook | Via shadcn/ui Toaster |

---

## 2. API Client Architecture

```
src/lib/
├── auth-api.ts              # Manual auth endpoints (register/login)
├── session.ts               # LocalStorage session management
├── blogs.ts                 # Blog data (local fallback + API)
├── profile-api.ts           # Profile update
└── api-client-react/
    ├── custom-fetch.ts      # Core fetch wrapper with base URL + auth token
    ├── index.ts             # Re-exports
    └── generated/
        ├── api.ts           # ~3,700 lines of orval-generated hooks
        └── api.schemas.ts   # TypeScript types from OpenAPI spec
```

### How It Works
1. `VITE_API_BASE_URL` env var sets the API server URL (defaults to `/api`)
2. All requests go through `customFetch()` which:
   - Prepends base URL to relative paths
   - Attaches `Authorization: Bearer <token>` if configured
   - Parses JSON / text / blob responses
   - Throws typed `ApiError` on non-2xx responses
3. Auth tokens stored in `localStorage` under `washify_session_token`
4. React Query caches all GET responses, invalidates on mutations

---

## 3. Session Management

```typescript
// Keys in localStorage:
"washify_current_customer"  // CustomerSession JSON
"washify_current_business"  // BusinessSession JSON
"washify_session_token"     // JWT bearer token

// Note: keys use legacy "washify_" prefix but store EZDRY data
// DO NOT change these keys — they are tied to active user sessions
```

---

## 4. Backend (READ ONLY — DO NOT MODIFY)

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | NestJS + Express |
| Database | Supabase (PostgreSQL) |
| Auth | JWT (phone + password) |
| OTP | SMS OTP via `/api/auth/send-otp` |
| API Spec | OpenAPI 0.1.0 |

---

## 5. Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | API server base URL | `/api` |
| `VITE_BRAND_NAME` | Brand name override | `EZDRY` |
| `BASE_URL` | Vite base path for routing | `/` |

---

## 6. Key Libraries (package.json)

```json
{
  "dependencies": {
    "react": "^18",
    "wouter": "^3",
    "@tanstack/react-query": "^5",
    "framer-motion": "^11",
    "lucide-react": "^0.400",
    "tailwindcss": "^3",
    "@radix-ui/*": "various shadcn/ui dependencies"
  }
}
```

---

## 7. Build & Dev Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (default port 5173)
npm run build        # Production bundle (dist/)
npx tsc --noEmit     # TypeScript check without emit
```
