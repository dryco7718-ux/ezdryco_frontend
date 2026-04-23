# EZDRY — Product Requirements Document (PRD)

> **Last Updated:** April 2025  
> **Status:** Active — Feature/SEO branch in progress  
> **Service Area:** Narnaul, Mahendragarh, Haryana (ONLY)

---

## 1. Product Overview

EZDRY is a laundry and dry cleaning booking platform that connects customers in Narnaul with verified local laundry service partners. Customers book a pickup online, a rider collects their clothes, the partner cleans them, and they are returned within 24–48 hours.

The platform is a **multi-portal SaaS** with three distinct user types — Customer, Business (vendor/partner), and Admin — each with a dedicated login flow and dashboard.

---

## 2. Target Users

### 2.1 Customers
- Residents of Narnaul and surrounding Mahendragarh district
- Age 20–50, smartphone literate
- Seeking convenience over traditional dhobi services
- Key pain points: unreliable dhobis, no dry cleaning options, no pricing transparency

### 2.2 Business Partners (Vendors)
- Local laundry shops and dry cleaners in Narnaul
- Onboarded and verified by admin
- Need order management, pricing control, rider management

### 2.3 Admin
- Platform operators
- Manage businesses, users, commissions, coupons, notifications, blog content

---

## 3. Features

### 3.1 Customer Features
| Feature | Status |
|---|---|
| Register / Login (phone + password) | ✅ Live |
| Browse services + pricing | ✅ Live |
| Book a laundry order | ✅ Live |
| Select items & quantities | ✅ Live |
| Schedule pickup time slot | ✅ Live |
| Checkout + coupon codes | ✅ Live |
| Payment processing | ✅ Live |
| Order tracking by ID | ✅ Live |
| Leave a review | ✅ Live |
| Manage profile + addresses | ✅ Live |
| View order history | ✅ Live |

### 3.2 Business (Vendor) Features
| Feature | Status |
|---|---|
| Register / Login | ✅ Live |
| Dashboard with analytics | ✅ Live |
| Manage incoming orders | ✅ Live |
| Set service pricing | ✅ Live |
| Manage coupon codes | ✅ Live |
| Manage riders | ✅ Live |
| View customer list | ✅ Live |
| Send push notifications | ✅ Live |

### 3.3 Admin Features
| Feature | Status |
|---|---|
| Admin login | ✅ Live |
| Dashboard + platform analytics | ✅ Live |
| Manage all businesses | ✅ Live |
| Manage commission rates | ✅ Live |
| Manage all users | ✅ Live |
| Send notifications | ✅ Live |
| Manage blog posts | ✅ Live |

### 3.4 Public / Marketing Features
| Feature | Status |
|---|---|
| Landing page (/) | ✅ Live |
| Services page (/services) | ✅ Live |
| How It Works (/how-it-works) | ✅ Live |
| Pricing (/pricing) | ✅ Live |
| Blog (/blog + /blog/:slug) | ✅ Live |
| About (/about) | ✅ Live |
| Contact (/contact) | ✅ Live |
| SEO: Laundry Narnaul | ✅ Live |
| SEO: Dry Cleaning Narnaul | ✅ Live |
| SEO: Laundry Near Me Narnaul | ✅ Live |
| Privacy Policy (/privacy) | ✅ Live |
| Terms of Use (/terms) | ✅ Live |
| Refund Policy (/refund) | ✅ Live |

---

## 4. User Flows

### 4.1 Customer Booking Flow
```
Landing Page
  └─> /customer/register (new) or /customer/login (returning)
        └─> /customer/home
              └─> /customer/book
                    └─> /customer/book/select-items
                          └─> /customer/schedule
                                └─> /customer/checkout
                                      └─> /customer/payment-success
```

### 4.2 Order Tracking Flow
```
/customer/orders
  └─> /customer/track/:id
        └─> /customer/review/:id (after delivery)
```

### 4.3 Business Flow
```
/business/login or /business/register
  └─> /business/dashboard
        ├─> /business/orders
        ├─> /business/pricing
        ├─> /business/coupons
        ├─> /business/riders
        ├─> /business/customers
        └─> /business/notifications
```

### 4.4 Admin Flow
```
/admin/login
  └─> /admin/dashboard
        ├─> /admin/businesses
        ├─> /admin/commission
        ├─> /admin/users
        ├─> /admin/notifications
        └─> /admin/blogs
```

### 4.5 Portal Selection
```
/ (landing)
  └─> /portal-selector (if no active session)
        ├─> Customer Portal
        ├─> Business Portal
        └─> Admin Portal
```

---

## 5. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Mobile responsive | All public pages + auth pages |
| SEO (local Narnaul) | All public pages |
| Page load time | < 2s on 4G |
| No layout inconsistency | Enforced via PublicLayout |
| Accessibility | keyboard nav, aria-expanded |
| Brand | EZDRY only (no "Washify" in UI) |
