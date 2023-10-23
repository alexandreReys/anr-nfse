import { useState, useEffect } from 'react';

export const useFilteredUsers = (searchTerm: string, users: any[], delay: number) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const lowercasedDebouncedSearchTerm = debouncedSearchTerm.toLowerCase();
      const filtered = users.filter(user => user.firstName.toLowerCase().includes(lowercasedDebouncedSearchTerm));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [debouncedSearchTerm, users]);

  return { filteredUsers, debouncedSearchTerm };
};
