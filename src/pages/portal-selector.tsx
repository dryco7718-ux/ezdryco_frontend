import { Link } from "wouter";
import { motion } from "framer-motion";
import { User, Store, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WashifyLogo } from "@/components/Logo";

export default function PortalSelector() {
  const portals = [
    {
      id: "customer",
      title: "Customer App",
      description: "Book pickups, track orders, and manage your laundry.",
      icon: User,
      href: "/customer/login",
      color: "text-sky-600",
      bgColor: "bg-sky-100",
    },
    {
      id: "business",
      title: "Business Partner",
      description: "Manage your dry cleaning business, orders, and riders.",
      icon: Store,
      href: "/business/login",
      color: "text-sky-600",
      bgColor: "bg-sky-100",
    },
    {
      id: "admin",
      title: "Super Admin",
      description: "Platform oversight, analytics, and commission management.",
      icon: ShieldCheck,
      href: "/admin/login",
      color: "text-sky-600",
      bgColor: "bg-sky-100",
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-sky-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <WashifyLogo size={42} />
        </div>
        <p className="text-base text-sky-600 font-medium mb-1">Washify - Cloth Spa, Wear Fresh Every Day</p>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Select a portal to experience the complete Laundry & Dry Cleaning platform.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {portals.map((portal, i) => (
          <motion.div
            key={portal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={portal.href} className="block h-full transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl">
              <Card className="h-full border border-sky-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                <CardHeader className="text-center pb-2">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${portal.bgColor}`}>
                    <portal.icon className={`w-8 h-8 ${portal.color}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{portal.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm text-gray-500">
                    {portal.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
