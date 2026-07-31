import { Suspense, lazy } from "react";
import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  getCurrentCustomer,
  getCurrentBusiness,
  getCurrentAdmin,
} from "@/lib/session";

import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";

import { CustomerLayout } from "@/layouts/customer-layout";
import { BusinessLayout } from "@/layouts/business-layout";
import { AdminLayout } from "@/layouts/admin-layout";

import CustomerLogin from "@/pages/customer/login";
import CustomerRegister from "@/pages/customer/register";
import CustomerHome from "@/pages/customer/home";
import CustomerBook from "@/pages/customer/book";
import CustomerSchedule from "@/pages/customer/schedule";
import CustomerCheckout from "@/pages/customer/checkout";
import CustomerPaymentSuccess from "@/pages/customer/payment-success";
import CustomerTrack from "@/pages/customer/track";
import CustomerReview from "@/pages/customer/review";
import CustomerProfile from "@/pages/customer/profile";
import CustomerOrders from "@/pages/customer/orders";
import CustomerSelectItems from "@/pages/customer/select-items";

import BusinessLogin from "@/pages/business/login";
import BusinessRegister from "@/pages/business/register";
import BusinessDashboard from "@/pages/business/dashboard";
import BusinessOrders from "@/pages/business/orders";
import BusinessPricing from "@/pages/business/pricing";
import BusinessCoupons from "@/pages/business/coupons";
import BusinessRiders from "@/pages/business/riders";
import BusinessCustomers from "@/pages/business/customers";
import BusinessNotifications from "@/pages/business/notifications";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminBusinesses from "@/pages/admin/businesses";
import AdminCommission from "@/pages/admin/commission";
import AdminUsers from "@/pages/admin/users";
import AdminNotifications from "@/pages/admin/notifications";
import AdminBlogs from "@/pages/admin/blogs";

// EAGER LOADED PAGES (Critical path)
import BlogIndex from "@/pages/seo/blog-index";
import HowItWorks from "@/pages/how-it-works";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy";
import TermsOfUse from "@/pages/terms";
import RefundPolicy from "@/pages/refund";
// LAZY LOADED PAGES (Code Splitting)
// Heavy pages - loaded on demand
const AreasWeServe = lazy(() => import("@/pages/areas-we-serve"));
const Plans = lazy(() => import("@/pages/plans"));
const CommercialPage = lazy(() => import("@/pages/commercial"));
const Services = lazy(() => import("@/pages/services"));
const ShoeCleaning = lazy(() => import("@/pages/shoe-cleaning"));
const CarpetCleaning = lazy(() => import("@/pages/carpet-cleaning"));
const CurtainCleaning = lazy(() => import("@/pages/curtain-cleaning"));

// Locality Pages - Lazy loaded for performance
const ShastriNagarLaundry = lazy(() => import("@/pages/seo/shastri-nagar-laundry"));
const NasibpurLaundry = lazy(() => import("@/pages/seo/nasibpur-laundry"));
const KoriawasLaundry = lazy(() => import("@/pages/seo/koriawas-laundry"));
const HudaSectorLaundry = lazy(() => import("@/pages/seo/huda-sector-laundry"));
const KailashNagarLaundry = lazy(() => import("@/pages/seo/kailash-nagar-laundry"));
const HousingBoardLaundry = lazy(() => import("@/pages/seo/housing-board-laundry"));

// SEO Pages - Lazy loaded
const LaundryServiceNarnaul = lazy(() => import("@/pages/seo/laundry-service-narnaul"));
const DryCleaningNarnaul = lazy(() => import("@/pages/seo/dry-cleaning-narnaul"));
const LaundryNearMeNarnaul = lazy(() => import("@/pages/seo/laundry-near-me-narnaul"));
const AdarshNagarLaundry = lazy(() => import("@/pages/seo/adarsh-nagar-laundry"));
const MahendragarhRoadLaundry = lazy(() => import("@/pages/seo/mahendragarh-road-laundry"));
const BlogPost = lazy(() => import("@/pages/seo/blog-post"));

const queryClient = new QueryClient({
  defaultOptions: { 
    queries: { 
      retry: 1, 
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

function WithCustomerLayout({ children }: { children: React.ReactNode }) {
  if (!getCurrentCustomer()) return <Redirect to="/customer/login" />;
  return <CustomerLayout>{children}</CustomerLayout>;
}
function WithBusinessLayout({ children }: { children: React.ReactNode }) {
  if (!getCurrentBusiness()) return <Redirect to="/business/login" />;
  return <BusinessLayout>{children}</BusinessLayout>;
}
function WithAdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin =
    getCurrentAdmin() || localStorage.getItem("ezdry_admin_logged_in") === "true";
  if (!isAdmin) return <Redirect to="/admin/login" />;
  return <AdminLayout>{children}</AdminLayout>;
}

function Router() {
  return (
    <Switch>
      {/* Main Landing Page */}
      <Route path="/" component={LandingPage} />

      {/* New Public Pages */}
      <Route path="/services" component={Services} />
      <Route path="/shoe-cleaning-narnaul" component={ShoeCleaning} />
      <Route path="/carpet-cleaning-narnaul" component={CarpetCleaning} />
      <Route path="/curtain-cleaning-narnaul" component={CurtainCleaning} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/commercial" component={CommercialPage} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/plans" component={Plans} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfUse} />
      <Route path="/refund" component={RefundPolicy} />
      {/* SEO Pages — Narnaul */}
      <Route path="/laundry-service-narnaul" component={LaundryServiceNarnaul} />
      <Route path="/dry-cleaning-narnaul" component={DryCleaningNarnaul} />
      <Route path="/laundry-near-me-narnaul" component={LaundryNearMeNarnaul} />
      <Route path="/adarsh-nagar-laundry" component={AdarshNagarLaundry} />
      <Route path="/mahendragarh-road-laundry" component={MahendragarhRoadLaundry} />
      {/* Areas We Serve Hub + Locality Pages */}
      <Route path="/areas-we-serve" component={AreasWeServe} />
      <Route path="/shastri-nagar-laundry" component={ShastriNagarLaundry} />
      <Route path="/nasibpur-laundry" component={NasibpurLaundry} />
      <Route path="/koriawas-laundry" component={KoriawasLaundry} />
      <Route path="/huda-sector-laundry" component={HudaSectorLaundry} />
      <Route path="/kailash-nagar-laundry" component={KailashNagarLaundry} />
      <Route path="/housing-board-laundry" component={HousingBoardLaundry} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />

      {/* Customer Portal */}
      <Route path="/customer/login" component={CustomerLogin} />
      <Route path="/customer/register" component={CustomerRegister} />
      <Route path="/customer/home">
        {() => <WithCustomerLayout><CustomerHome /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/book">
        {() => <WithCustomerLayout><CustomerBook /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/book/select-items">
        {() => <WithCustomerLayout><CustomerSelectItems /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/schedule">
        {() => <WithCustomerLayout><CustomerSchedule /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/checkout">
        {() => <WithCustomerLayout><CustomerCheckout /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/payment-success">
        {() => <WithCustomerLayout><CustomerPaymentSuccess /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/track/:id">
        {() => <WithCustomerLayout><CustomerTrack /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/review/:id">
        {() => <WithCustomerLayout><CustomerReview /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/orders">
        {() => <WithCustomerLayout><CustomerOrders /></WithCustomerLayout>}
      </Route>
      <Route path="/customer/profile">
        {() => <WithCustomerLayout><CustomerProfile /></WithCustomerLayout>}
      </Route>

      {/* Business Portal */}
      <Route path="/business/register" component={BusinessRegister} />
      <Route path="/business/login" component={BusinessLogin} />
      <Route path="/business/dashboard">
        {() => <WithBusinessLayout><BusinessDashboard /></WithBusinessLayout>}
      </Route>
      <Route path="/business/orders">
        {() => <WithBusinessLayout><BusinessOrders /></WithBusinessLayout>}
      </Route>
      <Route path="/business/pricing">
        {() => <WithBusinessLayout><BusinessPricing /></WithBusinessLayout>}
      </Route>
      <Route path="/business/coupons">
        {() => <WithBusinessLayout><BusinessCoupons /></WithBusinessLayout>}
      </Route>
      <Route path="/business/riders">
        {() => <WithBusinessLayout><BusinessRiders /></WithBusinessLayout>}
      </Route>
      <Route path="/business/customers">
        {() => <WithBusinessLayout><BusinessCustomers /></WithBusinessLayout>}
      </Route>
      <Route path="/business/notifications">
        {() => <WithBusinessLayout><BusinessNotifications /></WithBusinessLayout>}
      </Route>

      {/* Admin Portal */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard">
        {() => <WithAdminLayout><AdminDashboard /></WithAdminLayout>}
      </Route>
      <Route path="/admin/businesses">
        {() => <WithAdminLayout><AdminBusinesses /></WithAdminLayout>}
      </Route>
      <Route path="/admin/commission">
        {() => <WithAdminLayout><AdminCommission /></WithAdminLayout>}
      </Route>
      <Route path="/admin/users">
        {() => <WithAdminLayout><AdminUsers /></WithAdminLayout>}
      </Route>
      <Route path="/admin/notifications">
        {() => <WithAdminLayout><AdminNotifications /></WithAdminLayout>}
      </Route>
      <Route path="/admin/blogs">
        {() => <WithAdminLayout><AdminBlogs /></WithAdminLayout>}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

// Loading fallback for Suspense
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  // Fallback for BASE_URL to prevent undefined errors
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={baseUrl}>
          <Suspense fallback={<PageLoader />}>
            <Router />
          </Suspense>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
