import { useState, useEffect } from "react";
import api from "@/lib/api";


export const useAddAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addAnswer = async (threadId, content) => {
    if (!threadId || !content) {
      setError("Thread ID and content are required");
      return { success: false, error: "Thread ID and content are required" };
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post(`/threads/${threadId}/answers/create`, {
        content: content.trim(),
      });

      if (response.data.success) {
        setSuccess(true);
        console.log("Answer added successfully:", response.data);
        return {
          success: true,
          data: response.data.data,
          message: "Answer added successfully!",
        };
      } else {
        const errorMessage = response.data.message || "Failed to add answer";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to add answer";
      setError(errorMessage);
      console.error("Error adding answer:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  return {
    addAnswer,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  };
};

export const useUserAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserAnswers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/user/profile/answers`);
      setAnswers(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch user answers"
      );
      console.error("Failed to fetch user answers:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserAnswers();
  }, []);

  return {
    answers,
    loading,
    error,
    refetch: fetchUserAnswers,
  };
};

export const useGetAllAnswers = (threadId) => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchAllAnswers = async () => {
    if (!threadId) {
      setAnswers([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/threads/${threadId}/answers/all`);
      setAnswers(response.data.data);
    }
    catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch all answers"
      );
      console.error("Failed to fetch all answers:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllAnswers();
  }, [threadId]);
  return {
    answers,
    loading,
    error,
    refetch: fetchAllAnswers,
  };
}

export const useApproveAnswer = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const approveAnswer = async (threadId, answerId) => {

    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/threads/${threadId}/answers/${answerId}/approve`);
      if (response.data.success) {
        return { success: true, message: "Answer approved successfully" };
      }
      else {
        const errorMessage = response.data.message || "Failed to approve answer";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to approve answer";
      setError(errorMessage);
      console.error("Error approving answer:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };  
  return {
    approveAnswer,
    loading,
    error,
  };
}

export const useDisapproveAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const disapproveAnswer = async (threadId, answerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/threads/${threadId}/answers/${answerId}/disapprove`);
      if (response.data.success) {

        return { success: true, message: "Answer disapproved successfully" };
      }
      else {
        const errorMessage = response.data.message || "Failed to disapprove answer";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to disapprove answer";
      setError(errorMessage);
      console.error("Error disapproving answer:", err);
      return { success: false, error: errorMessage };
    }
    finally {
      setLoading(false);
    }
  };
  return {
    disapproveAnswer,
    loading,
    error,
  };
}

export const useLikeAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const likeAnswer = async (threadId , answerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/threads/${threadId}/answers/${answerId}/like`);
      if (response.data.success) {
        return { success: true, message: "Answer liked successfully" };
      }
      else {
        const errorMessage = response.data.message || "Failed to like answer";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to like answer";
      setError(errorMessage);
      console.error("Error liking answer:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  return {
    likeAnswer,
    loading,
    error,
  };
}

export const useUnlikeAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const unlikeAnswer = async (threadId, answerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/threads/${threadId}/answers/${answerId}/like`);
      if (response.data.success) {
        return { success: true, message: "Answer unliked successfully" };
      }
      else {
        const errorMessage = response.data.message || "Failed to unlike answer";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to unlike answer";
      setError(errorMessage);
      console.error("Error unliking answer:", err);
      return { success: false, error: errorMessage };
    }
    finally {
      setLoading(false);
    }
  };
  return {
    unlikeAnswer,
    loading,
    error,
  };
}

export const useDeleteAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteAnswer = async (threadId, answerId) => {
    setLoading(true); 
    setError(null);
    try {
      const response = await api.delete(`/threads/${threadId}/answers/${answerId}`);
      if (response.data.success) {
        return { success: true, message: "Answer deleted successfully" };
      }
      else {
        const errorMessage = response.data.message || "Failed to delete answer";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete answer";
      setError(errorMessage);
      console.error("Error deleting answer:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteAnswer,
    loading,
    error,
    clearError: () => setError(null),
  };
}

export const useUpdateAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateAnswer = async (threadId, answerId, content) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/threads/${threadId}/answers/${answerId}`, { content });
      if (response.data.success) {
        return { success: true, message: "Answer updated successfully", data: response.data.data };
      }
      else {
        const errorMessage = response.data.message || "Failed to update answer";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update answer";
      setError(errorMessage);
      console.error("Error updating answer:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }
  return {
    updateAnswer,
    loading,
    error,
  };
}

// hook to check if the user liked the answer
export const useCheckIfLiked = (threadId, answerId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkIfLiked = async () => {
    if (!threadId || !answerId) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/threads/${threadId}/answers/${answerId}/like`);
      if (response.data.success) {
        return response.data.data.isLiked;
      } else {
        const errorMessage = response.data.message || "Failed to check if liked";
        setError(errorMessage);
        console.error("Failed to check if liked:", errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to check if liked";
      setError(errorMessage);
      console.error("Error checking if liked:", err);
    } finally {
      setLoading(false);
    }
  };

  return { checkIfLiked, loading, error };
};
