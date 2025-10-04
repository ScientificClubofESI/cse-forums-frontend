import { useState, useEffect } from 'react';
import authApi from '@/lib/authApi'; // Using authApi for public endpoints
import api from '@/lib/api'

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using authApi since this is a public endpoint (no authentication required)
      const response = await authApi.get('/threads/all');
      setQuestions(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch questions');
      console.error('Failed to fetch questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions,
    setQuestions, // For external updates (like search results)
  };
};


export const useSavedThreads = (userId) => {
     const [savedThreads, setSavedThreads] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchSavedThreads = async () => {
    if (!userId) {
      setSavedThreads(new Set());
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Using api instance for authenticated endpoints
      const response = await api.get(`/threads/saved?user=${userId}`);
      const savedIds = new Set(response.data.data.map(thread => thread.id));
      setSavedThreads(savedIds);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch saved threads');
      console.error('Failed to fetch saved threads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedThreads();
  }, [userId]);

  return {
    savedThreads,
    loading,
    error,
    refetch: fetchSavedThreads,
  };
}

export const useSaveThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveThread = async (threadId, userId) => {
    setLoading(true);
    setError(null);
    try {
      // Using api instance for authenticated endpoints
      await api.post(`/threads/${threadId}/save`, {
        user_id: Number(userId)
      });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save thread';
      setError(errorMessage);
      console.error('Failed to save thread:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const unsaveThread = async (threadId, userId) => {
    setLoading(true);
    setError(null);
    try {
      // Using api instance for authenticated endpoints
      await api.delete(`/threads/${threadId}/save`, {
        data: { user_id: Number(userId) }
      });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to unsave thread';
      setError(errorMessage);
      console.error('Failed to unsave thread:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveThread = async (threadId, userId, isSaved) => {
    if (isSaved) {
      return await unsaveThread(threadId, userId);
    } else {
      return await saveThread(threadId, userId);
    }
  };

  return {
    saveThread,
    unsaveThread,
    toggleSaveThread,
    loading,
    error,
  };
};