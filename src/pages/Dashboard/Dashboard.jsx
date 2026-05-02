import React, { useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { logger } from '../../middleware/logger';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import NotificationList from '../../components/NotificationList/NotificationList';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { 
    notifications, 
    isLoading, 
    error,
    searchTerm,
    categoryFilter,
    currentPage,
    totalPages,
    handleSearch,
    handleCategoryFilter,
    handlePageChange
  } = useNotifications();

  useEffect(() => {
    logger.logInfo('DASHBOARD_MOUNTED', { message: 'Dashboard component loaded' });
    
    return () => {
      logger.logInfo('DASHBOARD_UNMOUNTED', { message: 'Dashboard component unloaded' });
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Notifications</h1>
      </header>
      
      <main className={styles.content}>
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          categoryFilter={categoryFilter}
          onCategoryChange={handleCategoryFilter}
        />
        
        <NotificationList 
          notifications={notifications}
          isLoading={isLoading}
          error={error}
        />
        
        {!isLoading && !error && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
