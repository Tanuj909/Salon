import React from 'react';
import { Calendar, Clock, CreditCard, User, Scissors, ChevronRight, ChevronLeft, Loader2, AlertCircle, Receipt, MapPin } from 'lucide-react';
import { useBookingHistory } from '../hooks/useBookingHistory';

const BookingHistory = ({ businessId }) => {
    const { bookings, loading, error, pagination, nextPage, prevPage } = useBookingHistory(businessId);

    const getStatusStyle = (status) => {
        if (!status) return "bg-[#3c143205] text-[#3c143260] border-[#3c14320a]";
        switch (status.toUpperCase()) {
            case 'CONFIRMED':
            case 'PENDING':
                return "bg-[#7a286010] text-[#7a2860] border-[#7a286020]";
            case 'COMPLETED':
                return "bg-[#10b98110] text-[#10b981] border-[#10b98120]";
            case 'CANCELLED':
            case 'REJECTED':
                return "bg-[#ef444410] text-[#ef4444] border-[#ef444420]";
            case 'NO_SHOW':
                return "bg-[#f9731610] text-[#f97316] border-[#f9731620]";
            case 'CHECKED_IN':
                return "bg-[#3b82f610] text-[#3b82f6] border-[#3b82f620]";
            default:
                return "bg-[#3c143205] text-[#3c143260] border-[#3c14320a]";
        }
    };

    const getPaymentStatusStyle = (status) => {
        if (!status) return "text-[#3c143260]";
        switch (status.toUpperCase()) {
            case 'PAID':
                return "text-[#10b981]";
            case 'PENDING':
                return "text-[#f59e0b]";
            case 'REFUNDED':
                return "text-[#3b82f6]";
            case 'FAILED':
                return "text-[#ef4444]";
            default:
                return "text-[#3c143260]";
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        try {
            const [hours, minutes] = timeStr.split(':');
            const h = parseInt(hours);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const hour12 = h % 12 || 12;
            return `${hour12}:${minutes} ${ampm}`;
        } catch {
            return timeStr;
        }
    };

    const getServiceNames = (services) => {
        if (!services || services.length === 0) return 'Service';
        return services.map(s => s.name).join(', ');
    };

    const getTotalDuration = (services) => {
        if (!services || services.length === 0) return null;
        const total = services.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
        if (total === 0) return null;
        if (total >= 60) {
            const hrs = Math.floor(total / 60);
            const mins = total % 60;
            return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
        }
        return `${total}m`;
    };

    // Loading state
    if (loading) {
        return (
            <div className="px-8 mt-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#1e0a18] font-[Cormorant_Garamond]">Recent Appointments</h2>
                </div>
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 text-[#7a2860] animate-spin" />
                    <span className="ml-3 text-[#3c143280] font-medium">Loading bookings...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="px-8 mt-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#1e0a18] font-[Cormorant_Garamond]">Recent Appointments</h2>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
                    <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                    <p className="text-red-600 font-medium">{error}</p>
                    <p className="text-red-400 text-sm mt-1">Please try again later.</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (!bookings || bookings.length === 0) {
        return (
            <div className="px-8 mt-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#1e0a18] font-[Cormorant_Garamond]">Recent Appointments</h2>
                </div>
                <div className="bg-white p-12 rounded-xl border border-dashed border-slate-200 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Calendar size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">No bookings found in your history.</p>
                    <p className="text-slate-400 text-sm mt-1">Your appointments will appear here once booked.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-8 mt-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-[#1e0a18] font-[Cormorant_Garamond]">Recent Appointments</h2>
                    <p className="text-[#3c143250] text-xs font-bold uppercase tracking-widest mt-1">
                        {pagination.totalElements} {pagination.totalElements === 1 ? 'Booking' : 'Bookings'} Found
                    </p>
                </div>
                {pagination.totalPages > 1 && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={prevPage}
                            disabled={pagination.isFirst}
                            className="w-9 h-9 rounded-xl border border-[#3c143210] flex items-center justify-center text-[#3c1432] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7a286008] hover:border-[#7a286020] transition-all"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-[#3c143260] text-xs font-bold tracking-wider">
                            {pagination.currentPage + 1} / {pagination.totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={pagination.isLast}
                            className="w-9 h-9 rounded-xl border border-[#3c143210] flex items-center justify-center text-[#3c1432] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7a286008] hover:border-[#7a286020] transition-all"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Booking Cards */}
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white p-6 rounded-2xl border border-[#3c143208] shadow-sm hover:shadow-md transition-all group"
                    >
                        {/* Top Row: Booking Number + Status */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[#3c143230] text-[0.65rem] font-black uppercase tracking-widest">
                                    {booking.bookingNumber}
                                </span>
                                {booking.paymentMethod && (
                                    <span className="flex items-center gap-1 text-[#3c143230] text-[0.6rem] font-bold uppercase tracking-wider">
                                        <CreditCard size={10} />
                                        {booking.paymentMethod}
                                    </span>
                                )}
                            </div>
                            <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.15em] ${getStatusStyle(booking.status)}`}>
                                {booking.status || 'Unknown'}
                            </span>
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                            {/* Left: Service + Date Info */}
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-[#fdfaf8] flex items-center justify-center text-[#7a2860]/40 border border-[#3c143205] shrink-0">
                                    <Scissors size={22} strokeWidth={1.5} />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-lg text-[#1e0a18] group-hover:text-[#7a2860] transition-colors font-[Cormorant_Garamond] leading-tight">
                                        {getServiceNames(booking.services)}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2">
                                        <span className="flex items-center gap-1.5 text-[#3c143260] text-xs font-medium">
                                            <Calendar size={12} />
                                            {formatDate(booking.bookingDate)}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-[#3c143240] text-xs font-medium">
                                            <Clock size={12} />
                                            {formatTime(booking.startTime)} — {formatTime(booking.endTime)}
                                        </span>
                                        {getTotalDuration(booking.services) && (
                                            <span className="text-[#3c143230] text-xs font-medium">
                                                ({getTotalDuration(booking.services)})
                                            </span>
                                        )}
                                    </div>

                                    {/* Staff & Customer Info */}
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2.5">
                                        {booking.staff && (
                                            <span className="flex items-center gap-1.5 text-[#3c143250] text-[0.7rem] font-medium">
                                                <User size={11} />
                                                {booking.staff.fullName}
                                                {booking.staff.designation && (
                                                    <span className="text-[#3c143225]">• {booking.staff.designation}</span>
                                                )}
                                            </span>
                                        )}
                                        {booking.customer && (
                                            <span className="flex items-center gap-1.5 text-[#3c143250] text-[0.7rem] font-medium">
                                                <User size={11} />
                                                {booking.customer.fullName}
                                            </span>
                                        )}
                                    </div>

                                    {/* Customer Notes */}
                                    {booking.customerNotes && (
                                        <p className="mt-2 text-[#3c143240] text-xs italic border-l-2 border-[#7a286015] pl-3">
                                            "{booking.customerNotes}"
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right: Pricing */}
                            <div className="flex items-center justify-between md:justify-end gap-8 md:min-w-[180px]">
                                <div className="text-right">
                                    <p className="text-[#3c143230] text-[0.55rem] uppercase font-black tracking-widest mb-0.5">Amount</p>
                                    {booking.discountAmount > 0 ? (
                                        <>
                                            <p className="text-[#3c143230] text-xs line-through">
                                                ₹{booking.totalAmount?.toFixed(2)}
                                            </p>
                                            <p className="font-bold text-lg text-[#1e0a18] tracking-tight">
                                                ₹{booking.finalAmount?.toFixed(2)}
                                            </p>
                                            <p className="text-[#10b981] text-[0.6rem] font-bold">
                                                −₹{booking.discountAmount?.toFixed(2)} off
                                            </p>
                                        </>
                                    ) : (
                                        <p className="font-bold text-lg text-[#1e0a18] tracking-tight">
                                            ₹{booking.finalAmount?.toFixed(2) || booking.totalAmount?.toFixed(2) || 'N/A'}
                                        </p>
                                    )}
                                    <p className={`text-[0.6rem] font-bold uppercase tracking-wider mt-0.5 ${getPaymentStatusStyle(booking.paymentStatus)}`}>
                                        {booking.paymentStatus || ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={prevPage}
                        disabled={pagination.isFirst}
                        className="px-4 py-2 rounded-xl border border-[#3c143210] text-xs font-bold uppercase tracking-wider text-[#3c1432] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7a286008] transition-all"
                    >
                        ← Previous
                    </button>
                    <span className="text-[#3c143250] text-xs font-bold">
                        Page {pagination.currentPage + 1} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={pagination.isLast}
                        className="px-4 py-2 rounded-xl border border-[#3c143210] text-xs font-bold uppercase tracking-wider text-[#3c1432] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7a286008] transition-all"
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
