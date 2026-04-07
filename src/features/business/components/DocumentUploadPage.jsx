"use client";

import React, { useState, useRef } from "react";
import { useMyBusiness } from "../hooks/useMyBusiness";
import { useDocuments } from "../hooks/useDocuments";
import { uploadDocument } from "../services/businessService";
import { useRouter } from "next/navigation";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  X,
  FileCheck,
  ShieldCheck
} from "lucide-react";

const DOCUMENT_TYPES = [
  { id: "TRADE_LICENCE", label: "Trade Licence", icon: FileText },
  { id: "SIGNATURE", label: "Owner Signature", icon: FileCheck },
  { id: "EMIRATES_ID", label: "Emirates ID / National ID", icon: ShieldCheck },
  { id: "ESTABLISHMENT_CARD", label: "Establishment Card", icon: FileText },
  { id: "VAT_CERTIFICATE", label: "VAT Certificate", icon: FileText },
  { id: "MUNICIPALITY_APPROVAL", label: "Municipality Approval", icon: FileText },
  { id: "LOCATION_PROOF", label: "Location Proof", icon: FileText },
  { id: "SERVICE_MENU", label: "Service Menu", icon: FileText },
];

export default function DocumentUploadPage() {
  const { business, loading: businessLoading } = useMyBusiness();
  const { documents, loading: docsLoading, refreshDocuments } = useDocuments(business?.id);
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [selectedType, setSelectedType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size exceeds 5MB limit." });
        return;
      }
      setSelectedFile(file);
      setMessage({ type: "", text: "" });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedType || !selectedFile || !business?.id) {
       setMessage({ type: "error", text: "Please select a document type and a file." });
       return;
    }

    try {
      setIsUploading(true);
      setMessage({ type: "", text: "" });
      
      await uploadDocument(business.id, selectedType, selectedFile);
      
      setMessage({ type: "success", text: `${selectedType.replace(/_/g, " ")} uploaded successfully!` });
      setSelectedFile(null);
      setSelectedType("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      refreshDocuments(); // Refresh the list after upload
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to upload document. Please try again." });
    } finally {
      setIsUploading(false);
    }
  };

  if (businessLoading) {
    return (
      <div className="min-h-screen hero-filter-input-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1C3152] animate-spin" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen pt-32 pb-24 hero-filter-input-bg text-center px-6">
        <h2 className="font-[Cormorant_Garamond,serif] text-4xl font-bold rec-section-heading mb-6">
          No Business Found
        </h2>
        <p className="rec-section-subtext mb-8">You need to register your business before uploading documents.</p>
        <button
          onClick={() => router.push("/partner")}
          className="px-8 py-3.5 bg-[#1C3152] text-[#C8A951] rounded-lg font-bold tracking-widest uppercase hover:bg-[#2a4570] transition-all"
        >
          Register Business
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-24 font-[Jost,sans-serif] hero-filter-input-bg">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[#1C3152]/60 hover:text-[#1C3152] mb-8 transition-colors font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl border rec-card-border overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Info */}
            <div className="md:w-1/3 p-8 sm:p-10 bg-[#1C3152] text-white relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A951]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
               
               <span className="block text-[10px] tracking-[0.4em] uppercase text-[#C8A951] font-bold mb-6 relative z-10">Verification</span>
               <h2 className="font-[Cormorant_Garamond,serif] text-3xl sm:text-4xl font-bold leading-tight mb-6 relative z-10">
                 Business <em className="italic text-[#C8A951] font-light">Verification</em>
               </h2>
               <p className="text-blue-100/70 text-sm leading-relaxed mb-10 relative z-10">
                 Please upload the required documents to verify your business and unlock all premium features.
               </p>

               <div className="space-y-6 relative z-10">
                 <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} className="text-[#C8A951]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A951] mb-1">Secure Upload</h4>
                      <p className="text-[11px] text-blue-100/50 leading-normal">Your documents are encrypted and stored securely.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <FileCheck size={16} className="text-[#C8A951]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A951] mb-1">Quick Review</h4>
                      <p className="text-[11px] text-blue-100/50 leading-normal">Our team reviews documents within 48 business hours.</p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Upload Area */}
            <div className="md:w-2/3 p-8 sm:p-12">
              {message.text && (
                <div className={`mb-8 p-4 rounded-xl border flex gap-3 text-sm animate-fade-in ${
                  message.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] rec-section-heading-accent ml-1">Select Document Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DOCUMENT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                            selectedType === type.id
                              ? "bg-[#1C3152] border-[#C8A951] text-[#C8A951] shadow-lg shadow-[#1C3152]/20"
                              : "bg-white border-[#1C3152]/10 text-[#1C3152]/60 hover:border-[#C8A951]/50 hover:text-[#1C3152]"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                             selectedType === type.id ? "bg-[#C8A951]/20" : "bg-gray-50"
                          }`}>
                            <Icon size={18} />
                          </div>
                          <span className="text-xs font-bold tracking-wide uppercase">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] rec-section-heading-accent ml-1">Upload File</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all group ${
                      selectedFile ? "border-green-300 bg-green-50/30" : "border-[#1C3152]/10 hover:border-[#C8A951] hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,application/pdf"
                    />
                    
                    {selectedFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
                           <FileCheck size={32} />
                        </div>
                        <p className="text-sm font-bold text-[#1C3152]">{selectedFile.name}</p>
                        <p className="text-[10px] text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="mt-2 text-red-500 hover:text-red-700 p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-[#C8A951] group-hover:scale-110 transition-transform">
                           <Upload size={32} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1C3152]">Click or drag file to upload</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (Max. 5MB)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading || !selectedFile || !selectedType}
                  className="w-full h-14 bg-[#1C3152] text-[#C8A951] rounded-xl font-bold tracking-normal sm:tracking-[0.2em] text-[10px] sm:text-sm uppercase transition-all hover:bg-[#2a4570] hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-[#C8A951]/30"
                >
                  {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {isUploading ? "Uploading..." : "Submit Verification Document"}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Uploaded Documents List */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold rec-section-heading font-[Cormorant_Garamond,serif]">
              Uploaded <em className="italic rec-section-heading-accent font-light">Documents</em>
            </h3>
            <span className="text-[10px] uppercase tracking-widest font-bold rec-section-subtext">
              {documents.length} {documents.length === 1 ? 'Document' : 'Documents'} Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docsLoading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="h-32 rounded-2xl bg-white border rec-card-border animate-pulse" />
              ))
            ) : documents.length > 0 ? (
              documents.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl p-5 border rec-card-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1C3152]/5 flex items-center justify-center text-[#1C3152]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1C3152] uppercase tracking-wide">
                          {doc.documentType.replace(/_/g, " ")}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-medium">
                          Uploaded on {new Date(doc.uploadedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                      doc.verificationStatus === 'APPROVED' ? 'bg-green-50 text-green-600 border-green-100' :
                      doc.verificationStatus === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-yellow-50 text-yellow-600 border-yellow-100'
                    }`}>
                      {doc.verificationStatus}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">File Name</span>
                      <span className="text-xs font-semibold text-[#1C3152] truncate max-w-[150px]">{doc.fileName}</span>
                    </div>
                    
                    <a 
                      href={doc.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#C8A951] uppercase tracking-widest hover:underline"
                    >
                      View Document
                    </a>
                  </div>

                  {doc.rejectionReason && (
                    <div className="mt-4 p-3 rounded-xl bg-red-50/50 border border-red-100/50">
                      <div className="flex gap-2 items-start">
                        <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-red-600 uppercase mb-0.5">Rejection Reason</p>
                          <p className="text-[11px] text-red-700 leading-normal">{doc.rejectionReason}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 bg-white rounded-3xl border border-dashed rec-card-border text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <FileText size={32} />
                </div>
                <p className="text-sm font-bold text-[#1C3152]/40 uppercase tracking-widest">No documents uploaded yet</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 p-6 rounded-2xl bg-white border rec-card-border shadow-sm">
           <div className="flex gap-4 items-start">
              <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1C3152] mb-1 uppercase tracking-wider">Verification Status</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your current verification status is <span className="font-bold text-[#C8A951] uppercase">{business.verificationStatus || "PENDING"}</span>. 
                  Please upload all required documents to expedite the process.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
