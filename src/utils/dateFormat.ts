export const dateFormat = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };
  