# EZDRY — Database Schema (Supabase)

> **IMPORTANT:** This schema is derived from the TypeScript types in `api.schemas.ts` and frontend data flows.  
> The actual Supabase schema lives in the backend — **do not modify**.

---

## Tables Overview

```
customers
businesses
orders
order_items
laundry_items
addresses
payments
riders
coupons
reviews
notifications
subscriptions
commission_settings
```

---

## Table Schemas

### customers
```sql
id          UUID (PK)
name        TEXT
phone       TEXT UNIQUE
password    TEXT (hashed)
address     TEXT?
city        TEXT?
pincode     TEXT?
role        TEXT? (default: 'customer')
created_at  TIMESTAMPTZ
```

### businesses
```sql
id          UUID (PK)
user_id     UUID (FK → auth user)
shop_name   TEXT
phone       TEXT UNIQUE
email       TEXT?
address     TEXT
city        TEXT
gst_number  TEXT?
status      TEXT ('pending' | 'active' | 'suspended')
created_at  TIMESTAMPTZ
```

### orders
```sql
id            UUID (PK)
customer_id   UUID (FK → customers)
business_id   UUID (FK → businesses)
address_id    UUID (FK → addresses)
rider_id      UUID? (FK → riders)
status        TEXT ('pending' | 'picked_up' | 'cleaning' | 'ready' | 'delivered' | 'cancelled')
pickup_time   TIMESTAMPTZ
coupon_code   TEXT?
notes         TEXT?
total_amount  NUMERIC
created_at    TIMESTAMPTZ
updated_at    TIMESTAMPTZ
```

### order_items
```sql
id            UUID (PK)
order_id      UUID (FK → orders)
item_id       UUID (FK → laundry_items)
quantity      INTEGER
price         NUMERIC
service_type  TEXT ('wash_fold' | 'dry_clean' | 'iron')
```

### laundry_items
```sql
id            UUID (PK)
business_id   UUID (FK → businesses)
name          TEXT
category      TEXT
service_type  TEXT
price         NUMERIC
unit          TEXT ('per_item' | 'per_kg')
is_active     BOOLEAN
created_at    TIMESTAMPTZ
```

### addresses
```sql
id            UUID (PK)
customer_id   UUID (FK → customers)
label         TEXT? ('Home' | 'Work' | 'Other')
line1         TEXT
city          TEXT
pincode       TEXT
is_default    BOOLEAN
created_at    TIMESTAMPTZ
```

### payments
```sql
id            UUID (PK)
order_id      UUID (FK → orders)
amount        NUMERIC
method        TEXT ('cash' | 'upi' | 'card')
status        TEXT ('pending' | 'paid' | 'failed' | 'refunded')
transaction_id TEXT?
created_at    TIMESTAMPTZ
```

### riders
```sql
id            UUID (PK)
business_id   UUID (FK → businesses)
name          TEXT
phone         TEXT
status        TEXT ('active' | 'inactive')
created_at    TIMESTAMPTZ
```

### coupons
```sql
id            UUID (PK)
business_id   UUID? (FK → businesses; null = platform-wide)
code          TEXT UNIQUE
discount_type TEXT ('flat' | 'percent')
discount_value NUMERIC
min_order     NUMERIC?
max_uses      INTEGER?
used_count    INTEGER
expires_at    TIMESTAMPTZ?
is_active     BOOLEAN
created_at    TIMESTAMPTZ
```

### reviews
```sql
id            UUID (PK)
order_id      UUID (FK → orders)
customer_id   UUID (FK → customers)
business_id   UUID (FK → businesses)
rating        INTEGER (1–5)
comment       TEXT?
created_at    TIMESTAMPTZ
```

### notifications
```sql
id            UUID (PK)
title         TEXT
body          TEXT
target        TEXT ('all' | 'customers' | 'businesses')
sent_at       TIMESTAMPTZ
result        JSONB?
```

### subscriptions
```sql
id            UUID (PK)
customer_id   UUID (FK → customers)
plan_type     TEXT ('weekly' | 'monthly')
price         NUMERIC
status        TEXT ('active' | 'expired' | 'cancelled')
starts_at     TIMESTAMPTZ
ends_at       TIMESTAMPTZ
created_at    TIMESTAMPTZ
```

### commission_settings
```sql
id            UUID (PK)
platform_fee  NUMERIC (percentage, e.g. 15.0)
updated_at    TIMESTAMPTZ
updated_by    UUID
```

---

## Relations

```
customers     ←── orders (1:many)
customers     ←── addresses (1:many)
customers     ←── reviews (1:many)
customers     ←── subscriptions (1:many)

businesses    ←── orders (1:many)
businesses    ←── laundry_items (1:many)
businesses    ←── riders (1:many)
businesses    ←── coupons (1:many)

orders        ←── order_items (1:many)
orders        ──→ riders (many:1, optional)
orders        ──→ payments (1:1)
orders        ──→ reviews (1:1, after delivery)
```

---

## Frontend Usage Notes

| Frontend Action | Tables Involved |
|---|---|
| Customer registers | `customers` |
| Browse & book order | `laundry_items`, `orders`, `order_items`, `addresses` |
| Apply coupon | `coupons` (validate) |
| Checkout | `payments` |
| Track order | `orders`, `riders` |
| Leave review | `reviews` |
| Business views orders | `orders`, `order_items`, `customers` |
| Admin analytics | All tables (aggregated) |
