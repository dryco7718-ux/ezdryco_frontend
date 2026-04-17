import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIME_SLOTS = [
  { id: "9am-12pm", label: "9 AM - 12 PM", icon: "🌅" },
  { id: "12pm-3pm", label: "12 PM - 3 PM", icon: "☀️" },
  { id: "3pm-6pm", label: "3 PM - 6 PM", icon: "🌤️" },
  { id: "6pm-9pm", label: "6 PM - 9 PM", icon: "🌆" },
];

function getNextDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      date: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("en", { weekday: "short" }),
      num: d.getDate(),
      month: d.toLocaleDateString("en", { month: "short" }),
    };
  });
}

export default function SchedulePickup() {
  const [, navigate] = useLocation();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const days = getNextDays(7);

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) return;
    sessionStorage.setItem("schedule", JSON.stringify({ date: selectedDate, slot: selectedSlot }));
    navigate("/customer/checkout");
  };

  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="bg-white px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate("/customer/book")} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg text-gray-900">Schedule Pickup</h1>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-6">
        {/* Date Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Select Date</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {days.map(day => (
              <motion.button
                key={day.date}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(day.date)}
                className={`min-w-[64px] flex flex-col items-center py-3 px-2 rounded-2xl border-2 transition-all ${
                  selectedDate === day.date
                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                }`}
              >
                <span className="text-xs font-medium opacity-80">{day.day}</span>
                <span className="text-xl font-bold my-0.5">{day.num}</span>
                <span className="text-xs opacity-70">{day.month}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Select Time Slot</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TIME_SLOTS.map(slot => (
              <motion.button
                key={slot.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedSlot(slot.id)}
                className={`py-4 px-3 rounded-2xl border-2 text-left transition-all ${
                  selectedSlot === slot.id
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-blue-200"
                }`}
              >
                <span className="text-lg mb-1 block">{slot.icon}</span>
                <span className={`text-sm font-medium ${selectedSlot === slot.id ? "text-blue-700" : "text-gray-700"}`}>
                  {slot.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 bg-white border-t border-gray-100">
        <Button
          onClick={handleNext}
          disabled={!selectedDate || !selectedSlot}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold disabled:opacity-50"
        >
          Continue to Checkout
        </Button>
      </div>
    </div>
  );
}
