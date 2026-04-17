import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListItems, useCreateItem, useUpdateItem, useDeleteItem } from "@/lib/api-client-react";
import { getCurrentBusiness } from "@/lib/session";

export default function PricingManager() {
  const business = getCurrentBusiness();
  const businessId = business?.id;
  const { data: apiItems, refetch } = useListItems({ businessId }, { query: { enabled: !!businessId } as any });
  const items = (apiItems ?? []) as any[];
  const [editId, setEditId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", priceWash: "", priceDryClean: "", priceIron: "" });
  const [formMessage, setFormMessage] = useState("");

  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();
  const createItem = useCreateItem();

  const startEdit = (item: any) => {
    setEditId(item.id);
    setEditValues({ priceWash: item.priceWash ?? "", priceDryClean: item.priceDryClean ?? "", priceIron: item.priceIron ?? "" });
  };

  const saveEdit = async (item: any) => {
    await updateItem.mutateAsync({
      id: item.id,
      data: {
        ...editValues,
        priceWash: editValues.priceWash !== "" ? Number(editValues.priceWash) : undefined,
        priceDryClean: editValues.priceDryClean !== "" ? Number(editValues.priceDryClean) : undefined,
        priceIron: editValues.priceIron !== "" ? Number(editValues.priceIron) : undefined,
      },
    }).catch((error) => {
      setFormMessage(error instanceof Error ? error.message : "Item update failed.");
    });
    setEditId(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteItem.mutateAsync({ id }).catch(() => {});
    refetch();
  };

  const handleAdd = async () => {
    if (!businessId) return;
    setFormMessage("");
    if (!newItem.name.trim()) {
      setFormMessage("Item name required hai.");
      return;
    }
    await createItem.mutateAsync({
      data: {
        name: newItem.name.trim(),
        category: "wash",
        businessId,
        priceWash: newItem.priceWash !== "" ? Number(newItem.priceWash) : undefined,
        priceDryClean: newItem.priceDryClean !== "" ? Number(newItem.priceDryClean) : undefined,
        priceIron: newItem.priceIron !== "" ? Number(newItem.priceIron) : undefined,
      },
    }).catch((error) => {
      setFormMessage(error instanceof Error ? error.message : "Item add failed.");
    });
    setShowAdd(false);
    setNewItem({ name: "", priceWash: "", priceDryClean: "", priceIron: "" });
    refetch();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pricing Manager</h2>
          <p className="text-gray-500 text-sm">Set prices for each item and service type</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="bg-green-500 hover:bg-green-600 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      {showAdd && (
        <Card className="border-2 border-dashed border-green-300 bg-green-50 mb-4 shadow-none">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs text-gray-600 mb-1 block font-medium">Item Name</label>
                <Input value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Shirt" className="h-9 rounded-lg" />
              </div>
              {[["priceWash", "Wash (₹)"], ["priceDryClean", "Dry Clean (₹)"], ["priceIron", "Iron (₹)"]].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs text-gray-600 mb-1 block font-medium">{label}</label>
                  <Input type="number" value={newItem[key as keyof typeof newItem]} onChange={e => setNewItem(p => ({ ...p, [key]: e.target.value }))} placeholder="0" className="h-9 rounded-lg" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd} className="bg-green-500 text-white rounded-lg gap-1"><Save className="w-3.5 h-3.5" /> Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)} className="rounded-lg"><X className="w-3.5 h-3.5" /></Button>
            </div>
            {formMessage && <p className="mt-2 text-xs text-red-600">{formMessage}</p>}
          </CardContent>
        </Card>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Item</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Wash (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Dry Clean (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Iron (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Express</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.name}</td>
                  {["priceWash", "priceDryClean", "priceIron"].map(key => (
                    <td key={key} className="px-4 py-3">
                      {editId === item.id ? (
                        <Input type="number" value={editValues[key] ?? ""} onChange={e => setEditValues(p => ({ ...p, [key]: e.target.value }))} className="h-8 w-20 rounded-lg text-sm" placeholder="-" />
                      ) : (
                        <span className="text-sm text-gray-700">{item[key] ? `₹${item[key]}` : "-"}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm text-gray-700">{item.expressMultiplier ?? 1.5}x</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {editId === item.id ? (
                        <>
                          <Button size="sm" onClick={() => saveEdit(item)} className="h-7 text-xs bg-green-500 text-white rounded-lg"><Save className="w-3 h-3" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditId(null)} className="h-7 rounded-lg"><X className="w-3 h-3" /></Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => startEdit(item)} className="h-7 rounded-lg text-blue-600 hover:bg-blue-50"><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)} className="h-7 rounded-lg text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">No pricing items added yet.</div>
          )}
        </div>
      </div>

      {/* Express Charges */}
      <Card className="mt-4 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Express Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Express orders are charged at <strong>1.5x</strong> the standard rate. Delivery in <strong>24 hours</strong> guaranteed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
