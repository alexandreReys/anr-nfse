// pages/ListaMotoristas.tsx

import { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon, SearchIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function ListaMotoristas() {
  const [motoristas, setMotoristas] = useState<any>([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMotoristas, setFilteredMotoristas] = useState<any>([])
  const router = useRouter();

  const handleEditClick = () => {
    router.push('/Motoristas');
  };

  useEffect(() => {
    // fetch('URL_DA_SUA_API_AQUI')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Erro ao buscar dados');
    //     }
    //     return response.json();
    //   })
    //   .then(data => setMotoristas(data))
    //   .catch(err => setError(err.message));

    setMotoristas([
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'}, 
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'}, 
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'},
      {nome: 'Airton', sobrenome: 'Senna', telefone: '(11)98765-1234', email: 'airtonsena@gmail.com'}, 
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Motoristas</h1>

      {error && <div className="bg-red-200 text-red-700 p-3 rounded">{error}</div>}

      <div className="mb-4 relative flex">
        <button 
            className="mr-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleEditClick}
        >
        <PlusIcon className="h-5 w-5 inline-block" />
        </button>
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Procurar motorista..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="absolute top-2.5 right-16 h-6 w-6 text-gray-500" />
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="px-4 py-2 text-left">Ações</th>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">Sobrenome</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {motoristas.map((motorista: any) => (
            <tr key={motorista.id} className="border-t">
              <td className="px-4 py-2">
                <PencilAltIcon 
                  className="h-5 w-5 text-blue-500 inline-block mr-2 cursor-pointer" 
                  onClick={handleEditClick} 
                />
                <TrashIcon 
                  className="h-5 w-5 text-red-500 inline-block cursor-pointer" 
                  onClick={() => {}} 
                />
              </td>
              <td className="px-4 py-2">{motorista.nome}</td>
              <td className="px-4 py-2">{motorista.sobrenome}</td>
              <td className="px-4 py-2">{motorista.email}</td>
              <td className="px-4 py-2">{motorista.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
