type ApiResponse<T> = T;

type CustomerAuthResponse = {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    phone: string;
    address?: string;
    city?: string;
    pincode?: string;
    role?: string;
  };
};

type BusinessAuthResponse = {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role?: string;
  };
  business: {
    id: string;
    userId: string;
    shopName: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    status?: string;
  };
};

type AdminAuthResponse = {
  token: string;
  refreshToken?: string;
  user: { id: string; name?: string; email?: string; role?: string };
};

function getApiBaseUrl() {
  const configured =
    (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
    (import.meta.env.VITE_API_URL as string | undefined)?.trim() ||
    (typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
      ? "http://localhost:8080"
      : "");
  return `${(configured || "").replace(/\/+$/, "")}/api`;
}

async function request<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    data?: unknown;
    message?: string;
    error?: string;
  };

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || payload.error || "Request failed");
  }

  // Unwrap the unified envelope when present.
  return (payload.data !== undefined ? payload.data : payload) as T;
}

export function registerCustomer(payload: {
  name: string;
  phone: string;
  password: string;
  address?: string;
  city?: string;
  pincode?: string;
}) {
  return request<CustomerAuthResponse>("/auth/customers/register", payload);
}

export function loginCustomer(payload: { phone: string; password: string }) {
  return request<CustomerAuthResponse>("/auth/customers/login", payload);
}

export function registerBusiness(payload: {
  shopName: string;
  ownerName: string;
  email?: string;
  phone: string;
  address: string;
  city: string;
  password: string;
  gstNumber?: string;
}) {
  return request<BusinessAuthResponse>("/auth/businesses/register", payload);
}

export function loginBusiness(payload: { phone: string; password: string }) {
  return request<BusinessAuthResponse>("/auth/businesses/login", payload);
}

export function loginAdmin(payload: { email: string; password: string }) {
  return request<AdminAuthResponse>("/auth/admin/login", payload);
}