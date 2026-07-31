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

import { getSessionToken } from "./session";

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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getSessionToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init?.headers as Record<string, string>) ?? {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers,
    ...init,
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

  return (payload.data !== undefined ? payload.data : payload) as T;
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