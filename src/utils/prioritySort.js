export const getPriorityValue = (type) => {
  switch (type.toLowerCase()) {
    case 'placement':
      return 3;
    case 'event':
      return 2;
    case 'result':
      return 1;
    default:
      return 0;
  }
};

export const prioritySort = (notifications) => {
  return [...notifications].sort((a, b) => {
    const priorityA = getPriorityValue(a.type);
    const priorityB = getPriorityValue(b.type);
    
    // Sort by priority first (highest to lowest)
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    // If priorities are equal, sort by timestamp (newest first)
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeB - timeA;
  });
};
