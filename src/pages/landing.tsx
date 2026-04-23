import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Truck, Star, CheckCircle, MapPin,
  ChevronRight, Sparkles, BookOpenText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { listBlogs } from "@/lib/blogs";
import { getCurrentCustomer, getCurrentBusiness } from "@/lib/session";
import { useSEO } from "@/hooks/useSEO";
import { BlogCard } from "@/components/BlogCard";
import PublicLayout from "@/layouts/public-layout";

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || "EZDRY";
const CONTACT_PHONE = "+91 80533 17489";
const CONTACT_EMAIL = "dryco7718@gmail.com";
const SERVICE_AREA = "Narnaul";

const SERVICES = [
  { icon: "🧺", title: "Wash & Fold", desc: "Fresh, clean clothes folded neatly and ready to wear.", price: "From ₹25/item" },
  { icon: "👔", title: "Dry Cleaning", desc: "Professional dry cleaning for delicate & premium fabrics.", price: "From ₹80/item" },
  { icon: "♨️", title: "Steam Iron", desc: "Wrinkle-free, crisp clothes with professional steam ironing.", price: "From ₹15/item" },
  { icon: "🛏️", title: "Bedding & Linen", desc: "Deep clean for bedsheets, blankets, pillows & curtains.", price: "From ₹80/piece" },
];

const STEPS = [
  { icon: "📱", title: "Book Online", desc: "Select your items and preferred pickup time slot." },
  { icon: "🚴", title: "We Pick Up", desc: "Our rider arrives at your doorstep on time." },
  { icon: "✨", title: "Expert Cleaning", desc: "Your clothes get the Cloth Spa treatment." },
  { icon: "🎁", title: "Delivered Fresh", desc: "Neatly packed and delivered back to you." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", city: "Narnaul", text: `${BRAND_NAME} has changed my life! Clothes come back perfectly clean every time. The app is super easy to use.`, rating: 5 },
  { name: "Arjun Mehta", city: "Narnaul", text: "Best laundry service I've ever used. Pickup on time, delivery next day. Totally recommended!", rating: 5 },
  { name: "Neha Gupta", city: "Narnaul", text: "My dry cleaning is always perfect. They take great care of delicate fabrics. 5 stars!", rating: 5 },
];

export default function LandingPage() {
  const [, navigate] = useLocation();
  const blogPosts = listBlogs(false).slice(0, 3);

  useSEO({
    title: "Best Laundry & Dry Cleaning Service in Narnaul | Free Pickup — EZDRY",
    description: "Book laundry, dry cleaning & ironing in Narnaul, Haryana. Free doorstep pickup. Clothes back in 24–48 hrs. Starting ₹199. EZDRY — Narnaul’s trusted laundry service.",
  });

  // Auto-redirect logged in users to their home pages
  useEffect(() => {
    const customer = getCurrentCustomer();
    const business = getCurrentBusiness();
    
    if (customer?.id) {
      navigate("/customer/home");
    } else if (business?.id) {
      navigate("/business/dashboard");
    }
  }, [navigate]);

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="pt-12 pb-20 bg-gradient-to-br from-sky-50 via-white to-sky-50 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 -z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200 rounded-full blur-3xl opacity-30 -z-0" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" /> Cloth Spa — Wear Fresh, Every Day
              </div>
              <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.05] mb-6 tracking-tight">
                Laundry & Dry Cleaning<br />
                <span className="text-sky-500">Service in Narnaul</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mb-8 leading-relaxed max-w-xl">
                Premium laundry & dry cleaning at your doorstep. Book a pickup, we'll do the rest — fresh clothes delivered back to you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/customer/login")}
                  className="h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-semibold text-base px-8 shadow-lg shadow-sky-200"
                >
                  <Truck className="w-5 h-5 mr-2" />
                  Schedule a Pickup
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  onClick={() => navigate("/business/register")}
                  variant="outline"
                  className="h-14 border-sky-200 text-sky-600 hover:bg-sky-50 rounded-2xl font-semibold text-base px-8"
                >
                  Join Us as Business
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> Free Pickup
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> 24hr Delivery
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> 100% Safe
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-sky-400 to-sky-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-sky-300">
                  <div className="text-center text-white">
                    <Shirt className="w-24 h-24 mx-auto mb-4 opacity-90" />
                    <p className="text-2xl font-bold">Cloth Spa</p>
                    <p className="text-sky-100 text-sm mt-1">Your clothes, our care</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-sky-100">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">4.9</span>
                    <span className="text-gray-400 text-sm">/ 5.0</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">10,000+ happy customers</p>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-sky-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-sky-500" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Free Pickup</p>
                      <p className="text-xs text-gray-400">On every order</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-sky-500">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "50,000+", label: "Orders Completed" },
              { value: "4.9★", label: "Average Rating" },
              { value: "24hrs", label: "Turnaround Time" },
              { value: "100%", label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">{stat.value}</p>
                <p className="text-sky-100 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Professional cleaning solutions for every fabric, every occasion.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-sky-50 rounded-3xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all border border-sky-100 cursor-pointer group"
                onClick={() => navigate("/customer/login")}
              >
                <div className="text-5xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">{s.desc}</p>
                <span className="text-sky-500 font-semibold text-sm">{s.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Simple. Fast. Reliable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-sky-200 -z-0" />
                )}
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-sm border border-sky-100 relative z-10">
                  {step.icon}
                </div>
                <div className="w-7 h-7 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto -mt-3 mb-3 relative z-10">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => navigate("/customer/login")} className="h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-semibold text-base px-10 shadow-lg shadow-sky-200">
              Book Your First Pickup
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">What Our Customers Say</h2>
            <p className="text-gray-500">Trusted by thousands of happy customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-sky-50 rounded-3xl p-6 border border-sky-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section id="blogs" className="py-20 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">EZDRY Blog</h2>
            <p className="text-gray-500">Laundry tips, fabric care guides, and service updates.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
            >
              View All Articles <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* JOIN AS BUSINESS */}
      <section className="py-20 bg-gradient-to-br from-sky-500 to-sky-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="text-5xl mb-6">🏪</div>
            <h2 className="text-4xl font-extrabold text-white mb-4">Own a Laundry Business?</h2>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl mx-auto">
              Partner with {BRAND_NAME} and grow your laundry business in Narnaul. Get more customers, manage orders easily, and earn more — all on one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/business/register")}
                className="h-14 bg-white text-sky-600 hover:bg-sky-50 rounded-2xl font-bold text-base px-10"
              >
                Join as Business Partner
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                onClick={() => navigate("/business/login")}
                variant="outline"
                className="h-14 border-white/50 text-white hover:bg-white/10 rounded-2xl font-semibold text-base px-8"
              >
                Already Registered? Login
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Call Us</h3>
              <p className="text-gray-500 text-sm">{CONTACT_PHONE}</p>
              <p className="text-gray-400 text-xs">Mon–Sat, 8AM–8PM</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Email Us</h3>
              <p className="text-gray-500 text-sm">{CONTACT_EMAIL}</p>
              <p className="text-gray-400 text-xs">Response within 24 hours</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Service Areas</h3>
              <p className="text-gray-500 text-sm">{SERVICE_AREA}</p>
              <p className="text-gray-400 text-xs">Local pickup and delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS — NARNAUL SEO PAGES */}
      <section className="py-10 bg-sky-50 border-t border-sky-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-gray-500 mb-4">EZDRY Laundry Service — Narnaul, Haryana</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Laundry Service Narnaul", href: "/laundry-service-narnaul" },
              { label: "Dry Cleaning Narnaul", href: "/dry-cleaning-narnaul" },
              { label: "Laundry Near Me Narnaul", href: "/laundry-near-me-narnaul" },
            ].map((area) => (
              <button
                key={area.label}
                onClick={() => navigate(area.href)}
                className="flex items-center gap-1.5 text-sm text-sky-700 bg-white border border-sky-200 hover:bg-sky-50 rounded-full px-4 py-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> {area.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-1.5 text-sm text-sky-700 bg-white border border-sky-200 hover:bg-sky-50 rounded-full px-4 py-1.5 transition-colors"
            >
              <BookOpenText className="w-3.5 h-3.5" /> Laundry Tips Blog
            </button>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}
