# EZDRY — Design System Reference

---

## 1. Color Palette

| Token | Tailwind Class | Usage |
|---|---|---|
| Primary | `sky-500` `#0ea5e9` | Buttons, CTAs, active states |
| Primary Light | `sky-100` | Card backgrounds, chips |
| Surface | `sky-50` | Alternate section backgrounds |
| Dark | `gray-900` | Footer background |
| Text Primary | `gray-900` | Headings |
| Text Secondary | `gray-500` | Body, descriptions |
| Text Muted | `gray-400` | Placeholders, footer links |
| White | `white` | Main page background |
| Accent | `yellow-400` | "Most Popular" badge |

**PWA Theme Color:** `#0ea5e9`

---

## 2. Typography

| Role | Class | Size |
|---|---|---|
| H1 Page | `text-5xl font-extrabold` | 48px |
| H2 Section | `text-4xl font-extrabold` | 36px |
| H3 Card | `text-xl font-bold` | 20px |
| Body | `text-base` | 16px |
| Small | `text-sm` | 14px |
| Label | `text-xs font-semibold` | 12px |

**Font:** Inter (Google Fonts, weights 400/500/600/700)

---

## 3. Spacing

| Usage | Class |
|---|---|
| Section vertical | `py-16` (64px) |
| Page horizontal (mobile) | `px-4` (16px) |
| Page horizontal (desktop) | `px-6` (24px) |
| Grid gap | `gap-6` (24px) |
| Card border radius | `rounded-2xl` (16px) |
| Button border radius | `rounded-full` |

---

## 4. Reusable Components

### FAQAccordion
```tsx
import { FAQAccordion } from "@/components/FAQAccordion";
<FAQAccordion items={[{q, a}]} heading="Title" bg="bg-white" />
```

### BlogCard
```tsx
import { BlogCard } from "@/components/BlogCard";
```

### Button Variants
```tsx
// Primary
<Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5 font-semibold">
// Outline
<Button variant="outline" className="border-sky-200 text-sky-600 rounded-xl">
// White (on dark bg)
<Button className="bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold">
```

---

## 5. Layout Patterns

### Standard Section
```tsx
<section className="py-16 px-4 sm:px-6 bg-white">
  <div className="max-w-6xl mx-auto">...</div>
</section>
```

### Hero
```tsx
<section className="bg-gradient-to-br from-sky-50 to-white py-16 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
      Main <span className="text-sky-500">Heading</span>
    </h1>
  </div>
</section>
```

### CTA Strip
```tsx
<section className="py-16 px-6 bg-sky-500">
  <div className="max-w-3xl mx-auto text-center text-white">...</div>
</section>
```

---

## 6. Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| default | < 640px | Single column, stacked |
| `md:` | ≥ 768px | 2-column |
| `lg:` | ≥ 1024px | 3–4 column |

Max widths: `max-w-6xl` (content), `max-w-3xl` (text sections)

---

## 7. Animation Patterns

```tsx
// Entry
initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}

// Scroll trigger
initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}

// FAQ expand
initial={{ height: 0 }} animate={{ height: "auto" }} transition={{ duration: 0.25 }}
```
