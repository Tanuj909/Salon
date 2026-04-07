"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchMessages, sendMessage } from "../services/messageService";

export const useMessages = (businessId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [sending, setSending] = useState(false);

  const fetchMessagesCallback = useCallback(async (page = 0, isLoadMore = false) => {
    if (!businessId) return;

    try {
      if (page === 0) setLoading(true);
      const data = await fetchMessages(businessId, page);
      
      const newMessages = data.content;
      setMessages(prev => isLoadMore ? [...prev, ...newMessages] : newMessages);
      setHasMore(!data.last);
      setCurrentPage(data.number);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError(err.response?.data?.message || "Failed to fetch messages");
    } finally {
      if (page === 0) setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchMessagesCallback(0);
  }, [fetchMessagesCallback]);

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchMessagesCallback(currentPage + 1, true);
    }
  };

  const handleSendMessage = async (text, file = null) => {
    if (!businessId || (!text.trim() && !file)) return;

    try {
      setSending(true);
      const newMessage = await sendMessage(businessId, text, file);
      setMessages(prev => [newMessage, ...prev]);
      return newMessage;
    } catch (err) {
      console.error("Failed to send message:", err);
      throw err;
    } finally {
      setSending(false);
    }
  };

  const refreshMessages = () => {
    fetchMessagesCallback(0);
  };

  return {
    messages,
    loading,
    error,
    hasMore,
    sending,
    loadMore,
    sendMessage: handleSendMessage,
    refreshMessages,
  };
};
