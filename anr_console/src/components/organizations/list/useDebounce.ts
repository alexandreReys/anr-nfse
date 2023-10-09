import { useState, useEffect } from 'react';

export const useFilteredOrganizations = (searchTerm: string, organizations: any[], delay: number) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredOrganizations, setFilteredOrganizations] = useState<any[]>([]);

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
      const filtered = organizations.filter(organization => organization.firstName.toLowerCase().includes(lowercasedDebouncedSearchTerm));
      setFilteredOrganizations(filtered);
    } else {
      setFilteredOrganizations(organizations);
    }
  }, [debouncedSearchTerm, organizations]);

  return { filteredOrganizations, debouncedSearchTerm };
};



// import { useState, useEffect } from 'react';

// export const useFilteredOrganizations = (searchTerm: string, organizations: any[], delay: number) => {
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
//   const [filteredOrganizations, setFilteredOrganizations] = useState<any[]>([]);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [searchTerm, delay]);

//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       const filtered = organizations.filter(organization => organization.firstName.includes(debouncedSearchTerm));
//       setFilteredOrganizations(filtered);
//     } else {
//       setFilteredOrganizations(organizations);
//     }
//   }, [debouncedSearchTerm, organizations]);

//   return { filteredOrganizations, debouncedSearchTerm };
// };
