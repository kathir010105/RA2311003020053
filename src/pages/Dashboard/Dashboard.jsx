import React, { useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { Log } from '../../middleware/logger';
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
    Log('frontend', 'info', 'page', 'Dashboard component loaded');
    
    return () => {
      Log('frontend', 'info', 'page', 'Dashboard component unloaded');
    };
  }, []);

  return (
    <div className={styles.appContainer}>

      {/* Main Dashboard Content */}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Notifications</h1>
            <p className={styles.subtitle}>Welcome back. Here are your latest updates.</p>
          </div>
          
          <div className={styles.headerRight}>
            <SearchFilter 
              searchTerm={searchTerm}
              onSearchChange={handleSearch}
              categoryFilter={categoryFilter}
              onCategoryChange={handleCategoryFilter}
            />
          </div>
        </header>
        
        <main className={styles.contentBody}>
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
    </div>
  );
};

export default Dashboard;
