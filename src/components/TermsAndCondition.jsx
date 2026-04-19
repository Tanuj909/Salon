"use client";



export default function TermsAndCondition({ onClose }) {

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in pt-20"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[70vh] animate-slide-up relative">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#f9fafb]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-[Cormorant_Garamond,serif] tracking-tight text-[#1C3152]">
              Terms & condition
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-[#1C3152]/60 font-bold mt-1">
              Fast Booking Service
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 rounded-full group"
            title="Close"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-700 space-y-6 custom-scrollbar leading-relaxed">
          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">1. Platform Role</h3>
            <p>Fast Booking is an online platform that allows users to book appointments with salons and service providers. We act only as a facilitator and do not provide any salon services directly.</p>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">2. No Responsibility for Services</h3>
            <p className="mb-2">We are not responsible for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Quality of services provided by salons</li>
              <li>Behavior or conduct of service providers or customers</li>
              <li>Any injury, loss, or damage during or after the service</li>
            </ul>
            <p className="mt-2">All services are delivered solely by the respective salon/service provider.</p>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">3. Booking Responsibility</h3>
            <p className="mb-2">Users are responsible for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Selecting the salon/service provider</li>
              <li>Checking service details, pricing, and availability</li>
              <li>Reaching the salon on time</li>
            </ul>
            <p className="mt-2">The platform is not liable for missed or delayed appointments.</p>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">4. Payments & Transactions</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Fast Booking does not take responsibility for any payment made directly to the salon.</li>
              <li>Any dispute related to money, refund, or charges must be resolved directly between the customer and the service provider.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">5. Cancellations & Refunds</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Cancellation and refund policies are decided by individual salons.</li>
              <li>Fast Booking is not responsible for any refund claims or disputes.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">6. Disputes</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Any dispute between customer and service provider must be resolved between them.</li>
              <li>Fast Booking will not be involved in legal or financial disputes.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">7. Accuracy of Information</h3>
            <p className="mb-2">We try to keep information accurate, but we do not guarantee:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Service availability</li>
              <li>Pricing correctness</li>
              <li>Salon details</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">8. Account & Misuse</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Users must provide correct details while booking.</li>
              <li>Any misuse of the platform may lead to account suspension.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">9. Limitation of Liability</h3>
            <p className="mb-2">Fast Booking shall not be liable for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Any indirect or direct damages</li>
              <li>Loss of money, reputation, or business</li>
              <li>Service dissatisfaction</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-[#1C3152] text-base mb-2">10. Changes to Terms</h3>
            <p>We reserve the right to update these terms at any time without prior notice.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
