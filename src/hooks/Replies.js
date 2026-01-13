import { useState, useEffect } from "react";
import api from "@/lib/api";


// hook to get all the replies of an answer
export const useGetAllReplies = (threadId, answerId) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllReplies = async () => {
    if (!threadId || !answerId) {
      setReplies([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/threads/${threadId}/answers/${answerId}/replies/all`);
      console.log("Fetched replies:", response.data);
      setReplies(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch all replies"
      );

      console.error("Failed to fetch all replies:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllReplies();
  }, [threadId, answerId]);

  return {
    replies,
    loading,
    error,
    refetch: fetchAllReplies,
  };
}
// hook to add a reply to an answer or a reply , we pass the content and the parent_id in the body
export const useAddReply = (threadId, answerId, content, parentId ) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addReply = async () => {
    if (!threadId || !answerId || !content) {
      setError("Thread ID, Answer ID and content are required");
      return { success: false, error: "Thread ID, Answer ID and content are required" };
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // if the parent id is null we set the parent id to be the answer id
      const response = await api.post(`/threads/${threadId}/answers/${answerId}/replies/create`, {
        content: content.trim(),
        parent_id: parentId || null
      });
      if (response.data.success) {
        setSuccess(true);
        console.log("Reply added successfully:", response.data);
        return {
          success: true,
          data: response.data.data,
          message: "Reply added successfully!",
        };
      }
      else {
        const errorMessage = response.data.message || "Failed to add reply";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to add reply";
      setError(errorMessage);
      console.error("Error adding reply:", err);
      return { success: false, error: errorMessage };
    }
    finally {
      setLoading(false);
    } 

  };
  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);
  return {
    addReply,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  };
}
// hook to delete a reply
export const useDeleteReply = (threadId, answerId, replyId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteReply = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/threads/${threadId}/answers/${answerId}/replies/${replyId}`);
      if (response.data.success) {
        console.log("Reply deleted successfully:", response.data);
        return {
          success: true,
          message: "Reply deleted successfully!",
        };
      } else {
        const errorMessage = response.data.message || "Failed to delete reply";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete reply";
      setError(errorMessage);
      console.error("Error deleting reply:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteReply,
    loading,
    error,
  };
};
// hook to update a reply
export const useUpdateReply = (threadId, answerId, replyId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateReply = async (content) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/threads/${threadId}/answers/${answerId}/replies/${replyId}`, { content });
      if (response.data.success) {
        console.log("Reply updated successfully:", response.data);
        return {  success: true, message: "Reply updated successfully", data: response.data.data };
      } else {
        const errorMessage = response.data.message || "Failed to update reply";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =

        err.response?.data?.message || err.message || "Failed to update reply";
      setError(errorMessage);

      console.error("Error updating reply:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }

  };
  return {
    updateReply,
    loading,
    error,
  };
}

// hook to like a reply 
export const useLikeReply = (threadId, answerId, replyId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const likeReply = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/threads/${threadId}/answers/${answerId}/replies/${replyId}/like`);
      if (response.data.success) {
        return { success: true, message: "Reply liked successfully" };
      } else {
        const errorMessage = response.data.message || "Failed to like reply";
        setError(errorMessage);

        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to like reply";
      setError(errorMessage);
      console.error("Error liking reply:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }
  return {
    likeReply,
    loading,
    error,
  };
}

// hook to unlike a reply
export const useUnlikeReply = (threadId, answerId, replyId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const unlikeReply = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/threads/${threadId}/answers/${answerId}/replies/${replyId}/like`);
      if (response.data.success) {
        return { success: true, message: "Reply unliked successfully" };
      } else {
        const errorMessage = response.data.message || "Failed to unlike reply";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to unlike reply";
      setError(errorMessage);
      console.error("Error unliking reply:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  return {
    unlikeReply,
    loading,
    error,
  };
};

// hook to check if the user liked the reply
export const useCheckIfLikedReply = (threadId, answerId, replyId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const checkIfLikedReply = async () => {
    if (!threadId || !answerId || !replyId) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/threads/${threadId}/answers/${answerId}/replies/${replyId}/like`);
      if (response.data.success) {
        return response.data.data.isLiked;
      } else {
        const errorMessage = response.data.message || "Failed to check if liked";
        setError(errorMessage);
        console.error("Failed to check if liked:", errorMessage);
      }
    }
    catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to check if liked";
      setError(errorMessage);
      console.error("Error checking if liked:", err);
    }
    finally {
      setLoading(false);
    }
  };
  return { checkIfLikedReply, loading, error };
}
