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
            <div className="px-8 mt-16 text-center py-20 bg-white rounded-xl border border-muted border-dashed">
                <Heart className="mx-auto text-muted mb-4" size={48} />
                <h3 className="text-xl font-bold profile-name-text">No favorite salons yet</h3>
                <p className="text-muted mt-2">Explore our directory and save your favorite wellness spots!</p>
                <button className="mt-6 px-8 py-3 footer-bg text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
                    Explore Salons
                </button>
            </div>
        );
    }

    return (
        <div className="px-8 mt-16">
            <h2 className="text-2xl font-bold profile-name-text mb-8 font-[Cormorant_Garamond]">Favorite Creations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displaySalons.map((salon) => (
                    <div key={salon.id} className="bg-white rounded-2xl overflow-hidden border hero-filter-input-bg shadow-sm group hover:shadow-xl transition-all">
                        <div className="h-56 overflow-hidden relative">
                            <img
                                src={salon.image}
                                alt={salon.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-white border border-white/20 shadow-sm">
                                <Star size={10} fill="currentColor" className="text-accent" />
                                <span className="text-[10px] font-black">{salon.rating}</span>
                            </div>
                            <div className="absolute top-4 left-4">
                                <button className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-sm hover:bg-accent hover:text-white transition-all">
                                    <Heart size={14} fill="currentColor" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <h4 className="font-bold text-xl mb-1 profile-name-text group-hover:salon-list-title-accent transition-colors font-[Cormorant_Garamond]">
                                {salon.name}
                            </h4>
                            <div className="flex items-center gap-1.5 profile-meta-text opacity-40 text-[0.7rem] mb-6 font-bold uppercase tracking-wider">
                                <MapPin size={12} className="salon-list-title-accent opacity-40" />
                                {salon.location}
                            </div>
                            <button className="w-full py-3.5 bg-black/[0.05] hover:footer-bg hover:text-white transition-all rounded-xl font-black text-[9px] uppercase tracking-[0.2em] profile-name-text">
                                Visit Portfolio
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteSalons;
