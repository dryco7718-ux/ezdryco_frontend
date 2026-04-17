import { useState } from "react";
import { Search, User, ShieldCheck, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListCustomers, useListBusinesses } from "@/lib/api-client-react";

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const { data: customersData } = useListCustomers({ search, limit: 30 });
  const { data: businesses } = useListBusinesses({ limit: 30 });
  const businessList = businesses?.businesses ?? [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">User Management</h2>
        <p className="text-gray-500 text-sm">All platform users — customers & business owners</p>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="pl-10 rounded-xl" />
      </div>

      <Tabs defaultValue="customers">
        <TabsList className="mb-4">
          <TabsTrigger value="customers" className="gap-1.5"><User className="w-4 h-4" /> Customers ({customersData?.total ?? 0})</TabsTrigger>
          <TabsTrigger value="businesses" className="gap-1.5"><Store className="w-4 h-4" /> Business Owners ({businessList.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(customersData?.customers ?? []).map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">{c.name[0]}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{c.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{c.phone}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{c.email ?? "-"}</td>
                      <td className="px-4 py-3">
                        <Badge className={c.isBlocked ? "bg-red-100 text-red-700 border-0" : "bg-green-100 text-green-700 border-0"}>
                          {c.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="businesses">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Business</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Owner</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">City</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {businessList.map((b: any) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">{b.name[0]}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{b.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{b.ownerName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{b.city}</td>
                      <td className="px-4 py-3">
                        <Badge className={b.isActive ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                          {b.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
