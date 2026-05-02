import React from 'react';
import NotificationCard from '../NotificationCard/NotificationCard';
import styles from './NotificationList.module.css';

const NotificationList = ({ notifications, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className={styles.stateContainer}>
        <div className={styles.spinner}></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className={styles.stateContainer}>
        <div className={styles.emptyIcon}>📭</div>
        <p>No notifications found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {notifications.map((notif) => (
        <NotificationCard key={notif.id} notification={notif} />
      ))}
    </div>
  );
};

export default NotificationList;
