import { useState, useEffect } from 'react';

export const useFilteredServices = (searchTerm: string, services: any[], delay: number) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

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
      const filtered = services.filter(service => service.description.toLowerCase().includes(lowercasedDebouncedSearchTerm));
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  }, [debouncedSearchTerm, services]);

  return { filteredServices, debouncedSearchTerm };
};
