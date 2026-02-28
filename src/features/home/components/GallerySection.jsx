"use client";

import React, { useState } from 'react';

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'hair', label: 'Hair' },
    { id: 'skin', label: 'Skin' },
    { id: 'nails', label: 'Nails' },
    { id: 'bridal', label: 'Bridal' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Precision Bob Cut",
      category: "hair",
      image: "https://images.unsplash.com/photo-1525614686090-7a3108e3758e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvYiUyMGN1dHxlbnwwfHwwfHx8MA%3D%3D",
      description: "Modern precision cut with textured ends"
    },
    {
      id: 2,
      title: "Balayage Masterpiece",
      category: "hair",
      image: "https://images.unsplash.com/photo-1568530134868-5d89f49d5a72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEJhbGF5YWdlfGVufDB8fDB8fHww",
      description: "Sun-kissed balayage for natural dimension"
    },
    {
      id: 3,
      title: "Luxury Facial",
      category: "skin",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhbG9ufGVufDB8fDB8fHww",
      description: "Deep cleansing facial with organic products"
    },
    {
      id: 4,
      title: "Bridal Glow",
      category: "bridal",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZwatrTnvnmq9fKbDCD54TxCGWmSdF8uG7JHsAv0tsf_y3mGeYufo8SXtIpO5SGh5ZdtVgEvAvpcofmIXhg8ePC2wo6M5VSUlq5LDaZDwcuFsbofUOH--p6xj8SwLQYhQHiGmOllpVgvnClOpKg14NyUI5yuRUD3iJPUSkg-SnqU2y0z1bsZbaP25NgGW7wYH5jmHzl_5tQmksd7ezywNc_n6PnQhu8DraI5qkvvtgaDvi3GdA0mqj-nYxXuwNKtpY9G7YxDel5-Br",
      description: "Complete bridal makeup and styling"
    },
    {
      id: 5,
      title: "Artistic Nail Design",
      category: "nails",
      image: "https://images.unsplash.com/photo-1588015810531-dd522c9c8bbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TmFpbCUyMERlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      description: "Hand-painted floral nail artistry"
    },
    {
      id: 6,
      title: "Microblading",
      category: "skin",
      image: "https://plus.unsplash.com/premium_photo-1718626724867-970453587837?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TWljcm9ibGFkaW5nfGVufDB8fDB8fHww",
      description: "Natural brow enhancement technique"
    },
    {
      id: 7,
      title: "Bridal Updo",
      category: "bridal",
      image: "https://images.unsplash.com/photo-1760220006440-4b98ad942c53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QnJpZGFsJTIwVXBkb3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Elegant bridal updo with accessories"
    },
    {
      id: 8,
      title: "Gel Manicure",
      category: "nails",
      image: "https://images.unsplash.com/photo-1611821828952-3453ba0f9408?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEdlbCUyME1hbmljdXJlfGVufDB8fDB8fHww",
      description: "Long-lasting gel polish application"
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-24 px-6 max-w-[1200px] mx-auto bg-creamy/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-earthy-brown">Our Gallery</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-3 mb-8"></div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${ activeFilter === category.id ? 'bg-primary text-creamy shadow-lg scale-105' : 'bg-white text-plum hover:bg-primary/10 hover:scale-105' }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative h-[350px] overflow-hidden rounded-2xl cursor-pointer gallery-item"
          >
            <img
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={item.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Category Tag */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-plum px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {categories.find(cat => cat.id === item.category)?.label}
            </div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-creamy text-xl font-bold mb-1 drop-shadow-md">
                {item.title}
              </h3>
              <p className="text-creamy/90 text-xs mb-3">
                {item.description}
              </p>
              <button className="bg-primary text-creamy px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white hover:text-primary transition-colors mt-3">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-plum/60 text-lg">No items found in this category.</p>
        </div>
      )}

      {/* Load More Button (optional) */}
      {/* {filteredItems.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full text-sm font-bold hover:bg-primary hover:text-creamy transition-all duration-300">
            Load More
          </button>
        </div>
      )} */}
    </section>
  );
};

export default GallerySection;