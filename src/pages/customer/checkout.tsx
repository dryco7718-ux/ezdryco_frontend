import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Tag, CreditCard, Smartphone, Check, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateAddress, useCreateOrder, useValidateCoupon, useListAddresses } from "@/lib/api-client-react";
import { getCurrentCustomer, updateCustomerSession } from "@/lib/session";

const SELECTED_BUSINESS_STORAGE_KEY = "washify_selected_business";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI / Google Pay", icon: Smartphone, color: "text-green-600" },
  { id: "cod", label: "Cash on Delivery", icon: CreditCard, color: "text-orange-600" },
];

export default function Checkout() {
  const [, navigate] = useLocation();
  const customer = getCurrentCustomer();
  const customerId = customer?.id ?? "";
  const { data: addresses, refetch: refetchAddresses } = useListAddresses(customerId, { query: { enabled: !!customerId } as any });
  const defaultAddressId = addresses?.find((address) => address.isDefault)?.id ?? addresses?.[0]?.id;
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [submitError, setSubmitError] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(defaultAddressId);
  const [addressForm, setAddressForm] = useState({
    label: "home",
    line1: customer?.address ?? "",
    line2: "",
    city: customer?.city ?? "Narnaul",
    pincode: customer?.pincode ?? "",
    lat: "",
    lng: "",
  });
  const [locationLoading, setLocationLoading] = useState(false);

  const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
  const schedule = JSON.parse(sessionStorage.getItem("schedule") || "{}");
  const selectedBusiness = (() => {
    try {
      const saved = sessionStorage.getItem(SELECTED_BUSINESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) as { id?: string; name?: string } : null;
    } catch {
      return null;
    }
  })();
  const businessId = selectedBusiness?.id ?? cartItems[0]?.businessId;

  const subtotal = cartItems.reduce((sum: number, i: any) => sum + i.totalPrice, 0);
  const deliveryCharge = 40;
  const total = subtotal + deliveryCharge - couponDiscount;

  const validateCoupon = useValidateCoupon();
  const createOrder = useCreateOrder();
  const createAddress = useCreateAddress();

  const addressId = selectedAddressId ?? defaultAddressId;

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSubmitError("Current location is not supported in this browser.");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAddressForm((prev) => ({
          ...prev,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
          line1: prev.line1 || "Current location selected",
        }));
        setLocationLoading(false);
      },
      () => {
        setSubmitError("Unable to fetch current location. Please enter address manually.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const ensureAddress = async () => {
    if (addressId) return addressId;
    if (!customerId) throw new Error("Please login again.");
    if (!addressForm.line1.trim() || !addressForm.city.trim() || !addressForm.pincode.trim()) {
      throw new Error("Please enter pickup address or select current location.");
    }

    const created = await createAddress.mutateAsync({
      customerId,
      data: {
        label: addressForm.label as "home" | "work" | "other",
        line1: addressForm.line1.trim(),
        line2: addressForm.line2.trim() || undefined,
        city: addressForm.city.trim(),
        pincode: addressForm.pincode.trim(),
        lat: addressForm.lat ? Number(addressForm.lat) : undefined,
        lng: addressForm.lng ? Number(addressForm.lng) : undefined,
        isDefault: true,
      },
    });

    updateCustomerSession({
      address: addressForm.line1.trim(),
      city: addressForm.city.trim(),
      pincode: addressForm.pincode.trim(),
    });
    await refetchAddresses();
    setSelectedAddressId(created.id);
    return created.id;
  };

  const handleApplyCoupon = async () => {
    try {
      const result = await validateCoupon.mutateAsync({ data: { code: couponCode, orderValue: subtotal } });
      if (result.valid) {
        setCouponDiscount(result.discount);
        setCouponMsg(result.message);
      } else {
        setCouponMsg(result.message);
        setCouponDiscount(0);
      }
    } catch {
      setCouponMsg("Error validating coupon");
    }
  };

  const handlePlaceOrder = async () => {
    setSubmitError("");
    try {
      if (!customerId || !businessId) {
        throw new Error("Pehle laundry partner select karo.");
      }
      const resolvedAddressId = await ensureAddress();
      const order = await createOrder.mutateAsync({
        data: {
          customerId,
          businessId,
          items: cartItems,
          pickupDate: schedule.date || new Date(Date.now() + 86400000).toISOString().split("T")[0],
          pickupSlot: schedule.slot || "9am-12pm",
          addressId: resolvedAddressId,
          paymentMethod: paymentMethod as "upi" | "cod",
          couponCode: couponCode || undefined,
          isExpress: false,
        }
      });
      navigate(`/customer/payment-success?orderId=${order.id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to place order right now.");
    }
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <div className="bg-white px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/customer/schedule")} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {selectedBusiness?.name && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-500">Selected laundry partner</p>
            <p className="text-sm font-semibold text-gray-900">{selectedBusiness.name}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Pickup Address</h3>
            <button onClick={handleUseCurrentLocation} type="button" className="text-xs text-blue-600 font-medium flex items-center gap-1" disabled={locationLoading}>
              <Navigation className="w-3.5 h-3.5" /> {locationLoading ? "Locating..." : "Use current location"}
            </button>
          </div>

          {(addresses ?? []).length > 0 && (
            <div className="space-y-2">
              {(addresses ?? []).map((address) => (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => setSelectedAddressId(address.id)}
                  className={`w-full text-left rounded-xl border px-3 py-3 ${addressId === address.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 capitalize">{address.label}</p>
                      <p className="text-xs text-gray-600">{address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city} - {address.pincode}</p>
                    </div>
                    {addressId === address.id && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Address line 1" value={addressForm.line1} onChange={(e) => setAddressForm((prev) => ({ ...prev, line1: e.target.value }))} />
            <Input placeholder="Address line 2 (optional)" value={addressForm.line2} onChange={(e) => setAddressForm((prev) => ({ ...prev, line2: e.target.value }))} />
            <Input placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm((prev) => ({ ...prev, city: e.target.value }))} />
            <Input placeholder="Pincode" value={addressForm.pincode} onChange={(e) => setAddressForm((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))} />
          </div>
          {(addressForm.lat || addressForm.lng) && (
            <p className="text-xs text-green-600">Current location linked: {addressForm.lat}, {addressForm.lng}</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.itemName} ({item.serviceType}) × {item.quantity}</span>
                <span className="font-medium">₹{item.totalPrice}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span><span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery charge</span><span>₹{deliveryCharge}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Coupon discount</span><span>-₹{couponDiscount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-900 border-t border-gray-100 pt-2">
              <span>Total</span><span className="text-blue-600">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Tag className="w-4 h-4 text-green-500" /> Apply Coupon</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={e => setCouponCode(e.target.value.toUpperCase())}
              className="rounded-xl border-gray-200"
            />
            <Button onClick={handleApplyCoupon} variant="outline" disabled={!couponCode || validateCoupon.isPending} className="rounded-xl border-blue-200 text-blue-600">
              Apply
            </Button>
          </div>
          {couponMsg && (
            <p className={`text-xs mt-2 font-medium ${couponDiscount > 0 ? "text-green-600" : "text-red-500"}`}>{couponMsg}</p>
          )}
          <div className="flex gap-2 mt-2">
            {["FIRST50", "WASH20"].map(code => (
              <button key={code} onClick={() => setCouponCode(code)} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200">
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === method.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <method.icon className={`w-5 h-5 ${method.color}`} />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{method.label}</p>
                </div>
                {paymentMethod === method.id && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 bg-white border-t border-gray-100">
        {submitError && (
          <div className="mb-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {submitError}
          </div>
        )}
        <Button
          onClick={handlePlaceOrder}
          disabled={createOrder.isPending}
          className="w-full h-14 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-base"
        >
          {createOrder.isPending ? "Placing Order..." : `Pay ₹${total} & Place Order`}
        </Button>
      </div>
    </div>
  );
}
