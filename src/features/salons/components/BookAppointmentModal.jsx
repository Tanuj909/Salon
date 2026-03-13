// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { X, Calendar, Clock, User, Scissors, CreditCard, MessageSquare, CheckCircle, AlertCircle, Loader2, ChevronRight, Sparkles } from "lucide-react";
// import { useCreateBooking } from "../../profile/hooks/useCreateBooking";
// import { useSalonServices } from "../hooks/useSalonServices";
// import { useSalonStaff } from "../hooks/useSalonStaff";
// import { useSalonTimings } from "../hooks/useSalonTimings";
// import { useStaffSlots } from "../hooks/useStaffSlots";

// const PAYMENT_METHODS = [
//     { value: "CASH", label: "CASH", icon: "💶" },
// ];

// const BookAppointmentModal = ({ isOpen, onClose, salonId, salonName, preSelectedService }) => {
//     const { submitBooking, loading: submitting, error: submitError, success, bookingResult, reset } = useCreateBooking();
//     const { services, loading: servicesLoading } = useSalonServices({ id: salonId });
//     const [selectedServices, setSelectedServices] = useState([]);
//     const { staff, loading: staffLoading } = useSalonStaff({
//         id: salonId,
//         serviceId: selectedServices.length > 0 ? selectedServices[0].id : null
//     });
//     const { timings, loading: timingsLoading } = useSalonTimings({ id: salonId });

//     // Date calculations for 4-day window (using local time)
//     const todayStr = useMemo(() => {
//         const now = new Date();
//         const year = now.getFullYear();
//         const month = String(now.getMonth() + 1).padStart(2, '0');
//         const day = String(now.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }, []);

//     const endDateStr = useMemo(() => {
//         const d = new Date();
//         d.setDate(d.getDate() + 3);
//         const year = d.getFullYear();
//         const month = String(d.getMonth() + 1).padStart(2, '0');
//         const day = String(d.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }, []);

//     // Form state
//     const [selectedStaff, setSelectedStaff] = useState(null);
//     const [bookingDate, setBookingDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [paymentMethod, setPaymentMethod] = useState("UPI");
//     const [customerNotes, setCustomerNotes] = useState("");
//     const [step, setStep] = useState(1); // 1: Services, 2: Staff & Time, 3: Review
//     const [activeDate, setActiveDate] = useState(todayStr);

//     // Slots fetching
//     const { slots: staffSlots, loading: slotsLoading, error: slotsError } = useStaffSlots({
//         staffId: selectedStaff?.id,
//         startDate: todayStr,
//         endDate: endDateStr
//     });

//     // Reset form when modal opens
//     useEffect(() => {
//         if (isOpen) {
//             if (preSelectedService) {
//                 setSelectedServices([preSelectedService]);
//                 setStep(2); // Skip to schedule step
//             } else {
//                 setSelectedServices([]);
//                 setStep(1);
//             }
//             setSelectedStaff(null);
//             setBookingDate("");
//             setStartTime("");
//             setPaymentMethod("UPI");
//             setCustomerNotes("");
//             setActiveDate(todayStr);
//             reset();
//         }
//     }, [isOpen, reset, preSelectedService, todayStr]);

//     // Close on escape
//     useEffect(() => {
//         const handleEsc = (e) => {
//             if (e.key === "Escape") onClose();
//         };
//         if (isOpen) window.addEventListener("keydown", handleEsc);
//         return () => window.removeEventListener("keydown", handleEsc);
//     }, [isOpen, onClose]);

//     // Prevent body scroll
//     useEffect(() => {
//         if (isOpen) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "";
//         }
//         return () => { document.body.style.overflow = ""; };
//     }, [isOpen]);

//     // Reset active date when staff changes
//     useEffect(() => {
//         if (selectedStaff) {
//             setActiveDate(todayStr);
//         }
//     }, [selectedStaff, todayStr]);

//     // Calculate totals
//     const totals = useMemo(() => {
//         const total = selectedServices.reduce((sum, s) => sum + (s.effectivePrice || s.price || 0), 0);
//         const duration = selectedServices.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
//         return { total, duration };
//     }, [selectedServices]);

//     const toggleService = (service) => {
//         setSelectedServices((prev) => {
//             const exists = prev.find((s) => s.id === service.id);
//             if (exists) return prev.filter((s) => s.id !== service.id);
//             return [...prev, service];
//         });
//     };

//     const canProceedStep1 = selectedServices.length > 0;

//     // --- Timings Validation ---
//     const getSelectedDayLabel = (dateStr) => {
//         if (!dateStr) return null;
//         const d = new Date(dateStr + "T00:00:00");
//         return d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
//     };

//     const isDateValid = useMemo(() => {
//         if (!activeDate || !timings || timings.length === 0) return true;
//         const dayLabel = getSelectedDayLabel(activeDate);
//         const dayData = timings.find((t) => t.dayOfWeek === dayLabel);
//         return dayData ? !dayData.isClosed : true;
//     }, [activeDate, timings]);

//     const availableTimeSlots = useMemo(() => {
//         if (!selectedStaff || !staffSlots) return [];
//         // Group slots by date
//         const grouped = staffSlots.reduce((acc, slot) => {
//             if (!acc[slot.date]) acc[slot.date] = [];
//             acc[slot.date].push({
//                 time: slot.startTime.substring(0, 5),
//                 status: slot.status,
//                 id: slot.id
//             });
//             return acc;
//         }, {});
//         return grouped[activeDate] || [];
//     }, [selectedStaff, staffSlots, activeDate]);

//     const availableDates = useMemo(() => {
//         const dates = [];
//         for (let i = 0; i < 4; i++) {
//             const d = new Date();
//             d.setDate(d.getDate() + i);
//             const dateStr = d.toISOString().split('T')[0];
//             dates.push({
//                 date: dateStr,
//                 label: i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
//             });
//         }
//         return dates;
//     }, []);

//     const canProceedStep2 = selectedStaff && bookingDate && startTime;
//     const canSubmit = canProceedStep1 && canProceedStep2;

//     const handleSubmit = async () => {
//         if (!canSubmit) return;

//         const bookingData = {
//             businessId: Number(salonId),
//             staffId: selectedStaff ? Number(selectedStaff.id) : null,
//             bookingDate,
//             startTime,
//             serviceIds: selectedServices.map((s) => s.id),
//             customerNotes: customerNotes.trim() || null,
//             paymentMethod,
//         };

//         // Remove null staffId if not selected
//         if (!bookingData.staffId) delete bookingData.staffId;

//         try {
//             await submitBooking(bookingData);
//         } catch {
//             // error handled by hook
//         }
//     };

//     if (!isOpen) return null;

//     // ─── Success Screen ──────────────────────────────────────────────────
//     if (success) {
//         return (
//             <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
//                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
//                 <div className="relative bg-white rounded-3xl max-w-md w-full p-10 text-center shadow-2xl animate-[slideUp_0.4s_ease]">
//                     <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-6">
//                         <CheckCircle className="w-10 h-10 text-[#10b981]" />
//                     </div>
//                     <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-3xl font-bold text-[#1C1C1C] mb-3">
//                         Booking Confirmed!
//                     </h3>
//                     <p className="text-[#7a7065] text-sm mb-2">
//                         Your appointment has been successfully booked.
//                     </p>
//                     {bookingResult?.bookingNumber && (
//                         <div className="bg-[#F7F3EE] rounded-2xl p-4 my-6">
//                             <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-1">Booking Number</span>
//                             <span className="text-xl font-bold text-[#1C1C1C] tracking-wider">{bookingResult.bookingNumber}</span>
//                         </div>
//                     )}
//                     <button
//                         onClick={onClose}
//                         className="w-full py-4 rounded-xl bg-[#1C1C1C] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#C8A951] hover:text-[#1C1C1C]"
//                     >
//                         Done
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
//             {/* Backdrop */}
//             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

//             {/* Modal */}
//             <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-[slideUp_0.3s_ease]">
//                 {/* Header */}
//                 <div className="bg-[#1C1C1C] px-8 py-6 flex items-center justify-between shrink-0">
//                     <div>
//                         <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-bold block mb-1">
//                             New Appointment
//                         </span>
//                         <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-white font-semibold">
//                             {salonName || "Book Your Visit"}
//                         </h2>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
//                     >
//                         <X size={18} />
//                     </button>
//                 </div>

//                 {/* Step Indicators */}
//                 <div className="px-8 py-4 bg-[#F7F3EE] border-b border-[#C8A951]/10 flex items-center gap-3 shrink-0">
//                     {[
//                         { num: 1, label: "Services" },
//                         { num: 2, label: "Schedule" },
//                         { num: 3, label: "Review" },
//                     ].map((s, i) => (
//                         <React.Fragment key={s.num}>
//                             <button
//                                 onClick={() => {
//                                     if (s.num < step) setStep(s.num);
//                                     if (s.num === 2 && canProceedStep1) setStep(2);
//                                     if (s.num === 3 && canProceedStep1 && canProceedStep2) setStep(3);
//                                 }}
//                                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${step === s.num ? "bg-[#C8A951] text-[#1C1C1C]" : step > s.num ? "bg-[#1C1C1C] text-white" : "bg-white text-[#9e9287] border border-[#C8A951]/10"}`}
//                             >
//                                 <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px]">
//                                     {step > s.num ? "✓" : s.num}
//                                 </span>
//                                 {s.label}
//                             </button>
//                             {i < 2 && <ChevronRight size={14} className="text-[#C8A951]/30" />}
//                         </React.Fragment>
//                     ))}
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 overflow-y-auto p-8">
//                     {/* ─── STEP 1: Select Services ───────────────────── */}
//                     {step === 1 && (
//                         <div>
//                             <div className="mb-6">
//                                 <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-1">
//                                     Select Services
//                                 </h3>
//                                 <p className="text-[#9e9287] text-sm">Choose one or more services for your appointment</p>
//                             </div>

//                             {servicesLoading ? (
//                                 <div className="flex items-center justify-center py-12">
//                                     <Loader2 className="w-6 h-6 text-[#C8A951] animate-spin" />
//                                     <span className="ml-3 text-[#9e9287] text-sm">Loading services...</span>
//                                 </div>
//                             ) : !services || services.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <Scissors className="w-10 h-10 text-[#C8A951]/30 mx-auto mb-3" />
//                                     <p className="text-[#9e9287] text-sm">No services available at this time.</p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-3">
//                                     {services.map((service) => {
//                                         const isSelected = selectedServices.some((s) => s.id === service.id);
//                                         return (
//                                             <button
//                                                 key={service.id}
//                                                 onClick={() => toggleService(service)}
//                                                 className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${isSelected ? "border-[#C8A951] bg-[#C8A951]/5 shadow-[0_0_0_1px_rgba(200,169,81,0.2)]" : "border-transparent bg-[#F7F3EE] hover:border-[#C8A951]/30 hover:bg-[#F7F3EE]/80"}`}
//                                             >
//                                                 <div className="flex items-center justify-between">
//                                                     <div className="flex items-center gap-4">
//                                                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isSelected ? "bg-[#C8A951] text-white" : "bg-white text-[#C8A951] border border-[#C8A951]/10"}`}>
//                                                             {isSelected ? <CheckCircle size={18} /> : <Scissors size={18} />}
//                                                         </div>
//                                                         <div>
//                                                             <h4 className="font-semibold text-[#1C1C1C] text-sm">{service.name}</h4>
//                                                             {service.durationMinutes && (
//                                                                 <span className="text-[#9e9287] text-xs flex items-center gap-1 mt-0.5">
//                                                                     <Clock size={10} /> {service.durationMinutes} min
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-right">
//                                                         <span className="font-[Cormorant_Garamond] text-xl font-bold text-[#1C1C1C]">
//                                                             ₹{service.effectivePrice || service.price}
//                                                         </span>
//                                                         {service.discountedPrice && service.discountedPrice < service.price && (
//                                                             <span className="text-xs text-[#9e9287] line-through ml-2">₹{service.price}</span>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </button>
//                                         );
//                                     })}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* ─── STEP 2: Staff, Date & Time ───────────────── */}
//                     {step === 2 && (
//                         <div className="space-y-8">
//                             {/* Staff Selection (Optional) */}
//                             <div>
//                                 <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-1">
//                                     Choose a Stylist
//                                 </h3>
//                                 <p className="text-[#9e9287] text-sm mb-4">Optional — select your preferred stylist</p>

//                                 {staffLoading ? (
//                                     <div className="flex items-center gap-3 py-4">
//                                         <Loader2 className="w-5 h-5 text-[#C8A951] animate-spin" />
//                                         <span className="text-[#9e9287] text-sm">Loading staff...</span>
//                                     </div>
//                                 ) : !staff || staff.length === 0 ? (
//                                     <p className="text-[#9e9287] text-sm py-4">No staff listed — one will be assigned.</p>
//                                 ) : (
//                                     <div className="flex gap-3 overflow-x-auto pb-2">
//                                         {/* "Any" option */}
//                                         <button
//                                             onClick={() => setSelectedStaff(null)}
//                                             className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[100px] ${!selectedStaff ? "border-[#C8A951] bg-[#C8A951]/5" : "border-transparent bg-[#F7F3EE] hover:border-[#C8A951]/20"}`}
//                                         >
//                                             <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${!selectedStaff ? "bg-[#C8A951] text-white" : "bg-white text-[#C8A951] border border-[#C8A951]/10"}`}>
//                                                 <Sparkles size={18} />
//                                             </div>
//                                             <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C1C1C]">Any</span>
//                                         </button>

//                                         {staff.map((member) => {
//                                             const isSelected = selectedStaff?.id === member.id;
//                                             return (
//                                                 <button
//                                                     key={member.id}
//                                                     onClick={() => setSelectedStaff(member)}
//                                                     className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[100px] ${isSelected ? "border-[#C8A951] bg-[#C8A951]/5" : "border-transparent bg-[#F7F3EE] hover:border-[#C8A951]/20"}`}
//                                                 >
//                                                     <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${isSelected ? "ring-2 ring-[#C8A951] ring-offset-2" : ""}`}>
//                                                         {member.profileImageUrl ? (
//                                                             <img src={member.profileImageUrl} alt={member.userFullName || member.fullName} className="w-full h-full object-cover" />
//                                                         ) : (
//                                                             <div className="w-full h-full bg-[#f5edce] flex items-center justify-center text-[#C8A951] font-bold text-sm">
//                                                                 {(member.userFullName || member.fullName)?.substring(0, 2).toUpperCase()}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <span className="text-[10px] font-bold text-[#1C1C1C] text-center leading-tight max-w-[80px] truncate">
//                                                         {member.userFullName || member.fullName}
//                                                     </span>
//                                                     {member.designation && (
//                                                         <span className="text-[8px] text-[#9e9287] truncate max-w-[80px]">{member.designation}</span>
//                                                     )}
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Date Selection Pills */}
//                             {selectedStaff && (
//                                 <div>
//                                     <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-xl text-[#1C1C1C] mb-1 flex items-center gap-2">
//                                         <Calendar size={18} className="text-[#C8A951]" />
//                                         Select Date
//                                     </h3>
//                                     <div className="flex gap-2 overflow-x-auto pb-2 mt-3 no-scrollbar">
//                                         {availableDates.map((d) => (
//                                             <button
//                                                 key={d.date}
//                                                 onClick={() => {
//                                                     setActiveDate(d.date);
//                                                     setStartTime("");
//                                                     setBookingDate("");
//                                                 }}
//                                                 className={`flex-shrink-0 px-5 py-3 rounded-xl border-2 text-[10px] font-bold uppercase tracking-wider transition-all ${activeDate === d.date ? "border-[#C8A951] bg-[#C8A951] text-white" : "border-transparent bg-[#F7F3EE] text-[#1C1C1C] hover:border-[#C8A951]/20"}`}
//                                             >
//                                                 {d.label}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Time Selection */}
//                             <div>
//                                 <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-xl text-[#1C1C1C] mb-1 flex items-center gap-2">
//                                     <Clock size={18} className="text-[#C8A951]" />
//                                     Available Times {(timingsLoading || slotsLoading) && <Loader2 className="w-3 h-3 text-[#C8A951] animate-spin inline ml-2" />}
//                                 </h3>
//                                 {!selectedStaff ? (
//                                     <p className="text-sm text-[#9e9287] mt-3">Please select a stylist to view availability.</p>
//                                 ) : slotsLoading ? (
//                                     <div className="flex items-center gap-3 py-4">
//                                         <Loader2 className="w-5 h-5 text-[#C8A951] animate-spin" />
//                                         <span className="text-[#9e9287] text-sm">Loading available slots...</span>
//                                     </div>
//                                 ) : slotsError ? (
//                                     <p className="text-sm text-red-500 mt-3">{slotsError}</p>
//                                 ) : !isDateValid ? (
//                                     <p className="text-sm text-red-500 mt-3">The salon is closed on this day.</p>
//                                 ) : availableTimeSlots.length === 0 ? (
//                                     <p className="text-sm text-[#9e9287] mt-3">No time slots available for this date.</p>
//                                 ) : (
//                                     <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
//                                         {availableTimeSlots.map((slot) => {
//                                             const isSelected = startTime === slot.time && bookingDate === activeDate;
                                            
//                                             // Check if slot is in the past for today
//                                             const now = new Date();
//                                             const isToday = activeDate === todayStr;
//                                             let isPast = false;
//                                             if (isToday) {
//                                                 const [slotH, slotM] = slot.time.split(':').map(Number);
//                                                 const currentH = now.getHours();
//                                                 const currentM = now.getMinutes();
//                                                 if (slotH < currentH || (slotH === currentH && slotM <= currentM)) {
//                                                     isPast = true;
//                                                 }
//                                             }

//                                             const isAvailable = slot.status === "AVAILABLE" && !isPast;

//                                             // Format for display (e.g. 09:00 AM)
//                                             const [h, m] = slot.time.split(':');
//                                             const hours = parseInt(h, 10);
//                                             const ampm = hours >= 12 ? 'PM' : 'AM';
//                                             const displayHours = hours % 12 || 12;
//                                             const displayTime = `${displayHours}:${m.padStart(2, '0')} ${ampm}`;

//                                             return (
//                                                 <button
//                                                     key={slot.id}
//                                                     disabled={!isAvailable}
//                                                     onClick={() => {
//                                                         setStartTime(slot.time);
//                                                         setBookingDate(activeDate);
//                                                     }}
//                                                     className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${isSelected
//                                                         ? "border-[#C8A951] bg-[#C8A951] text-white"
//                                                         : isAvailable
//                                                             ? "border-transparent bg-[#F7F3EE] text-[#1C1C1C] hover:border-[#C8A951]/40"
//                                                             : "border-transparent bg-[#F7F3EE]/50 text-[#9e9287] cursor-not-allowed line-through"
//                                                         }`}
//                                                 >
//                                                     {displayTime}
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* ─── STEP 3: Review & Confirm ────────────────── */}
//                     {step === 3 && (
//                         <div className="space-y-6">
//                             <div>
//                                 <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-1">
//                                     Review Booking
//                                 </h3>
//                                 <p className="text-[#9e9287] text-sm">Please confirm your appointment details</p>
//                             </div>

//                             {/* Summary Card */}
//                             <div className="bg-[#F7F3EE] rounded-2xl p-6 space-y-5">
//                                 {/* Services */}
//                                 <div>
//                                     <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-2">
//                                         Services
//                                     </span>
//                                     {selectedServices.map((s) => (
//                                         <div key={s.id} className="flex items-center justify-between py-2">
//                                             <div className="flex items-center gap-2">
//                                                 <Scissors size={12} className="text-[#C8A951]" />
//                                                 <span className="text-sm text-[#1C1C1C] font-medium">{s.name}</span>
//                                                 {s.durationMinutes && (
//                                                     <span className="text-xs text-[#9e9287]">({s.durationMinutes} min)</span>
//                                                 )}
//                                             </div>
//                                             <span className="text-sm font-bold text-[#1C1C1C]">₹{s.effectivePrice || s.price}</span>
//                                         </div>
//                                     ))}
//                                     <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#C8A951]/10">
//                                         <span className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">Total</span>
//                                         <span className="font-[Cormorant_Garamond] text-2xl font-bold text-[#C8A951]">₹{totals.total}</span>
//                                     </div>
//                                     {totals.duration > 0 && (
//                                         <span className="text-[10px] text-[#9e9287] font-medium block mt-1 text-right">
//                                             Est. Duration: {totals.duration} min
//                                         </span>
//                                     )}
//                                 </div>

//                                 {/* Stylist */}
//                                 <div className="flex items-center gap-3">
//                                     <User size={14} className="text-[#C8A951]" />
//                                     <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e9287] font-bold">Stylist:</span>
//                                     <span className="text-sm text-[#1C1C1C] font-semibold">
//                                         {selectedStaff ? (selectedStaff.userFullName || selectedStaff.fullName) : "Any Available"}
//                                     </span>
//                                 </div>

//                                 {/* Date & Time */}
//                                 <div className="flex items-center gap-6 flex-wrap">
//                                     <div className="flex items-center gap-3">
//                                         <Calendar size={14} className="text-[#C8A951]" />
//                                         <span className="text-sm text-[#1C1C1C] font-semibold">
//                                             {bookingDate ? new Date(bookingDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "—"}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Clock size={14} className="text-[#C8A951]" />
//                                         <span className="text-sm text-[#1C1C1C] font-semibold">{startTime || "—"}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Payment Method */}
//                             <div>
//                                 <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-3">
//                                     Payment Method
//                                 </span>
//                                 <div className="flex gap-3 flex-wrap">
//                                     {PAYMENT_METHODS.map((pm) => (
//                                         <button
//                                             key={pm.value}
//                                             onClick={() => setPaymentMethod(pm.value)}
//                                             className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${paymentMethod === pm.value ? "border-[#C8A951] bg-[#C8A951]/5 text-[#1C1C1C]" : "border-transparent bg-[#F7F3EE] text-[#7a7065] hover:border-[#C8A951]/20"}`}
//                                         >
//                                             <span>{pm.icon}</span>
//                                             {pm.label}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Customer Notes */}
//                             <div>
//                                 <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-3 flex items-center gap-2">
//                                     <MessageSquare size={12} /> Notes (Optional)
//                                 </span>
//                                 <textarea
//                                     value={customerNotes}
//                                     onChange={(e) => setCustomerNotes(e.target.value)}
//                                     placeholder="Any special requests or notes..."
//                                     rows={3}
//                                     className="w-full p-4 rounded-xl bg-[#F7F3EE] border-2 border-transparent focus:border-[#C8A951] focus:outline-none text-[#1C1C1C] text-sm resize-none transition-all placeholder:text-[#9e9287]/50"
//                                 />
//                             </div>

//                             {/* Error */}
//                             {submitError && (
//                                 <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
//                                     <AlertCircle size={16} className="text-primary shrink-0" />
//                                     <p className="text-primary text-sm">{submitError}</p>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <div className="px-8 py-5 bg-white border-t border-[#C8A951]/10 flex items-center justify-between shrink-0">
//                     {/* Total Pill */}
//                     {selectedServices.length > 0 && (
//                         <div className="flex items-center gap-3">
//                             <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e9287] font-bold">
//                                 {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"}
//                             </span>
//                             <span className="font-[Cormorant_Garamond] text-2xl font-bold text-[#1C1C1C]">
//                                 ₹{totals.total}
//                             </span>
//                         </div>
//                     )}
//                     {selectedServices.length === 0 && <span />}

//                     {/* Navigation Buttons */}
//                     <div className="flex items-center gap-3">
//                         {step > 1 && (
//                             <button
//                                 onClick={() => setStep((s) => s - 1)}
//                                 className="px-6 py-3 rounded-xl border border-[#C8A951]/20 text-[#1C1C1C] text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#F7F3EE] transition-all"
//                             >
//                                 Back
//                             </button>
//                         )}

//                         {step < 3 ? (
//                             <button
//                                 onClick={() => setStep((s) => s + 1)}
//                                 disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}
//                                 className="px-8 py-3 rounded-xl bg-[#1C1C1C] text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#C8A951] hover:text-[#1C1C1C] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#1C1C1C] disabled:hover:text-white"
//                             >
//                                 Continue
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={submitting || !canSubmit}
//                                 className="px-8 py-3 rounded-xl bg-[#C8A951] text-[#1C1C1C] text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                             >
//                                 {submitting ? (
//                                     <>
//                                         <Loader2 size={14} className="animate-spin" />
//                                         Booking...
//                                     </>
//                                 ) : (
//                                     "Confirm Booking"
//                                 )}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Slide up animation */}
//             <style jsx>{`
//                 @keyframes slideUp {
//                     from { transform: translateY(30px); opacity: 0; }
//                     to { transform: translateY(0); opacity: 1; }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default BookAppointmentModal;

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Calendar, Clock, User, Scissors, CreditCard, MessageSquare, CheckCircle, AlertCircle, Loader2, ChevronRight, Sparkles } from "lucide-react";
import { useCreateBooking } from "../../profile/hooks/useCreateBooking";
import { useSalonServices } from "../hooks/useSalonServices";
import { useSalonStaff } from "../hooks/useSalonStaff";
import { useSalonTimings } from "../hooks/useSalonTimings";
import { useStaffSlots } from "../hooks/useStaffSlots";

const PAYMENT_METHODS = [
    { value: "CASH", label: "CASH", icon: "💶" },
];

const BookAppointmentModal = ({ isOpen, onClose, salonId, salonName, preSelectedService }) => {
    const { submitBooking, loading: submitting, error: submitError, success, bookingResult, reset } = useCreateBooking();
    const { services, loading: servicesLoading } = useSalonServices({ id: salonId });
    const [selectedServices, setSelectedServices] = useState([]);
    const { staff, loading: staffLoading } = useSalonStaff({
        id: salonId,
        serviceId: selectedServices.length > 0 ? selectedServices[0].id : null
    });
    const { timings, loading: timingsLoading } = useSalonTimings({ id: salonId });

    // Date calculations for 4-day window (using local time)
    const todayStr = useMemo(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, []);

    const endDateStr = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 3);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, []);

    // Form state
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [customerNotes, setCustomerNotes] = useState("");
    const [step, setStep] = useState(1); // 1: Services, 2: Staff & Time, 3: Review
    const [activeDate, setActiveDate] = useState(todayStr);

    // Slots fetching
    const { slots: staffSlots, loading: slotsLoading, error: slotsError } = useStaffSlots({
        staffId: selectedStaff?.id,
        startDate: todayStr,
        endDate: endDateStr
    });

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            if (preSelectedService) {
                setSelectedServices([preSelectedService]);
                setStep(2); // Skip to schedule step
            } else {
                setSelectedServices([]);
                setStep(1);
            }
            setSelectedStaff(null);
            setBookingDate("");
            setStartTime("");
            setPaymentMethod("UPI");
            setCustomerNotes("");
            setActiveDate(todayStr);
            reset();
        }
    }, [isOpen, reset, preSelectedService, todayStr]);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Reset active date when staff changes
    useEffect(() => {
        if (selectedStaff) {
            setActiveDate(todayStr);
        }
    }, [selectedStaff, todayStr]);

    // Calculate totals
    const totals = useMemo(() => {
        const total = selectedServices.reduce((sum, s) => sum + (s.effectivePrice || s.price || 0), 0);
        const duration = selectedServices.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
        return { total, duration };
    }, [selectedServices]);

    const toggleService = (service) => {
        setSelectedServices((prev) => {
            const exists = prev.find((s) => s.id === service.id);
            if (exists) return prev.filter((s) => s.id !== service.id);
            return [...prev, service];
        });
    };

    const canProceedStep1 = selectedServices.length > 0;

    // --- Timings Validation ---
    const getSelectedDayLabel = (dateStr) => {
        if (!dateStr) return null;
        const d = new Date(dateStr + "T00:00:00");
        return d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
    };

    const isDateValid = useMemo(() => {
        if (!activeDate || !timings || timings.length === 0) return true;
        const dayLabel = getSelectedDayLabel(activeDate);
        const dayData = timings.find((t) => t.dayOfWeek === dayLabel);
        return dayData ? !dayData.isClosed : true;
    }, [activeDate, timings]);

    const availableTimeSlots = useMemo(() => {
        if (!selectedStaff || !staffSlots) return [];
        // Group slots by date
        const grouped = staffSlots.reduce((acc, slot) => {
            if (!acc[slot.date]) acc[slot.date] = [];
            acc[slot.date].push({
                time: slot.startTime.substring(0, 5),
                status: slot.status,
                id: slot.id
            });
            return acc;
        }, {});
        return grouped[activeDate] || [];
    }, [selectedStaff, staffSlots, activeDate]);

    const availableDates = useMemo(() => {
        const dates = [];
        for (let i = 0; i < 4; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const dateStr = d.toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
            dates.push({
                date: dateStr,
                label: i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
            });
        }
        return dates;
    }, []);

    const canProceedStep2 = selectedStaff && bookingDate && startTime;
    const canSubmit = canProceedStep1 && canProceedStep2;

    const handleSubmit = async () => {
        if (!canSubmit) return;

        const bookingData = {
            businessId: Number(salonId),
            staffId: selectedStaff ? Number(selectedStaff.id) : null,
            bookingDate,
            startTime,
            serviceIds: selectedServices.map((s) => s.id),
            customerNotes: customerNotes.trim() || null,
            paymentMethod,
        };

        // Remove null staffId if not selected
        if (!bookingData.staffId) delete bookingData.staffId;

        try {
            await submitBooking(bookingData);
        } catch {
            // error handled by hook
        }
    };

    if (!isOpen) return null;

    // ─── Success Screen ──────────────────────────────────────────────────
    if (success) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                <div className="relative bg-white rounded-3xl max-w-md w-full p-10 text-center shadow-2xl animate-[slideUp_0.4s_ease] border border-[#E0E0E0]">
                    <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-[#10b981]" />
                    </div>
                    <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-3xl font-bold text-[#1F355E] mb-3">
                        Booking Confirmed!
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                        Your appointment has been successfully booked.
                    </p>
                    {bookingResult?.bookingNumber && (
                        <div className="bg-[#F8FAFC] rounded-2xl p-4 my-6 border border-[#E0E0E0]">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#628EB8] font-bold block mb-1">Booking Number</span>
                            <span className="text-xl font-bold text-[#1F355E] tracking-wider">{bookingResult.bookingNumber}</span>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-xl bg-[#1F355E] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#628EB8] shadow-md"
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-[slideUp_0.3s_ease]">
                {/* Header */}
                <div className="bg-[#1F355E] px-8 py-6 flex items-center justify-between shrink-0">
                    <div>
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A566] font-bold block mb-1">
                            New Appointment
                        </span>
                        <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#C5A566] font-semibold">
                            {salonName || "Book Your Visit"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all border border-white/10"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Step Indicators */}
                <div className="px-8 py-4 bg-white border-b border-[#E0E0E0] flex items-center gap-3 shrink-0">
                    {[
                        { num: 1, label: "Services" },
                        { num: 2, label: "Schedule" },
                        { num: 3, label: "Review" },
                    ].map((s, i) => (
                        <React.Fragment key={s.num}>
                            <button
                                onClick={() => {
                                    if (s.num < step) setStep(s.num);
                                    if (s.num === 2 && canProceedStep1) setStep(2);
                                    if (s.num === 3 && canProceedStep1 && canProceedStep2) setStep(3);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${step === s.num ? "bg-[#628EB8] text-white" : step > s.num ? "bg-[#1F355E] text-white" : "bg-white text-[#9babb8] border border-[#E0E0E0]"}`}
                            >
                                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px]">
                                    {step > s.num ? "✓" : s.num}
                                </span>
                                {s.label}
                            </button>
                            {i < 2 && <ChevronRight size={14} className="text-[#628EB8]/30" />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {/* ─── STEP 1: Select Services ───────────────────── */}
                    {step === 1 && (
                        <div>
                            <div className="mb-6">
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1F355E] mb-1">
                                    Select Services
                                </h3>
                                <p className="text-[#628EB8] text-sm">Choose one or more services for your appointment</p>
                            </div>

                            {servicesLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 text-[#1F355E] animate-spin" />
                                    <span className="ml-3 text-[#628EB8] text-sm">Loading services...</span>
                                </div>
                            ) : !services || services.length === 0 ? (
                                <div className="text-center py-12">
                                    <Scissors className="w-10 h-10 text-[#628EB8]/30 mx-auto mb-3" />
                                    <p className="text-[#628EB8] text-sm">No services available at this time.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {services.map((service) => {
                                        const isSelected = selectedServices.some((s) => s.id === service.id);
                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => toggleService(service)}
                                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${isSelected ? "border-[#628EB8] bg-[#628EB8]/5 shadow-sm" : "border-[#E0E0E0] bg-white hover:border-[#628EB8]/30 hover:bg-[#F8FAFC]"}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isSelected ? "bg-[#628EB8] text-white" : "bg-[#F8FAFC] text-[#1F355E] border border-[#E0E0E0]"}`}>
                                                            {isSelected ? <CheckCircle size={18} /> : <Scissors size={18} />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-[#1F355E] text-sm">{service.name}</h4>
                                                            {service.durationMinutes && (
                                                                <span className="text-[#628EB8] text-xs flex items-center gap-1 mt-0.5">
                                                                    <Clock size={10} /> {service.durationMinutes} min
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-[Cormorant_Garamond] text-xl font-bold text-[#1F355E]">
                                                            ₹{service.effectivePrice || service.price}
                                                        </span>
                                                        {service.discountedPrice && service.discountedPrice < service.price && (
                                                            <span className="text-xs text-gray-400 line-through ml-2">₹{service.price}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── STEP 2: Staff, Date & Time ───────────────── */}
                    {step === 2 && (
                        <div className="space-y-8">
                            {/* Staff Selection (Optional) */}
                            <div>
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1F355E] mb-1">
                                    Choose a Stylist
                                </h3>
                                <p className="text-[#628EB8] text-sm mb-4">Optional — select your preferred stylist</p>

                                {staffLoading ? (
                                    <div className="flex items-center gap-3 py-4">
                                        <Loader2 className="w-5 h-5 text-[#1F355E] animate-spin" />
                                        <span className="text-[#628EB8] text-sm">Loading staff...</span>
                                    </div>
                                ) : !staff || staff.length === 0 ? (
                                    <p className="text-[#628EB8] text-sm py-4">No staff listed — one will be assigned.</p>
                                ) : (
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {/* "Any" option */}
                                        <button
                                            onClick={() => setSelectedStaff(null)}
                                            className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[100px] ${!selectedStaff ? "border-[#628EB8] bg-[#628EB8]/5 shadow-sm" : "border-[#E0E0E0] bg-white hover:border-[#628EB8]/20"}`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${!selectedStaff ? "bg-[#628EB8] text-white" : "bg-[#F8FAFC] text-[#1F355E] border border-[#E0E0E0]"}`}>
                                                <Sparkles size={18} />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F355E]">Any</span>
                                        </button>

                                        {staff.map((member) => {
                                            const isSelected = selectedStaff?.id === member.id;
                                            return (
                                                <button
                                                    key={member.id}
                                                    onClick={() => setSelectedStaff(member)}
                                                    className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[100px] ${isSelected ? "border-[#628EB8] bg-[#628EB8]/5 shadow-sm" : "border-[#E0E0E0] bg-white hover:border-[#628EB8]/20"}`}
                                                >
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${isSelected ? "ring-2 ring-[#628EB8] ring-offset-2" : ""}`}>
                                                        {member.profileImageUrl ? (
                                                            <img src={member.profileImageUrl} alt={member.userFullName || member.fullName} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#F8FAFC] flex items-center justify-center text-[#1F355E] font-bold text-sm">
                                                                {(member.userFullName || member.fullName)?.substring(0, 2).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-[#1F355E] text-center leading-tight max-w-[80px] truncate">
                                                        {member.userFullName || member.fullName}
                                                    </span>
                                                    {member.designation && (
                                                        <span className="text-[8px] text-[#628EB8] truncate max-w-[80px]">{member.designation}</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Date Selection Pills */}
                            {selectedStaff && (
                                <div>
                                    <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-xl text-[#1F355E] mb-1 flex items-center gap-2">
                                        <Calendar size={18} className="text-[#628EB8]" />
                                        Select Date
                                    </h3>
                                    <div className="flex gap-2 overflow-x-auto pb-2 mt-3 no-scrollbar">
                                        {availableDates.map((d) => (
                                            <button
                                                key={d.date}
                                                onClick={() => {
                                                    setActiveDate(d.date);
                                                    setStartTime("");
                                                    setBookingDate("");
                                                }}
                                                className={`flex-shrink-0 px-5 py-3 rounded-xl border-2 text-[10px] font-bold uppercase tracking-wider transition-all ${activeDate === d.date ? "border-[#628EB8] bg-[#628EB8] text-white shadow-md" : "border-[#E0E0E0] bg-white text-[#1F355E] hover:border-[#628EB8]/20"}`}
                                            >
                                                {d.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Time Selection */}
                            <div>
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-xl text-[#1F355E] mb-1 flex items-center gap-2">
                                    <Clock size={18} className="text-[#628EB8]" />
                                    Available Times {(timingsLoading || slotsLoading) && <Loader2 className="w-3 h-3 text-[#1F355E] animate-spin inline ml-2" />}
                                </h3>
                                {!selectedStaff ? (
                                    <p className="text-sm text-[#628EB8] mt-3">Please select a stylist to view availability.</p>
                                ) : slotsLoading ? (
                                    <div className="flex items-center gap-3 py-4">
                                        <Loader2 className="w-5 h-5 text-[#1F355E] animate-spin" />
                                        <span className="text-[#628EB8] text-sm">Loading available slots...</span>
                                    </div>
                                ) : slotsError ? (
                                    <p className="text-sm text-red-500 mt-3">{slotsError}</p>
                                ) : !isDateValid ? (
                                    <p className="text-sm text-red-500 mt-3">The salon is closed on this day.</p>
                                ) : availableTimeSlots.length === 0 ? (
                                    <p className="text-sm text-[#628EB8] mt-3">No time slots available for this date.</p>
                                ) : (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                                        {availableTimeSlots.map((slot) => {
                                            const isSelected = startTime === slot.time && bookingDate === activeDate;
                                            const isAvailable = slot.status === "AVAILABLE";

                                            // Format for display (e.g. 09:00 AM)
                                            const [h, m] = slot.time.split(':');
                                            const hours = parseInt(h, 10);
                                            const ampm = hours >= 12 ? 'PM' : 'AM';
                                            const displayHours = hours % 12 || 12;
                                            const displayTime = `${displayHours}:${m.padStart(2, '0')} ${ampm}`;

                                            return (
                                                <button
                                                    key={slot.id}
                                                    disabled={!isAvailable}
                                                    onClick={() => {
                                                        setStartTime(slot.time);
                                                        setBookingDate(activeDate);
                                                    }}
                                                    className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${isSelected
                                                        ? "border-[#628EB8] bg-[#628EB8] text-white shadow-md"
                                                        : isAvailable
                                                            ? "border-[#E0E0E0] bg-white text-[#1F355E] hover:border-[#628EB8]/40"
                                                            : "border-[#E0E0E0] bg-gray-50 text-gray-400 cursor-not-allowed line-through"
                                                        }`}
                                                >
                                                    {displayTime}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 3: Review & Confirm ────────────────── */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1F355E] mb-1">
                                    Final Review
                                </h3>
                                <p className="text-[#628EB8] text-sm">One last look before we confirm your appointment.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Side: Details & Notes */}
                                <div className="space-y-6">
                                    {/* Appointment Details Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-[#F8FAFC] border border-[#E0E0E0] p-4 rounded-2xl">
                                            <span className="text-[9px] uppercase tracking-widest text-[#628EB8] font-bold block mb-2 flex items-center gap-1.5">
                                                <Calendar size={10} /> Date
                                            </span>
                                            <p className="text-sm text-[#1F355E] font-semibold">
                                                {bookingDate ? new Date(bookingDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                                            </p>
                                        </div>
                                        <div className="bg-[#F8FAFC] border border-[#E0E0E0] p-4 rounded-2xl">
                                            <span className="text-[9px] uppercase tracking-widest text-[#628EB8] font-bold block mb-2 flex items-center gap-1.5">
                                                <Clock size={10} /> Time
                                            </span>
                                            <p className="text-sm text-[#1F355E] font-semibold">{startTime || "—"}</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#F8FAFC] border border-[#E0E0E0] p-4 rounded-2xl">
                                        <span className="text-[9px] uppercase tracking-widest text-[#628EB8] font-bold block mb-2 flex items-center gap-1.5">
                                            <User size={10} /> Specialist
                                        </span>
                                        <div className="flex items-center gap-3">
                                            {selectedStaff?.profileImageUrl ? (
                                                <img src={selectedStaff.profileImageUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-[#628EB8]/20" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-[#1F355E] text-white flex items-center justify-center text-[10px] font-bold">
                                                    {selectedStaff ? (selectedStaff.userFullName || selectedStaff.fullName)?.substring(0, 2).toUpperCase() : "AA"}
                                                </div>
                                            )}
                                            <p className="text-sm text-[#1F355E] font-semibold">
                                                {selectedStaff ? (selectedStaff.userFullName || selectedStaff.fullName) : "Any Available Stylist"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Payment Selection */}
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#628EB8] font-bold block mb-3">
                                            Payment Method
                                        </span>
                                        <div className="flex gap-3">
                                            {PAYMENT_METHODS.map((pm) => (
                                                <button
                                                    key={pm.value}
                                                    onClick={() => setPaymentMethod(pm.value)}
                                                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === pm.value ? "border-[#1F355E] bg-[#1F355E] text-white shadow-md" : "border-[#E0E0E0] bg-white text-[#1F355E] hover:border-[#628EB8]/30"}`}
                                                >
                                                    <span className="text-xl">{pm.icon}</span>
                                                    <span className="text-xs font-bold uppercase tracking-wider">{pm.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Customer Notes */}
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#628EB8] font-bold block mb-3 flex items-center gap-2">
                                            <MessageSquare size={12} /> Notes for the Salon
                                        </span>
                                        <textarea
                                            value={customerNotes}
                                            onChange={(e) => setCustomerNotes(e.target.value)}
                                            placeholder="eg. allergic to certain products, preferred hair wash temperature..."
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E0E0E0] focus:border-[#628EB8] focus:ring-4 focus:ring-[#628EB8]/5 focus:outline-none text-[#1F355E] text-sm resize-none transition-all placeholder:text-gray-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Service Receipt Summary */}
                                <div className="bg-white border-2 border-[#1F355E]/5 rounded-3xl p-6 relative overflow-hidden shadow-xl flex flex-col">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#1F355E]" />

                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="font-bold text-[#1F355E] text-sm uppercase tracking-widest">Order Summary</h4>
                                        <Sparkles size={16} className="text-[#628EB8]" />
                                    </div>

                                    <div className="flex-1 space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedServices.map((s) => (
                                            <div key={s.id} className="flex items-start justify-between group">
                                                <div className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E0E0E0] flex items-center justify-center shrink-0 group-hover:bg-[#628EB8]/10 transition-colors">
                                                        <Scissors size={14} className="text-[#628EB8]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-[#1F355E] font-semibold leading-tight">{s.name}</p>
                                                        <span className="text-[10px] text-[#628EB8] font-medium">{s.durationMinutes} min</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-bold text-[#1F355E]">₹{s.effectivePrice || s.price}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t-2 border-dashed border-[#E0E0E0]">
                                        <div className="flex items-center justify-between mb-2 text-[#628EB8]">
                                            <span className="text-xs font-semibold">Subtotal</span>
                                            <span className="text-sm font-bold">₹{totals.total}</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-4 text-[#1F355E]">
                                            <span className="text-sm font-black uppercase tracking-widest">Total Amount</span>
                                            <span className="text-2xl font-black font-[Cormorant_Garamond]">₹{totals.total}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
                                            <CheckCircle size={14} className="text-green-600" />
                                            <p className="text-[10px] text-green-700 font-semibold uppercase tracking-wider">Secure Booking Guaranteed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {submitError && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 animate-shake">
                                    <AlertCircle size={16} className="text-red-500 shrink-0" />
                                    <p className="text-red-600 text-xs font-semibold">{submitError}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-white border-t border-[#E0E0E0] flex items-center justify-between shrink-0">
                    {/* Total Pill */}
                    {selectedServices.length > 0 && (
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#628EB8] font-bold">
                                {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"}
                            </span>
                            <span className="font-[Cormorant_Garamond] text-2xl font-bold text-[#1F355E]">
                                ₹{totals.total}
                            </span>
                        </div>
                    )}
                    {selectedServices.length === 0 && <span />}

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        {step > 1 && (
                            <button
                                onClick={() => setStep((s) => s - 1)}
                                className="px-6 py-3 rounded-xl border border-[#E0E0E0] text-[#1F355E] text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-gray-50 transition-all"
                            >
                                Back
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                onClick={() => setStep((s) => s + 1)}
                                disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}
                                className="px-8 py-3 rounded-xl bg-[#1F355E] text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#628EB8] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !canSubmit}
                                className="px-8 py-3 rounded-xl bg-[#1F355E] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        Booking...
                                    </>
                                ) : (
                                    "Confirm Booking"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Slide up animation */}
            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default BookAppointmentModal;
