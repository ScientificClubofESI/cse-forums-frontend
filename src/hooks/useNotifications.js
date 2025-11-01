import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  // Initialize Socket.io connection for real-time notifications
  useEffect(() => {
    if (!userId) return;

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5321', {
      transports: ['websocket', 'polling']
    });

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('Connected to notification server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from notification server');
    });

    // Join user room for real-time notifications
    newSocket.emit('join_user_room', userId);

    // Listen for room join confirmation
    newSocket.on('joined_room', (data) => {
      console.log('Joined notification room:', data);
    });

    // Listen for real-time notifications
    newSocket.on('new_notification', (notification) => {
      console.log('Received real-time notification:', notification);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    setSocket(newSocket);

    return () => {
      if (userId) {
        newSocket.emit('leave_user_room', userId);
      }
      newSocket.close();
    };
  }, [userId]);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5321'}/api/notifications/${userId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5321'}/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, isRead: true }
              : notification
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5321'}/api/notifications/${userId}/read-all`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, isRead: true }))
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, [userId]);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5321'}/api/notifications/${notificationId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setNotifications(prev => {
          const notification = prev.find(n => n.id === notificationId);
          const newNotifications = prev.filter(n => n.id !== notificationId);
          
          // Update unread count if deleted notification was unread
          if (notification && !notification.isRead) {
            setUnreadCount(prevCount => Math.max(0, prevCount - 1));
          }
          
          return newNotifications;
        });
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }, []);

  // Load notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications
  };
};

export default useNotifications;