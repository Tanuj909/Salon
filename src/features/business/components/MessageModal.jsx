"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Paperclip, Loader2, Download, User, ShieldCheck } from 'lucide-react';
import { useMessages } from '../hooks/useMessages';

const MessageModal = ({ isOpen, onClose, businessId }) => {
  const { messages, loading, sending, sendMessage, loadMore, hasMore } = useMessages(businessId);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsMounted(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen || !isMounted) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    try {
      await sendMessage(inputText, selectedFile);
      setInputText("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      alert("Failed to send message. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size should be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh] sm:h-[80vh] border border-[#D98C5F]/20">
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D98C5F]/10 flex items-center justify-center text-[#D98C5F]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Verification Support</h2>
              <p className="text-xs text-gray-500 font-medium">Chat with administrators</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAF9F6] scrollbar-thin scrollbar-thumb-gray-200"
        >
          {loading && messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 className="animate-spin text-[#D98C5F]" size={32} />
              <p className="text-sm text-gray-500 font-medium">Loading conversation...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-gray-300">
                <Send size={32} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">No messages yet</h3>
              <p className="text-gray-500 text-sm max-w-[240px]">
                Ask questions about your business verification status here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col-reverse gap-6">
              {messages.map((msg, idx) => (
                <div 
                  key={msg.id || idx}
                  className={`flex flex-col ${msg.isFromAdmin ? 'items-start' : 'items-end'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.isFromAdmin ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      msg.isFromAdmin ? 'bg-gray-200 text-gray-600' : 'bg-[#D98C5F] text-white'
                    }`}>
                      {msg.isFromAdmin ? <ShieldCheck size={14} /> : <User size={14} />}
                    </div>

                    {/* Bubble */}
                    <div className="flex flex-col gap-1">
                      <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${
                        msg.isFromAdmin 
                          ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-100' 
                          : 'bg-[#D98C5F] text-white rounded-br-sm'
                      }`}>
                        {msg.message && <p className="whitespace-pre-wrap">{msg.message}</p>}
                        
                        {msg.attachmentUrl && (
                          <div className={`mt-2 p-2 rounded-xl flex items-center gap-3 border ${
                            msg.isFromAdmin ? 'bg-gray-50 border-gray-200' : 'bg-white/10 border-white/20'
                          }`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              msg.isFromAdmin ? 'bg-white' : 'bg-white/20'
                            }`}>
                              <Paperclip size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold truncate">Attachment</p>
                                <p className="text-[10px] opacity-60">Click to download</p>
                            </div>
                            <a 
                              href={msg.attachmentUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`p-1.5 rounded-lg transition-colors ${
                                msg.isFromAdmin ? 'hover:bg-gray-200' : 'hover:bg-white/20'
                              }`}
                            >
                              <Download size={16} />
                            </a>
                          </div>
                        )}
                      </div>
                      <span className={`text-[10px] text-gray-400 font-medium ${msg.isFromAdmin ? 'ml-1' : 'mr-1 text-right'}`}>
                        {msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Just now'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {hasMore && (
                <button 
                  onClick={loadMore}
                  className="mx-auto px-4 py-1.5 text-xs font-bold text-[#D98C5F] hover:bg-[#D98C5F]/10 rounded-full transition-all border border-[#D98C5F]/20"
                >
                  Load older messages
                </button>
              )}
            </div>
          )}
        </div>

        {/* Selected File Preview */}
        {selectedFile && (
          <div className="px-6 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <Paperclip size={14} className="text-[#D98C5F]" />
              <span className="truncate max-w-[200px]">{selectedFile.name}</span>
            </div>
            <button 
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 sm:p-6 bg-white border-t border-gray-100">
          <div className="flex items-end gap-3 bg-[#FAF9F6] p-2 rounded-[2rem] border border-gray-200 focus-within:border-[#D98C5F]/30 transition-all">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-500 hover:text-[#D98C5F]"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              onChange={handleFileChange}
            />
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 bg-transparent border-none focus:ring-0 py-2.5 text-sm max-h-32 min-h-[40px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={sending || (!inputText.trim() && !selectedFile)}
              className={`p-2.5 rounded-full transition-all flex items-center justify-center shadow-lg active:scale-95 ${
                sending || (!inputText.trim() && !selectedFile)
                  ? 'bg-gray-200 text-white cursor-not-allowed'
                  : 'bg-[#D98C5F] text-white hover:bg-[#c47c51] shadow-[#D98C5F]/20'
              }`}
            >
              {sending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} className="ml-0.5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default MessageModal;
