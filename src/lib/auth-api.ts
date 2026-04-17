type ApiResponse<T> = T;

type CustomerAuthResponse = {
  token: string;
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

function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return (configured || "/api").replace(/\/+$/, "");
}

async function request<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }

  return data as T;
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