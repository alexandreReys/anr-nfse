import { useState, useEffect } from 'react';

export const useFilteredCustomers = (searchTerm: string, customers: any[], delay: number) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);

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
      const filtered = customers.filter(customer => customer.name.toLowerCase().includes(lowercasedDebouncedSearchTerm));
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [debouncedSearchTerm, customers]);

  return { filteredCustomers, debouncedSearchTerm };
};
