import { useState, useEffect, useMemo } from 'react';
import { fetchNotifications } from '../services/api';
import { prioritySort } from '../utils/prioritySort';
import { Log } from '../middleware/logger';

export const useNotifications = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Limit display to 10 notifications per page
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        Log("frontend", "info", "hook", `Fetching notifications for page ${currentPage} and category ${categoryFilter}`);
        const result = await fetchNotifications(currentPage, itemsPerPage, categoryFilter);
        
        setData(result);
        setHasMore(result.length === itemsPerPage);
        
        Log("frontend", "info", "hook", `Notifications fetch success, count: ${result.length}`);
      } catch (err) {
        setError('Failed to fetch notifications. Please try again.');
        Log("frontend", "error", "hook", `Notifications fetch error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentPage, categoryFilter]);

  // Handlers
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Local search doesn't change current server page
    Log("frontend", "info", "hook", `Search filter changed to: ${term}`);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1); // Reset to first page on filter change
    Log("frontend", "info", "hook", `Category filter changed to: ${category}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    Log("frontend", "info", "hook", `Pagination changed to page ${pageNumber}`);
  };

  // Derived state: sorted and filtered notifications for the current page
  const processedNotifications = useMemo(() => {
    // 1. Filter locally for search term (since API doesn't support search text)
    const filtered = data.filter((notif) => {
      if (!searchTerm) return true;
      return notif.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
             notif.type.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // 2. Sort applying priority rules
    return prioritySort(filtered);
  }, [data, searchTerm]);

  // Determine dynamic total pages based on whether we have more data
  const totalPages = hasMore ? currentPage + 1 : currentPage;

  return {
    notifications: processedNotifications,
    totalFilteredCount: processedNotifications.length,
    isLoading,
    error,
    searchTerm,
    categoryFilter,
    currentPage,
    totalPages,
    handleSearch,
    handleCategoryFilter,
    handlePageChange,
  };
};
