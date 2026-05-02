import React from 'react';
import styles from './NotificationCard.module.css';

const NotificationCard = ({ notification }) => {
  const { type, message, timestamp } = notification;

  // Function to format the timestamp
  const formatTime = (timeString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(timeString).toLocaleDateString('en-US', options);
  };

  const typeClass = type ? type.toLowerCase() : '';

  return (
    <div className={`${styles.card} ${styles[typeClass]}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={`${styles.badge} ${styles[typeClass]}`}>{type}</span>
          <span className={styles.time}>{formatTime(timestamp)}</span>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
