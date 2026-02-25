import React from 'react';
import { Calendar, Clock, DollarSign, ChevronRight } from 'lucide-react';

const BookingHistory = ({ bookings }) => {
    const displayBookings = bookings || [];

    const getStatusStyle = (status) => {
        if (!status) return "bg-slate-50 text-slate-600 border-slate-100";
        switch (status.toLowerCase()) {
            case 'upcoming':
            case 'confirmed':
            case 'pending':
                return "bg-blue-50 text-blue-600 border-blue-100";
            case 'completed':
                return "bg-green-50 text-green-600 border-green-100";
            case 'cancelled':
            case 'rejected':
                return "bg-red-50 text-red-600 border-red-100";
            default:
                return "bg-slate-50 text-slate-600 border-slate-100";
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
                <h2 className="text-2xl font-bold text-slate-900">Booking History</h2>
                <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                    View All Records <ChevronRight size={14} />
                </button>
            </div>

            <div className="space-y-4">
                {displayBookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100">
                                <Calendar size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">
                                    {booking.businessName || booking.salon || 'Premium Salon'}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                    <span className="text-slate-500 text-sm font-medium">{booking.service || booking.serviceName || 'Professional Service'}</span>
                                    <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                                        <Clock size={12} /> {booking.bookingDate || booking.date} • {booking.bookingTime || booking.time}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-8">
                            <div className="text-right">
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-0.5">Price</p>
                                <p className="font-bold text-lg text-slate-900">
                                    {booking.totalAmount ? `$${booking.totalAmount.toFixed(2)}` : booking.price || 'N/A'}
                                </p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(booking.status || booking.bookingStatus)}`}>
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
