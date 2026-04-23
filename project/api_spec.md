# EZDRY — API Specification

> Source: `src/lib/api-client-react/generated/api.ts` (orval-generated from OpenAPI 0.1.0)  
> Base URL: `VITE_API_BASE_URL` env var (default: `/api`)

---

## Authentication

### POST /auth/customers/register
**Register a new customer**
```typescript
// Request
{
  name: string;
  phone: string;
  password: string;
  address?: string;
  city?: string;
  pincode?: string;
}
// Response
{
  token: string;
  user: { id, name, phone, address?, city?, pincode?, role? }
}
```

### POST /auth/customers/login
```typescript
// Request
{ phone: string; password: string; }
// Response
{ token: string; user: { id, name, phone, ... } }
```

### POST /auth/businesses/register
```typescript
// Request
{ shopName, ownerName, email?, phone, address, city, password, gstNumber? }
// Response
{ token, user: {...}, business: { id, shopName, phone, address, city, status? } }
```

### POST /auth/businesses/login
```typescript
{ phone: string; password: string; }
// Response: same as register
```

### POST /api/auth/send-otp
```typescript
// Request: SendOtpBody
{ phone: string }
// Response: OtpResponse
```

### POST /api/auth/verify-otp
```typescript
// Request: VerifyOtpBody
{ phone: string; otp: string }
// Response: AuthResponse
```

---

## Customers

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/customers` | List all customers | `useListCustomers(params?)` |
| GET | `/api/customers/:id` | Get customer by ID | `useGetCustomer(id)` |
| GET | `/api/customers/:id/stats` | Customer order stats | `useGetCustomerStats(id)` |
| GET | `/api/customers/:id/addresses` | List addresses | `useListAddresses(customerId)` |
| POST | `/api/customers/:id/addresses` | Add new address | `useCreateAddress()` |

---

## Orders

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/orders` | List orders (filterable) | `useListOrders(params?)` |
| POST | `/api/orders` | Create new order | `useCreateOrder()` |
| GET | `/api/orders/:id` | Get order by ID | `useGetOrder(id)` |
| PATCH | `/api/orders/:id` | Update order status | `useUpdateOrder()` |
| POST | `/api/orders/:id/assign-rider` | Assign rider | `useAssignRider()` |
| GET | `/api/orders/stats` | Order breakdown stats | `useGetOrderStats(params?)` |

### CreateOrderBody
```typescript
{
  customerId: string;
  businessId: string;
  items: CreateItemBody[];
  pickupTime: string;        // ISO datetime
  addressId: string;
  couponCode?: string;
  notes?: string;
}
```

---

## Items (Laundry Catalog)

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/items` | List laundry items | `useListItems(params?)` |
| POST | `/api/items` | Create item | `useCreateItem()` |
| PATCH | `/api/items/:id` | Update item | `useUpdateItem()` |

---

## Payments

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/payments` | List payments | `useListPayments(params?)` |
| POST | `/api/payments` | Create payment | `useCreatePayment()` |
| GET | `/api/revenue-trend` | Revenue trend | `useGetRevenueTrend(params?)` |

---

## Businesses (Vendors)

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/businesses` | List all businesses | `useListBusinesses(params?)` |
| GET | `/api/businesses/:id` | Get business | `useGetBusiness(id)` |
| PATCH | `/api/businesses/:id` | Update business | `useUpdateBusiness()` |
| GET | `/api/businesses/:id/stats` | Business stats | `useGetBusinessStats(id)` |
| GET | `/api/businesses/:id/analytics` | Analytics | `useGetBusinessAnalytics(id)` |

---

## Coupons

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/coupons` | List coupons | `useListCoupons(params?)` |
| POST | `/api/coupons` | Create coupon | `useCreateCoupon()` |
| POST | `/api/coupons/validate` | Validate coupon | `useValidateCoupon()` |

---

## Riders

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/riders` | List riders | `useListRiders(params?)` |
| POST | `/api/riders` | Create rider | `useCreateRider()` |

---

## Reviews

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/reviews` | List reviews | `useListReviews(params?)` |
| POST | `/api/reviews` | Create review | `useCreateReview()` |

---

## Notifications

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/notifications` | List notifications | `useListNotifications(params?)` |
| POST | `/api/notifications/send` | Send notification | `useSendNotification()` |

---

## Subscriptions

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/subscriptions` | List subscriptions | `useListSubscriptions(params?)` |
| POST | `/api/subscriptions` | Create subscription | `useCreateSubscription()` |

---

## Admin / Platform

| Method | Endpoint | Summary | Hook |
|---|---|---|---|
| GET | `/api/healthz` | Health check | `useHealthCheck()` |
| GET | `/api/analytics` | Platform analytics | `useGetPlatformAnalytics()` |
| GET | `/api/commission` | Commission settings | `useGetCommission()` |
| PATCH | `/api/commission` | Update commission | `useUpdateCommission()` |

---

## Query Params (Common)

Most list endpoints accept:
```typescript
{
  page?: number;
  limit?: number;
  status?: string;
  businessId?: string;
  customerId?: string;
  search?: string;
}
```

---

## Error Format
```typescript
class ApiError extends Error {
  status: number;       // HTTP status code
  statusText: string;   // e.g. "Not Found"
  data: unknown;        // Parsed response body
  method: string;       // "GET" | "POST" | etc.
  url: string;
}
```
