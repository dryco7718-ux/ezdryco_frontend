import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function WithCustomerLayout({ children }: { children: React.ReactNode }) {
  return <CustomerLayout>{children}</CustomerLayout>;
}
function WithBusinessLayout({ children }: { children: React.ReactNode }) {
  return <BusinessLayout>{children}</BusinessLayout>;
}
function WithAdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

function Router() {
  return (
    <Switch>
      {/* Main Landing Page */}
      <Route path="/" component={LandingPage} />

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

function App() {
  // Fallback for BASE_URL to prevent undefined errors
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={baseUrl}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
