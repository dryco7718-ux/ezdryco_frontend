const CURRENT_CUSTOMER_KEY = "ezdry_current_customer";
const CURRENT_BUSINESS_KEY = "ezdry_current_business";
const CURRENT_ADMIN_KEY = "ezdry_current_admin";
const SESSION_TOKEN_KEY = "ezdry_session_token";
const REFRESH_TOKEN_KEY = "ezdry_refresh_token";
const ACTIVE_ROLE_KEY = "ezdry_active_role";

export type SessionRole = "customer" | "business" | "admin";

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

export type AdminSession = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
};

function readJson<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function saveTokens(token?: string | null, refreshToken?: string | null) {
  if (token) localStorage.setItem(SESSION_TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function saveCustomerSession(
  customer: CustomerSession,
  token?: string | null,
  refreshToken?: string | null,
) {
  localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(customer));
  localStorage.setItem(ACTIVE_ROLE_KEY, "customer");
  saveTokens(token, refreshToken);
}

export function saveBusinessSession(
  business: BusinessSession,
  token?: string | null,
  refreshToken?: string | null,
) {
  localStorage.setItem(CURRENT_BUSINESS_KEY, JSON.stringify(business));
  localStorage.setItem(ACTIVE_ROLE_KEY, "business");
  saveTokens(token, refreshToken);
}

export function saveAdminSession(
  admin: AdminSession,
  token?: string | null,
  refreshToken?: string | null,
) {
  localStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(admin));
  localStorage.setItem("ezdry_admin_logged_in", "true");
  localStorage.setItem(ACTIVE_ROLE_KEY, "admin");
  saveTokens(token, refreshToken);
}

export function updateCustomerSession(updates: Partial<CustomerSession>) {
  const current = getCurrentCustomer();
  if (!current) return;
  localStorage.setItem(
    CURRENT_CUSTOMER_KEY,
    JSON.stringify({ ...current, ...updates }),
  );
}

export function updateBusinessSession(updates: Partial<BusinessSession>) {
  const current = getCurrentBusiness();
  if (!current) return;
  localStorage.setItem(
    CURRENT_BUSINESS_KEY,
    JSON.stringify({ ...current, ...updates }),
  );
}

export function getCurrentCustomer() {
  return readJson<CustomerSession>(CURRENT_CUSTOMER_KEY);
}

export function getCurrentBusiness() {
  return readJson<BusinessSession>(CURRENT_BUSINESS_KEY);
}

export function getCurrentAdmin() {
  return readJson<AdminSession>(CURRENT_ADMIN_KEY);
}

export function getSessionToken() {
  return localStorage.getItem(SESSION_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setSessionToken(token: string) {
  localStorage.setItem(SESSION_TOKEN_KEY, token);
}

export function getActiveRole(): SessionRole | null {
  return localStorage.getItem(ACTIVE_ROLE_KEY) as SessionRole | null;
}

function clearTokens() {
  localStorage.removeItem(SESSION_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ACTIVE_ROLE_KEY);
}

export function clearCustomerSession() {
  localStorage.removeItem(CURRENT_CUSTOMER_KEY);
  clearTokens();
}

export function clearBusinessSession() {
  localStorage.removeItem(CURRENT_BUSINESS_KEY);
  clearTokens();
}

export function clearAdminSession() {
  localStorage.removeItem(CURRENT_ADMIN_KEY);
  localStorage.removeItem("ezdry_admin_logged_in");
  clearTokens();
}

/** Clears all session state regardless of role. */
export function clearSession() {
  localStorage.removeItem(CURRENT_CUSTOMER_KEY);
  localStorage.removeItem(CURRENT_BUSINESS_KEY);
  localStorage.removeItem(CURRENT_ADMIN_KEY);
  localStorage.removeItem("ezdry_admin_logged_in");
  clearTokens();
}
