import React from 'react';
import styles from './NotificationCard.module.css';

const NotificationCard = ({ notification }) => {
  const { type, message, timestamp } = notification;

  // Format date
  const dateObj = new Date(timestamp);
  const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  // Priority class mapping
  const typeClass = type.toLowerCase();

  return (
    <div className={styles.card}>
      <div className={`${styles.indicator} ${styles[typeClass]}`} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={`${styles.badge} ${styles[typeClass]}`}>{type}</span>
          <span className={styles.time}>{dateString} • {timeString}</span>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
