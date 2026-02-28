import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, User, Scissors, ChevronRight, ChevronLeft, Loader2, AlertCircle, Receipt, MapPin, Star } from 'lucide-react';
import { useBookingHistory } from '../hooks/useBookingHistory';

const BookingHistory = ({ businessId }) => {
    const { bookings, loading, error, pagination, nextPage, prevPage, cancelBooking, isCanceling, submitReview, isSubmittingReview } = useBookingHistory(businessId);

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: "",
        isAnonymous: false
    });

    const handleCancel = async (bookingId) => {
        if (isCanceling) return;
        const reason = window.prompt("Please provide a reason for cancellation:");
        if (reason === null) return;

        const success = await cancelBooking(bookingId, reason.trim() || "Client not available");
        if (!success) {
            alert("Failed to cancel the booking. Please try again.");
        }
    };

    const handleOpenReviewModal = (booking) => {
        setSelectedBooking(booking);
        setNewReview({ rating: 5, comment: "", isAnonymous: false });
        setShowReviewModal(true);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBooking) return;

        const success = await submitReview({
            ...newReview,
            businessId: selectedBooking.business?.id || businessId,
            bookingId: selectedBooking.id
        });

        if (success) {
            setShowReviewModal(false);
            setSelectedBooking(null);
            alert("Thank you for your valuable feedback!");
        } else {
            alert("Failed to submit review. Please try again later.");
        }
    };

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
                    <AlertCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="text-primary font-medium">{error}</p>
                    <p className="text-primary text-sm mt-1">Please try again later.</p>
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
                <div className="bg-white p-12 rounded-xl border border-dashed border-border text-center">
                    <div className="w-16 h-16 bg-background-light rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Calendar size={32} />
                    </div>
                    <p className="text-muted font-medium">No bookings found in your history.</p>
                    <p className="text-muted text-sm mt-1">Your appointments will appear here once booked.</p>
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

                            {/* Right: Pricing & Actions */}
                            <div className="flex flex-col md:items-end gap-3 md:min-w-[180px]">
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

                                <button
                                    onClick={() => handleCancel(booking.id)}
                                    disabled={isCanceling}
                                    className="mt-1 px-4 py-1.5 rounded-lg border border-[#ef444420] text-[#ef4444] text-[0.65rem] font-bold uppercase tracking-wider hover:bg-[#ef444410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto text-center"
                                >
                                    Cancel Booking
                                </button>

                                {/* Write Review Button */}
                                {booking.status?.toUpperCase() === 'COMPLETED' && (
                                    <button
                                        onClick={() => handleOpenReviewModal(booking)}
                                        className="mt-1 px-4 py-1.5 rounded-lg border border-[#10b98120] text-[#10b981] text-[0.65rem] font-bold uppercase tracking-wider hover:bg-[#10b98110] transition-colors w-full md:w-auto text-center flex items-center justify-center gap-1.5"
                                    >
                                        <Star size={12} />
                                        Write Review
                                    </button>
                                )}
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

            {/* Review Modal */}
            {showReviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setShowReviewModal(false)}>
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button
                            onClick={() => setShowReviewModal(false)}
                            className="absolute top-6 right-6 text-[#3c143260] hover:text-[#1e0a18] transition-colors"
                            type="button"
                        >
                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="font-[Cormorant_Garamond] text-3xl font-bold text-[#1e0a18] mb-2">Share Your Experience</h3>
                        <p className="text-[#3c143260] text-sm mb-6">Your feedback helps us maintain our standard of luxury.</p>

                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-[#3c143280] font-bold mb-2">Rating *</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className={`text-3xl transition-colors focus:outline-none ${star <= newReview.rating ? 'text-[#C8A951]' : 'text-[#e5d9c5]'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="review-comment" className="block text-[10px] uppercase tracking-widest text-[#3c143280] font-bold mb-2">Comments *</label>
                                <textarea
                                    id="review-comment"
                                    required
                                    rows={4}
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-[#3c143210] bg-[#fdfaf8] focus:outline-none focus:border-[#7a286040] transition-colors text-sm resize-none"
                                    placeholder="Tell us about your service..."
                                />
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5 border border-[#3c143220] rounded group-hover:border-[#7a2860] transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={newReview.isAnonymous}
                                        onChange={(e) => setNewReview({ ...newReview, isAnonymous: e.target.checked })}
                                        className="appearance-none absolute w-full h-full cursor-pointer peer"
                                    />
                                    <svg className="w-3 h-3 text-[#7a2860] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span className="text-[#3c143260] text-sm select-none">Submit anonymously</span>
                            </label>

                            <button
                                type="submit"
                                disabled={isSubmittingReview}
                                className="w-full mt-6 py-4 rounded-xl bg-[#1e0a18] text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#7a2860] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmittingReview ? "Submitting..." : "Post Review"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingHistory;
