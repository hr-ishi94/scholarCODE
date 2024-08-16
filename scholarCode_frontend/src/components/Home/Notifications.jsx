import React, { useState, useEffect } from 'react';
import Loader from '../Utils/Loader'; // Ensure this path is correct
import { base_url, SOCKET } from '../../Axios/Urls/EndPoints';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { fetchNotifications, markNotifications } from '../../Axios/UserServer/UserServer';
import './Notifications.css'; // Ensure this path is correct

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const UserToken = useSelector((state) => state.UserToken);
  const AdminToken = useSelector((state) =>state.AdminToken)
  const access = UserToken.access || AdminToken.access;
  const user_id = jwtDecode(access).user_id;
  

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    getNotifications();

    const ws = new WebSocket(`${SOCKET}/notifications/${user_id}/?token=${access}`);

    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        newNotification, ...prevNotifications
      ]);
    };
    
    return () => {
      ws.close();
    };

  }, [access, user_id]);

  const markNotificationsAsRead = async () => {
    try {
      await markNotifications();
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({ ...notification, is_read: true }))
      );
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return { notifications, loading, markNotificationsAsRead ,AdminToken};
};

const Notifications = () => {
  const { notifications, loading, markNotificationsAsRead,AdminToken } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    if (notifications) {
      // Filter unread notifications
      const unread = notifications.filter(notification => !notification.is_read);
      setUnreadNotifications(unread);
    }
  }, [notifications]);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
    if (unreadNotifications.length > 0) {
      // Mark all notifications as read when dropdown is opened
      markNotificationsAsRead();
      setUnreadNotifications([]); // Clear the unread notifications count
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="notification-container">
      <Button 
        variant="" 
        className={`${AdminToken && AdminToken.access?"text-light mt-3 mx-3":'text-dark'} notification-button`} 
        onClick={handleButtonClick}
      >
        <i className="fa-solid fa-bell "></i>
        {unreadNotifications.length > 0 && (
          <span className="notification-badge px-1">{unreadNotifications.length}</span>
        )}
      </Button>

      {showDropdown && (
        <div className="notification-dropdown">
          <ul className="notification-list">
            {notifications.length === 0 ? (
              <li className="notification-item">No new notifications</li>
            ) : (
              notifications.map((notification) => (
                <li key={notification.id} className={`notification-item ${!notification.is_read ? 'unread' : ''}`}>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-timestamp text-secondary">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                  {notification.link && (
                    <a
                      href={`${base_url}media/${notification.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="notification-link"
                    >
                      View
                    </a>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
