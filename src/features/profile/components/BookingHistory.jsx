import React from 'react';
import { Calendar, Clock, DollarSign, ChevronRight } from 'lucide-react';

const BookingHistory = ({ bookings }) => {
    const displayBookings = bookings || [];

    const getStatusStyle = (status) => {
        if (!status) return "bg-[#3c143205] text-[#3c143260] border-[#3c14320a]";
        switch (status.toLowerCase()) {
            case 'upcoming':
            case 'confirmed':
            case 'pending':
                return "bg-[#7a286010] text-[#7a2860] border-[#7a286020]";
            case 'completed':
                return "bg-[#10b98110] text-[#10b981] border-[#10b98120]";
            case 'cancelled':
            case 'rejected':
                return "bg-[#ef444410] text-[#ef4444] border-[#ef444420]";
            default:
                return "bg-[#3c143205] text-[#3c143260] border-[#3c14320a]";
        }
    };

    if (displayBookings.length === 0) {
        return (
            <div className="px-8 mt-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Booking History</h2>
                </div>
                <div className="bg-white p-12 rounded-xl border border-dashed border-slate-200 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Calendar size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">No bookings found in your history.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-8 mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#1e0a18] font-[Cormorant_Garamond]">Recent Appointments</h2>
                <button className="text-[#7a2860] font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1">
                    Full Records <ChevronRight size={12} />
                </button>
            </div>

            <div className="space-y-4">
                {displayBookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white p-6 rounded-2xl border border-[#3c143208] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#fdfaf8] flex items-center justify-center text-[#7a2860]/40 border border-[#3c143205]">
                                <Calendar size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-[#1e0a18] group-hover:text-[#7a2860] transition-colors font-[Cormorant_Garamond]">
                                    {booking.businessName || booking.salon || 'Premium Salon'}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                    <span className="text-[#3c143280] text-[0.8rem] font-medium">{booking.service || booking.serviceName || 'Professional Service'}</span>
                                    <span className="flex items-center gap-1.5 text-[#3c143240] text-xs font-medium">
                                        <Clock size={12} /> {booking.bookingDate || booking.date} • {booking.bookingTime || booking.time}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-10">
                            <div className="text-right">
                                <p className="text-[#3c143230] text-[0.55rem] uppercase font-black tracking-widest mb-0.5">Investment</p>
                                <p className="font-bold text-lg text-[#1e0a18] tracking-tight">
                                    {booking.totalAmount ? `$${booking.totalAmount.toFixed(2)}` : booking.price || 'N/A'}
                                </p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.15em] ${getStatusStyle(booking.status || booking.bookingStatus)}`}>
                                {booking.status || booking.bookingStatus || 'Unknown'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingHistory;
