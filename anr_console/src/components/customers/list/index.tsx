import { useCallback } from 'react';
import { PencilAltIcon, TrashIcon, SearchIcon, PlusIcon, UserIcon } from '@heroicons/react/solid';
import { useCustomersList } from '@/components/customers/list/useCustomersList';
import { Tooltip } from 'react-tooltip'
import IconListButton from '@/components/shared/IconListButton'
import Loading from '@/components/shared/Loading'

export default function CustomersListComponent() {

  const {
    user,
    customers,
    filteredCustomers,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  } = useCustomersList();

  const TableHeader = () => {
    return (
      <thead>
        <tr className="bg-gray-200 text-gray-800">
          <th className="px-4 py-2 text-left">Ações</th>
          <th className="px-4 py-2 text-left">Nome</th>
          <th className="px-4 py-2 text-left">Cidade</th>
          <th className="px-4 py-2 text-left">Estado</th>
        </tr>
      </thead>
    );
  };

  const TableRow = ({ customer }) => {
    return (
      <tr key={customer.id} className="border-t">
        <td className="px-4 py-2">

          <IconListButton
            tooltipId="tooltip"
            tooltipContent="Alterar"
            icon={<PencilAltIcon className="h-5 w-5 text-blue-500 inline-block mr-2 cursor-pointer" />}
            onClick={() => handleEditClick(customer)}
          />

          <IconListButton
            tooltipId="tooltip"
            tooltipContent="Deletar"
            icon={<TrashIcon className="h-5 w-5 text-red-500 inline-block mr-2 cursor-pointer" />}
            onClick={() => handleDeleteClick(customer.id)}
          />

          <Tooltip id="tooltip" />
        </td>
        <td className="text-sm px-4 py-2">{customer.name}</td>
        <td className="text-sm px-4 py-2">{customer.city}</td>
        <td className="text-sm px-4 py-2">{customer.state}</td>
      </tr>
    );
  };

  const PlusButton = () => {
    return (
      <button
        className="mr-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleAddClick}
      >
        <PlusIcon className="h-5 w-5 inline-block" />
      </button>
    );
  };

  const SearchBarIcon = () => {
    return (
      <SearchIcon className="absolute top-2.5 right-16 h-6 w-6 text-gray-500" />
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Lista de Clientes</h1>

        {error && <div className="bg-red-200 text-red-700 p-3 rounded">{error}</div>}

        <div className="mb-4 relative flex">
          <PlusButton />

          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Pesquisar clientes por nome"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <SearchBarIcon />
        </div>

        <table className="min-w-full table-auto border-collapse">
          {status === 'ok' &&
            <TableHeader />
          }

          <tbody>
            {status === 'loading' &&
              <Loading />
            }

            {
              status === 'ok' &&
              Array.isArray(filteredCustomers) &&
              filteredCustomers.map((customer: any) => (
                <TableRow key={customer.id} customer={customer} />
              ))
            }

          </tbody>
        </table>
      </div>
    </>
  );
}
