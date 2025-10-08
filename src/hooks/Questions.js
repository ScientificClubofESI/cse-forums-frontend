import { useState, useEffect } from "react";
import authApi from "@/lib/authApi"; // Using authApi for public endpoints
import api from "@/lib/api";

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using authApi since this is a public endpoint (no authentication required)
      const response = await authApi.get("/threads/all");
      setQuestions(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch questions"
      );
      console.error("Failed to fetch questions:", err);
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
// hook to get all questions but when the user is authenticated
export const useAuthenticatedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using api instance for authenticated endpoints
      const response = await api.get("/threads/all_authenticated");
      setQuestions(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch questions"
      );
      console.error("Failed to fetch questions:", err);
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
  };
}

export const useAuthenticatedQuestion = (id) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchQuestion = async () => {

    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      // Using api instance for authenticated endpoints
      const response = await api.get(`/threads/authenticated/${id}`);
      console.log(response);
      setQuestion(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch question"
      );
      console.error("Failed to fetch question:", err);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);
  return {
    question,
    loading,
    error,
    refetch: fetchQuestion,
  };
}

export const useQuestion = (id) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      // Using authApi since this is now a public endpoint
      const response = await authApi.get(`/threads/thread/${id}`);
      console.log(response);
      setQuestion(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch question"
      );
      console.error("Failed to fetch question:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  return {
    question,
    loading,
    error,
    refetch: fetchQuestion,
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
      const response = await api.get(`/threads/saved`);
      const savedIds = new Set(response.data.data.map((thread) => thread.id));
      setSavedThreads(savedIds);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch saved threads"
      );
      console.error("Failed to fetch saved threads:", err);
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
};

export const useSaveThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveThread = async (threadId, userId) => {
    setLoading(true);
    setError(null);
    try {
      // Using api instance for authenticated endpoints
      await api.post(`/threads/${threadId}/save`);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to save thread";
      setError(errorMessage);
      console.error("Failed to save thread:", err);
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
      await api.delete(`/threads/${threadId}/save`);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to unsave thread";
      setError(errorMessage);
      console.error("Failed to unsave thread:", err);
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

export const useCreateThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createThread = async (threadData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/threads/create", {
        title: threadData.title,
        content: threadData.content,
        // check for the tags logic later
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: "Thread created successfully!",
        };
      } else {
        const errorMessage = response.data.message || "Failed to create thread";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to create thread";
      setError(errorMessage);
      console.error("Create thread error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createThread,
    loading,
    error,
    clearError: () => setError(null),
  };
};

export const useDeleteThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteThread = async (threadId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/threads/${threadId}`);
      if (response.status === 200) {
        return { success: true, message: "Thread deleted successfully!" };
      } else {
        const errorMessage = response.data.message || "Failed to delete thread";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete thread";
      setError(errorMessage);
      console.error("Error deleting thread:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteThread,
    loading,
    error,
  };
};

export const useUpdateThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateThread = async (threadId, threadData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/threads/${threadId}`, {
        title: threadData.title,
        content: threadData.content,
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: "Thread updated successfully!",
        };
      } else {
        const errorMessage = response.data.message || "Failed to update thread";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update thread";
      setError(errorMessage);
      console.error("Update thread error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateThread,
    loading,
    error,
    clearError: () => setError(null),
  };
};

export const useVoteThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const voteThread = async (threadId, type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/threads/${threadId}/vote`, {
        type, // 'up' or 'down'
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: "Vote recorded successfully!",
        };
      } else {
        const errorMessage = response.data.message || "Failed to vote";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to vote";
      setError(errorMessage);
      console.error("Vote error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    voteThread,
    loading,
    error,
    clearError: () => setError(null),
  };
};

export const useUnvoteThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const unvoteThread = async (threadId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/threads/${threadId}/vote`);
      if (response.data.success) {
        return { success: true, message: "Vote removed successfully!" };
      } else {
        const errorMessage = response.data.message || "Failed to remove vote";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to remove vote";
      setError(errorMessage);
      console.error("Error removing vote:", err);
      return { success: false, error: errorMessage };
    }
    finally {
      setLoading(false);
    }
  };
  return {
    unvoteThread,
    loading,
    error,
  };
};
export const useGetUserSavedQuestions = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSavedQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/threads/saved`);
      console.log(response);
      setSavedQuestions(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch saved questions"
      );
      console.error("Failed to fetch saved questions:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSavedQuestions();
  }, []);

  return {
    savedQuestions,
    loading,
    error,
    refetch: fetchSavedQuestions,
  };
};
