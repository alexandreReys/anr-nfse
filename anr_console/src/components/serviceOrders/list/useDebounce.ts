import { useState, useEffect } from 'react';

export const useFilteredServiceOrders = (searchTerm: string, serviceOrders: any[], delay: number) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredServiceOrders, setFilteredServiceOrders] = useState<any[]>([]);

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
      const filtered = serviceOrders.filter(serviceOrder => serviceOrder.name.toLowerCase().includes(lowercasedDebouncedSearchTerm));
      setFilteredServiceOrders(filtered);
    } else {
      setFilteredServiceOrders(serviceOrders);
    }
  }, [debouncedSearchTerm, serviceOrders]);

  return { filteredServiceOrders, debouncedSearchTerm };
};
