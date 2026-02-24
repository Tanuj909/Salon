import React from 'react';
import { Calendar, Clock, DollarSign, ChevronRight } from 'lucide-react';

const BookingHistory = ({ bookings }) => {
    const displayBookings = bookings || [
        {
            id: 1,
            salon: "The Gilded Mirror Salon",
            service: "Full Balayage & Blow Dry",
            date: "Oct 24, 2024",
            time: "14:30 PM",
            price: "$240.00",
            status: "Upcoming",
            statusColor: "blue"
        },
        {
            id: 2,
            salon: "Pure Silk Aesthetics",
            service: "Express HydraFacial",
            date: "Sep 12, 2024",
            time: "10:00 AM",
            price: "$185.00",
            status: "Completed",
            statusColor: "green"
        },
        {
            id: 3,
            salon: "Petal & Stem Wellness",
            service: "Deep Tissue Massage",
            date: "Aug 05, 2024",
            time: "16:00 PM",
            price: "$120.00",
            status: "Cancelled",
            statusColor: "red"
        }
    ];

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'upcoming':
                return "bg-blue-50 text-blue-600 border-blue-100";
            case 'completed':
                return "bg-green-50 text-green-600 border-green-100";
            case 'cancelled':
                return "bg-red-50 text-red-600 border-red-100";
            default:
                return "bg-slate-50 text-slate-600 border-slate-100";
        }
    };

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
                                    {booking.salon}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                    <span className="text-slate-500 text-sm font-medium">{booking.service}</span>
                                    <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                                        <Clock size={12} /> {booking.date} • {booking.time}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-8">
                            <div className="text-right">
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-0.5">Price</p>
                                <p className="font-bold text-lg text-slate-900">{booking.price}</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(booking.status)}`}>
                                {booking.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingHistory;
