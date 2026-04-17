export default function Subscriptions() {
  return (
    <div className="p-6">
      <div className="rounded-2xl border border-sky-100 bg-white p-6 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Plans Disabled</h2>
        <p className="mt-2 text-sm text-gray-500">
          Subscription plans are hidden in this build because the current database schema does not support them reliably.
        </p>
      </div>
    </div>
  );
}
