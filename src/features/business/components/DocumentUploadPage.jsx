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
  const fileInputRefs = useRef({});

  const [uploadingForType, setUploadingForType] = useState(null);
  const [messages, setMessages] = useState({});

  const handleFileChange = (typeId, file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessages(prev => ({ ...prev, [typeId]: { type: "error", text: "File size exceeds 5MB limit." } }));
        return;
      }
      setMessages(prev => ({ ...prev, [typeId]: { type: "", text: "" } }));
      // Auto-upload after file selection
      handleUpload(typeId, file);
    }
  };

  const handleUpload = async (typeId, file) => {
    if (!typeId || !file || !business?.id) {
      setMessages(prev => ({ ...prev, [typeId]: { type: "error", text: "Please select a file." } }));
      return;
    }

    try {
      setUploadingForType(typeId);
      setMessages(prev => ({ ...prev, [typeId]: { type: "", text: "" } }));
      
      await uploadDocument(business.id, typeId, file);
      
      setMessages(prev => ({ ...prev, [typeId]: { type: "success", text: `${typeId.replace(/_/g, " ")} uploaded successfully!` } }));
      if (fileInputRefs.current[typeId]) fileInputRefs.current[typeId].value = "";
      refreshDocuments(); // Refresh the list after upload
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessages(prev => {
          const newMessages = { ...prev };
          if (newMessages[typeId]?.type === "success") {
            delete newMessages[typeId];
          }
          return newMessages;
        });
      }, 3000);
    } catch (err) {
      console.error("Upload failed:", err);
      setMessages(prev => ({ ...prev, [typeId]: { type: "error", text: err.response?.data?.message || "Failed to upload document. Please try again." } }));
    } finally {
      setUploadingForType(null);
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

      <div className="w-full px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-[#1C3152]/60 hover:text-[#1C3152] mb-8 transition-colors font-medium group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Top Verification Details Bar */}
          <div className="bg-[#1C3152] text-white rounded-2xl p-4 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#C8A951]/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
                <ShieldCheck size={14} className="text-[#C8A951]" />
                <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Document Verifications</span>
              </div>
            </div>
          </div>

          {/* Main Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Document Upload (70% width on large screens) */}
            <div className="lg:w-[70%] space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl border rec-card-border overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-[Cormorant_Garamond,serif] text-2xl font-bold rec-section-heading">
                    Upload <em className="italic rec-section-heading-accent font-light">Documents</em>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Select a document type and upload the file. It will be uploaded automatically.</p>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DOCUMENT_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isUploading = uploadingForType === type.id;
                      const message = messages[type.id];
                      const existingDoc = documents.find(doc => doc.documentType === type.id);
                      const isVerified = existingDoc?.verificationStatus === 'APPROVED';
                      const isRejected = existingDoc?.verificationStatus === 'REJECTED';
                      const isPending = existingDoc?.verificationStatus === 'PENDING';
                      
                      return (
                        <div
                          key={type.id}
                          className={`rounded-xl border transition-all ${
                            isVerified ? 'bg-green-50/30 border-green-200' :
                            isRejected ? 'bg-red-50/30 border-red-200' :
                            isPending ? 'bg-yellow-50/30 border-yellow-200' :
                            'bg-white border-[#1C3152]/10 hover:border-[#C8A951]/50'
                          }`}
                        >
                          <div className="p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                isVerified ? 'bg-green-100 text-green-600' :
                                isRejected ? 'bg-red-100 text-red-500' :
                                isPending ? 'bg-yellow-100 text-yellow-600' :
                                'bg-[#1C3152]/5 text-[#1C3152]'
                              }`}>
                                <Icon size={14} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-[11px] font-bold text-[#1C3152] uppercase tracking-wide leading-tight">
                                  {type.label}
                                </h3>
                                {existingDoc && (
                                  <span className={`text-[8px] font-bold uppercase ${
                                    isVerified ? 'text-green-600' :
                                    isRejected ? 'text-red-600' :
                                    'text-yellow-600'
                                  }`}>
                                    {existingDoc.verificationStatus}
                                  </span>
                                )}
                              </div>
                              {isVerified && <CheckCircle2 size={12} className="text-green-500 shrink-0" />}
                              {isRejected && <AlertCircle size={12} className="text-red-500 shrink-0" />}
                            </div>
                            
                            {message && (
                              <div className={`mb-2 p-1.5 rounded-lg text-[9px] flex gap-1.5 ${
                                message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                              }`}>
                                {message.type === "success" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                <span className="truncate">{message.text}</span>
                              </div>
                            )}
                            
                            <div
                              onClick={() => !isUploading && fileInputRefs.current[type.id]?.click()}
                              className={`relative border border-dashed rounded-lg p-2 text-center cursor-pointer transition-all ${
                                isUploading ? "opacity-50 cursor-wait" :
                                isVerified ? "border-green-300 bg-green-50/50" :
                                isRejected ? "border-red-300 bg-red-50/50" :
                                "border-[#1C3152]/10 hover:border-[#C8A951] hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="file"
                                ref={el => fileInputRefs.current[type.id] = el}
                                onChange={(e) => handleFileChange(type.id, e.target.files[0])}
                                className="hidden"
                                accept="image/*,application/pdf"
                                disabled={isUploading}
                              />
                              
                              {isUploading ? (
                                <div className="flex flex-col items-center gap-1">
                                  <Loader2 size={16} className="animate-spin text-[#1C3152]" />
                                  <p className="text-[8px] text-gray-500">Uploading...</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1">
                                  <Upload size={14} className={`${isVerified ? 'text-green-500' : isRejected ? 'text-red-400' : 'text-[#C8A951]'}`} />
                                  <p className="text-[9px] font-medium text-[#1C3152]">
                                    {isVerified ? 'Replace' : isRejected ? 'Re-upload' : 'Upload'}
                                  </p>
                                  <p className="text-[7px] text-gray-400">IMG, 5MB</p>
                                </div>
                              )}
                            </div>
                            
                            {existingDoc && existingDoc.fileName && (
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-[7px] text-gray-400 truncate max-w-[100px]">{existingDoc.fileName}</span>
                                <a 
                                  href={existingDoc.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[7px] font-bold text-[#C8A951] uppercase tracking-wider hover:underline"
                                >
                                  View
                                </a>
                              </div>
                            )}
                            
                            {isRejected && existingDoc?.rejectionReason && (
                              <div className="mt-2 p-1.5 rounded-lg bg-red-50/80 border border-red-100">
                                <p className="text-[7px] font-bold text-red-600 uppercase mb-0.5">Reason</p>
                                <p className="text-[7px] text-red-700 leading-tight truncate">{existingDoc.rejectionReason}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Uploaded Documents List */}
            <div className="lg:w-[30%] space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl border rec-card-border overflow-hidden sticky top-28">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="font-[Cormorant_Garamond,serif] text-xl font-bold rec-section-heading">
                      Uploaded <em className="italic rec-section-heading-accent font-light">Files</em>
                    </h2>
                    <span className="text-[9px] uppercase tracking-widest font-bold rec-section-subtext">
                      {documents.length} {documents.length === 1 ? 'File' : 'Files'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 max-h-[500px] overflow-y-auto">
                  {docsLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="h-20 rounded-xl bg-white border rec-card-border animate-pulse mb-2" />
                    ))
                  ) : documents.length > 0 ? (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-xl p-2 border rec-card-border shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-[#1C3152]/5 flex items-center justify-center text-[#1C3152]">
                                <FileText size={12} />
                              </div>
                              <div>
                                <h4 className="text-[10px] font-bold text-[#1C3152] uppercase tracking-wide">
                                  {doc.documentType.replace(/_/g, " ")}
                                </h4>
                                <p className="text-[8px] text-gray-400">
                                  {new Date(doc.uploadedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                </p>
                              </div>
                            </div>
                            
                            <div className={`px-1.5 py-0.5 rounded-full text-[7px] font-bold tracking-widest uppercase border ${
                              doc.verificationStatus === 'APPROVED' ? 'bg-green-50 text-green-600 border-green-100' :
                              doc.verificationStatus === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-100' :
                              'bg-yellow-50 text-yellow-600 border-yellow-100'
                            }`}>
                              {doc.verificationStatus === 'APPROVED' ? '✓' : doc.verificationStatus === 'REJECTED' ? '✗' : '⋯'}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-50">
                            <span className="text-[7px] font-medium text-gray-400 truncate max-w-[100px]">{doc.fileName}</span>
                            <a 
                              href={doc.fileUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[8px] font-bold text-[#C8A951] uppercase tracking-wider hover:underline"
                            >
                              View
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-2 text-gray-300">
                        <FileText size={16} />
                      </div>
                      <p className="text-[10px] font-bold text-[#1C3152]/40 uppercase tracking-widest">No files uploaded</p>
                      <p className="text-[8px] text-gray-400 mt-1">Upload documents from the left panel</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}