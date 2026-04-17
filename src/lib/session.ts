const CURRENT_CUSTOMER_KEY = "washify_current_customer";
const CURRENT_BUSINESS_KEY = "washify_current_business";
const SESSION_TOKEN_KEY = "washify_session_token";

export type CustomerSession = {
  id: string;
  name: string;
  phone: string;
  address?: string;
  city?: string;
  pincode?: string;
  role?: string;
};

export type BusinessSession = {
  id: string;
  userId: string;
  shopName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  status?: string;
};

function readJson<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

export function saveCustomerSession(customer: CustomerSession, token?: string | null) {
  localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(customer));
  if (token) localStorage.setItem(SESSION_TOKEN_KEY, token);
}

export function saveBusinessSession(business: BusinessSession, token?: string | null) {
  localStorage.setItem(CURRENT_BUSINESS_KEY, JSON.stringify(business));
  if (token) localStorage.setItem(SESSION_TOKEN_KEY, token);
}

export function updateCustomerSession(updates: Partial<CustomerSession>) {
  const current = getCurrentCustomer();
  if (!current) return;
  saveCustomerSession({ ...current, ...updates });
}

export function updateBusinessSession(updates: Partial<BusinessSession>) {
  const current = getCurrentBusiness();
  if (!current) return;
  saveBusinessSession({ ...current, ...updates });
}

export function getCurrentCustomer() {
  return readJson<CustomerSession>(CURRENT_CUSTOMER_KEY);
}

export function getCurrentBusiness() {
  return readJson<BusinessSession>(CURRENT_BUSINESS_KEY);
}

export function clearCustomerSession() {
  localStorage.removeItem(CURRENT_CUSTOMER_KEY);
  localStorage.removeItem(SESSION_TOKEN_KEY);
}

export function clearBusinessSession() {
  localStorage.removeItem(CURRENT_BUSINESS_KEY);
  localStorage.removeItem(SESSION_TOKEN_KEY);
}

export function getSessionToken() {
  return localStorage.getItem(SESSION_TOKEN_KEY);
}