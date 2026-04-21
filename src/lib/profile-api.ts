type CustomerProfilePayload = {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
  lat?: number | null;
  lng?: number | null;
};

type BusinessProfilePayload = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
  description?: string;
  businessType?: string;
};

function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return (configured || "/api").replace(/\/+$/, "");
}

import { getSessionToken } from "./session";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getSessionToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> ?? {}),
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers,
    ...init,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { error?: string }).error || "Request failed");
  }

  return data as T;
}

export function updateCustomerProfile(customerId: string, payload: CustomerProfilePayload) {
  return request(`/customers/${customerId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updateBusinessProfile(businessId: string, payload: BusinessProfilePayload) {
  return request(`/businesses/${businessId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}