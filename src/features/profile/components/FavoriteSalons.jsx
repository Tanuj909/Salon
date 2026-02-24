import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';

const FavoriteSalons = ({ salons }) => {
    const displaySalons = salons || [
        {
            id: 1,
            name: "The Gilded Mirror",
            location: "Upper East Side, Manhattan",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Pure Silk Aesthetics",
            location: "Williamsburg, Brooklyn",
            rating: "4.8",
            image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Petal & Stem Wellness",
            location: "Downtown, Jersey City",
            rating: "5.0",
            image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d151?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    if (displaySalons.length === 0) {
        return (
            <div className="px-8 mt-16 text-center py-20 bg-white rounded-xl border border-slate-100 border-dashed">
                <Heart className="mx-auto text-slate-200 mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-900">No favorite salons yet</h3>
                <p className="text-slate-500 mt-2">Explore our directory and save your favorite wellness spots!</p>
                <button className="mt-6 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
                    Explore Salons
                </button>
            </div>
        );
    }

    return (
        <div className="px-8 mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Favorite Salons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displaySalons.map((salon) => (
                    <div key={salon.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                        <div className="h-56 overflow-hidden relative">
                            <img
                                src={salon.image}
                                alt={salon.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-primary shadow-sm">
                                <Star size={14} fill="currentColor" />
                                <span className="text-xs font-black">{salon.rating}</span>
                            </div>
                            <div className="absolute top-4 left-4">
                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all">
                                    <Heart size={16} fill="currentColor" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <h4 className="font-bold text-xl mb-1 text-slate-900 group-hover:text-primary transition-colors">
                                {salon.name}
                            </h4>
                            <div className="flex items-center gap-1 text-slate-400 text-sm mb-6 font-medium">
                                <MapPin size={14} />
                                {salon.location}
                            </div>
                            <button className="w-full py-3.5 bg-slate-50 hover:bg-primary hover:text-white transition-all rounded-full font-bold text-xs uppercase tracking-widest text-slate-900">
                                View Salon
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteSalons;
