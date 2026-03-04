"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Calendar, Clock, User, Scissors, CreditCard, MessageSquare, CheckCircle, AlertCircle, Loader2, ChevronRight, Sparkles } from "lucide-react";
import { useCreateBooking } from "../../profile/hooks/useCreateBooking";
import { useSalonServices } from "../hooks/useSalonServices";
import { useSalonStaff } from "../hooks/useSalonStaff";
import { useSalonTimings } from "../hooks/useSalonTimings";

const PAYMENT_METHODS = [
    { value: "Cash", label: "CASH", icon: "💶" },
];

const BookAppointmentModal = ({ isOpen, onClose, salonId, salonName, preSelectedService }) => {
    const { submitBooking, loading: submitting, error: submitError, success, bookingResult, reset } = useCreateBooking();
    const { services, loading: servicesLoading } = useSalonServices({ id: salonId });
    const { staff, loading: staffLoading } = useSalonStaff({ id: salonId });
    const { timings, loading: timingsLoading } = useSalonTimings({ id: salonId });

    // Form state
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [customerNotes, setCustomerNotes] = useState("");
    const [step, setStep] = useState(1); // 1: Services, 2: Staff & Time, 3: Review

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
            reset();
        }
    }, [isOpen, reset, preSelectedService]);

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

    // Calculate totals
    const totals = useMemo(() => {
        const total = selectedServices.reduce((sum, s) => sum + (s.effectivePrice || s.price || 0), 0);
        const duration = selectedServices.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
        return { total, duration };
    }, [selectedServices]);

    // Min date = today
    const minDate = new Date().toISOString().split("T")[0];

    const toggleService = (service) => {
        setSelectedServices((prev) => {
            const exists = prev.find((s) => s.id === service.id);
            if (exists) return prev.filter((s) => s.id !== service.id);
            return [...prev, service];
        });
    };

    const canProceedStep1 = selectedServices.length > 0;

    // --- Timings Validation ---
    const getSelectedDayLabel = () => {
        if (!bookingDate) return null;
        const d = new Date(bookingDate + "T00:00:00");
        return d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
    };

    const isDateValid = useMemo(() => {
        if (!bookingDate || !timings || timings.length === 0) return true; // optimistic if no timings
        const dayLabel = getSelectedDayLabel();
        const dayData = timings.find((t) => t.dayOfWeek === dayLabel);
        return dayData ? !dayData.isClosed : true;
    }, [bookingDate, timings]);

    const isTimeValid = useMemo(() => {
        if (!bookingDate || !startTime || !timings || timings.length === 0) return true;
        const dayLabel = getSelectedDayLabel();
        const dayData = timings.find((t) => t.dayOfWeek === dayLabel);

        if (!dayData || dayData.isClosed) return false;
        if (!dayData.openTime || !dayData.closeTime) return true;

        // Simple string comparison for time HH:mm
        return startTime >= dayData.openTime && startTime <= dayData.closeTime;
    }, [bookingDate, startTime, timings]);

    const availableTimeSlots = useMemo(() => {
        if (!bookingDate || !timings || timings.length === 0) return [];
        const dayLabel = getSelectedDayLabel();
        const dayData = timings.find((t) => t.dayOfWeek === dayLabel);

        if (!dayData || dayData.isClosed || !dayData.openTime || !dayData.closeTime) return [];

        const slots = [];
        const [openH, openM] = dayData.openTime.split(':').map(Number);
        const [closeH, closeM] = dayData.closeTime.split(':').map(Number);

        let current = new Date();
        current.setHours(openH, openM, 0, 0);

        const end = new Date();
        end.setHours(closeH, closeM, 0, 0);

        while (current <= end) {
            const h = current.getHours().toString().padStart(2, '0');
            const m = current.getMinutes().toString().padStart(2, '0');
            slots.push(`${h}:${m}`);
            current.setMinutes(current.getMinutes() + 30); // 30 min interval
        }
        return slots;
    }, [bookingDate, timings]);

    const canProceedStep2 = bookingDate && startTime && isDateValid && isTimeValid;
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
                <div className="relative bg-white rounded-3xl max-w-md w-full p-10 text-center shadow-2xl animate-[slideUp_0.4s_ease]">
                    <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-[#10b981]" />
                    </div>
                    <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-3xl font-bold text-[#1C1C1C] mb-3">
                        Booking Confirmed!
                    </h3>
                    <p className="text-[#7a7065] text-sm mb-2">
                        Your appointment has been successfully booked.
                    </p>
                    {bookingResult?.bookingNumber && (
                        <div className="bg-[#F7F3EE] rounded-2xl p-4 my-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-1">Booking Number</span>
                            <span className="text-xl font-bold text-[#1C1C1C] tracking-wider">{bookingResult.bookingNumber}</span>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-xl bg-[#1C1C1C] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-[#C8A951] hover:text-[#1C1C1C]"
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
                <div className="bg-[#1C1C1C] px-8 py-6 flex items-center justify-between shrink-0">
                    <div>
                        <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-bold block mb-1">
                            New Appointment
                        </span>
                        <h2 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-white font-semibold">
                            {salonName || "Book Your Visit"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Step Indicators */}
                <div className="px-8 py-4 bg-[#F7F3EE] border-b border-[#C8A951]/10 flex items-center gap-3 shrink-0">
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
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${step === s.num ? "bg-[#C8A951] text-[#1C1C1C]" : step > s.num ? "bg-[#1C1C1C] text-white" : "bg-white text-[#9e9287] border border-[#C8A951]/10"}`}
                            >
                                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px]">
                                    {step > s.num ? "✓" : s.num}
                                </span>
                                {s.label}
                            </button>
                            {i < 2 && <ChevronRight size={14} className="text-[#C8A951]/30" />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {/* ─── STEP 1: Select Services ───────────────────── */}
                    {step === 1 && (
                        <div>
                            <div className="mb-6">
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-1">
                                    Select Services
                                </h3>
                                <p className="text-[#9e9287] text-sm">Choose one or more services for your appointment</p>
                            </div>

                            {servicesLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 text-[#C8A951] animate-spin" />
                                    <span className="ml-3 text-[#9e9287] text-sm">Loading services...</span>
                                </div>
                            ) : !services || services.length === 0 ? (
                                <div className="text-center py-12">
                                    <Scissors className="w-10 h-10 text-[#C8A951]/30 mx-auto mb-3" />
                                    <p className="text-[#9e9287] text-sm">No services available at this time.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {services.map((service) => {
                                        const isSelected = selectedServices.some((s) => s.id === service.id);
                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => toggleService(service)}
                                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${isSelected ? "border-[#C8A951] bg-[#C8A951]/5 shadow-[0_0_0_1px_rgba(200,169,81,0.2)]" : "border-transparent bg-[#F7F3EE] hover:border-[#C8A951]/30 hover:bg-[#F7F3EE]/80"}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isSelected ? "bg-[#C8A951] text-white" : "bg-white text-[#C8A951] border border-[#C8A951]/10"}`}>
                                                            {isSelected ? <CheckCircle size={18} /> : <Scissors size={18} />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-[#1C1C1C] text-sm">{service.name}</h4>
                                                            {service.durationMinutes && (
                                                                <span className="text-[#9e9287] text-xs flex items-center gap-1 mt-0.5">
                                                                    <Clock size={10} /> {service.durationMinutes} min
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-[Cormorant_Garamond] text-xl font-bold text-[#1C1C1C]">
                                                            ₹{service.effectivePrice || service.price}
                                                        </span>
                                                        {service.discountedPrice && service.discountedPrice < service.price && (
                                                            <span className="text-xs text-[#9e9287] line-through ml-2">₹{service.price}</span>
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
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-1">
                                    Choose a Stylist
                                </h3>
                                <p className="text-[#9e9287] text-sm mb-4">Optional — select your preferred stylist</p>

                                {staffLoading ? (
                                    <div className="flex items-center gap-3 py-4">
                                        <Loader2 className="w-5 h-5 text-[#C8A951] animate-spin" />
                                        <span className="text-[#9e9287] text-sm">Loading staff...</span>
                                    </div>
                                ) : !staff || staff.length === 0 ? (
                                    <p className="text-[#9e9287] text-sm py-4">No staff listed — one will be assigned.</p>
                                ) : (
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {/* "Any" option */}
                                        <button
                                            onClick={() => setSelectedStaff(null)}
                                            className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[100px] ${!selectedStaff ? "border-[#C8A951] bg-[#C8A951]/5" : "border-transparent bg-[#F7F3EE] hover:border-[#C8A951]/20"}`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${!selectedStaff ? "bg-[#C8A951] text-white" : "bg-white text-[#C8A951] border border-[#C8A951]/10"}`}>
                                                <Sparkles size={18} />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C1C1C]">Any</span>
                                        </button>

                                        {staff.map((member) => {
                                            const isSelected = selectedStaff?.id === member.id;
                                            return (
                                                <button
                                                    key={member.id}
                                                    onClick={() => setSelectedStaff(member)}
                                                    className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-w-[100px] ${isSelected ? "border-[#C8A951] bg-[#C8A951]/5" : "border-transparent bg-[#F7F3EE] hover:border-[#C8A951]/20"}`}
                                                >
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${isSelected ? "ring-2 ring-[#C8A951] ring-offset-2" : ""}`}>
                                                        {member.profileImageUrl ? (
                                                            <img src={member.profileImageUrl} alt={member.userFullName || member.fullName} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#f5edce] flex items-center justify-center text-[#C8A951] font-bold text-sm">
                                                                {(member.userFullName || member.fullName)?.substring(0, 2).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-[#1C1C1C] text-center leading-tight max-w-[80px] truncate">
                                                        {member.userFullName || member.fullName}
                                                    </span>
                                                    {member.designation && (
                                                        <span className="text-[8px] text-[#9e9287] truncate max-w-[80px]">{member.designation}</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Date Selection */}
                            <div>
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-xl text-[#1C1C1C] mb-1 flex items-center gap-2">
                                    <Calendar size={18} className="text-[#C8A951]" />
                                    Select Date {timingsLoading && <Loader2 className="w-3 h-3 text-[#C8A951] animate-spin inline ml-2" />}
                                </h3>
                                <input
                                    type="date"
                                    value={bookingDate}
                                    min={minDate}
                                    onChange={(e) => {
                                        setBookingDate(e.target.value);
                                        setStartTime("");
                                    }}
                                    className={`w-full mt-3 p-4 rounded-xl border-2 focus:outline-none text-[#1C1C1C] font-medium transition-all text-sm ${bookingDate && !isDateValid ? "bg-red-50 border-red-200 focus:border-red-500" : "bg-[#F7F3EE] border-transparent focus:border-[#C8A951]"}`}
                                />
                                {bookingDate && !isDateValid && (
                                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        The salon is closed on this day. Please select another date.
                                    </p>
                                )}
                            </div>

                            {/* Time Selection */}
                            <div>
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-xl text-[#1C1C1C] mb-1 flex items-center gap-2">
                                    <Clock size={18} className="text-[#C8A951]" />
                                    Select Time
                                </h3>
                                {!bookingDate ? (
                                    <p className="text-sm text-[#9e9287] mt-3">Please select a date first to view available time slots.</p>
                                ) : !isDateValid ? (
                                    <p className="text-sm text-red-500 mt-3">The salon is closed on this day.</p>
                                ) : availableTimeSlots.length === 0 ? (
                                    <p className="text-sm text-[#9e9287] mt-3">No time slots available for this date.</p>
                                ) : (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                                        {availableTimeSlots.map((time) => {
                                            const isSelected = startTime === time;

                                            // Format for display (e.g. 09:00 AM)
                                            const [h, m] = time.split(':');
                                            const hours = parseInt(h, 10);
                                            const ampm = hours >= 12 ? 'PM' : 'AM';
                                            const displayHours = hours % 12 || 12;
                                            const displayTime = `${displayHours}:${m.padStart(2, '0')} ${ampm}`;

                                            return (
                                                <button
                                                    key={time}
                                                    onClick={() => setStartTime(time)}
                                                    className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${isSelected ? "border-[#C8A951] bg-[#C8A951] text-white" : "border-transparent bg-[#F7F3EE] text-[#1C1C1C] hover:border-[#C8A951]/40"}`}
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
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-[Cormorant_Garamond,Georgia,serif] text-2xl text-[#1C1C1C] mb-1">
                                    Review Booking
                                </h3>
                                <p className="text-[#9e9287] text-sm">Please confirm your appointment details</p>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-[#F7F3EE] rounded-2xl p-6 space-y-5">
                                {/* Services */}
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-2">
                                        Services
                                    </span>
                                    {selectedServices.map((s) => (
                                        <div key={s.id} className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-2">
                                                <Scissors size={12} className="text-[#C8A951]" />
                                                <span className="text-sm text-[#1C1C1C] font-medium">{s.name}</span>
                                                {s.durationMinutes && (
                                                    <span className="text-xs text-[#9e9287]">({s.durationMinutes} min)</span>
                                                )}
                                            </div>
                                            <span className="text-sm font-bold text-[#1C1C1C]">₹{s.effectivePrice || s.price}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#C8A951]/10">
                                        <span className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">Total</span>
                                        <span className="font-[Cormorant_Garamond] text-2xl font-bold text-[#C8A951]">₹{totals.total}</span>
                                    </div>
                                    {totals.duration > 0 && (
                                        <span className="text-[10px] text-[#9e9287] font-medium block mt-1 text-right">
                                            Est. Duration: {totals.duration} min
                                        </span>
                                    )}
                                </div>

                                {/* Stylist */}
                                <div className="flex items-center gap-3">
                                    <User size={14} className="text-[#C8A951]" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e9287] font-bold">Stylist:</span>
                                    <span className="text-sm text-[#1C1C1C] font-semibold">
                                        {selectedStaff ? (selectedStaff.userFullName || selectedStaff.fullName) : "Any Available"}
                                    </span>
                                </div>

                                {/* Date & Time */}
                                <div className="flex items-center gap-6 flex-wrap">
                                    <div className="flex items-center gap-3">
                                        <Calendar size={14} className="text-[#C8A951]" />
                                        <span className="text-sm text-[#1C1C1C] font-semibold">
                                            {bookingDate ? new Date(bookingDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock size={14} className="text-[#C8A951]" />
                                        <span className="text-sm text-[#1C1C1C] font-semibold">{startTime || "—"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-3">
                                    Payment Method
                                </span>
                                <div className="flex gap-3 flex-wrap">
                                    {PAYMENT_METHODS.map((pm) => (
                                        <button
                                            key={pm.value}
                                            onClick={() => setPaymentMethod(pm.value)}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${paymentMethod === pm.value ? "border-[#C8A951] bg-[#C8A951]/5 text-[#1C1C1C]" : "border-transparent bg-[#F7F3EE] text-[#7a7065] hover:border-[#C8A951]/20"}`}
                                        >
                                            <span>{pm.icon}</span>
                                            {pm.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Customer Notes */}
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#9e9287] font-bold block mb-3 flex items-center gap-2">
                                    <MessageSquare size={12} /> Notes (Optional)
                                </span>
                                <textarea
                                    value={customerNotes}
                                    onChange={(e) => setCustomerNotes(e.target.value)}
                                    placeholder="Any special requests or notes..."
                                    rows={3}
                                    className="w-full p-4 rounded-xl bg-[#F7F3EE] border-2 border-transparent focus:border-[#C8A951] focus:outline-none text-[#1C1C1C] text-sm resize-none transition-all placeholder:text-[#9e9287]/50"
                                />
                            </div>

                            {/* Error */}
                            {submitError && (
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                                    <AlertCircle size={16} className="text-primary shrink-0" />
                                    <p className="text-primary text-sm">{submitError}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-white border-t border-[#C8A951]/10 flex items-center justify-between shrink-0">
                    {/* Total Pill */}
                    {selectedServices.length > 0 && (
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e9287] font-bold">
                                {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"}
                            </span>
                            <span className="font-[Cormorant_Garamond] text-2xl font-bold text-[#1C1C1C]">
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
                                className="px-6 py-3 rounded-xl border border-[#C8A951]/20 text-[#1C1C1C] text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#F7F3EE] transition-all"
                            >
                                Back
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                onClick={() => setStep((s) => s + 1)}
                                disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}
                                className="px-8 py-3 rounded-xl bg-[#1C1C1C] text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#C8A951] hover:text-[#1C1C1C] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#1C1C1C] disabled:hover:text-white"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !canSubmit}
                                className="px-8 py-3 rounded-xl bg-[#C8A951] text-[#1C1C1C] text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
