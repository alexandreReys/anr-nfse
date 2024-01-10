import { useCallback } from 'react';
import { PencilAltIcon, TrashIcon, SearchIcon, PlusIcon, UserIcon } from '@heroicons/react/solid';
import { useServiceOrdersList } from '@/components/serviceOrders/list/useServiceOrdersList';
import { Tooltip } from 'react-tooltip'
import IconListButton from '@/components/shared/IconListButton'
import Loading from '@/components/shared/Loading'

export default function ServiceOrdersListComponent() {

  const {
    user,
    serviceOrders,
    filteredServiceOrders,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  } = useServiceOrdersList();

  const TableHeader = () => {
    return (
      <thead>
        <tr className="bg-gray-200 text-gray-800">
          <th className="px-4 py-2 text-left">Ações</th>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Description</th>
          <th className="px-4 py-2 text-left">Total</th>
        </tr>
      </thead>
    );
  };

  const TableRow = ({ serviceOrder }) => {
    return (
      <tr key={serviceOrder.id} className="border-t">
        <td className="px-4 py-2">

          <IconListButton
            tooltipId="tooltip"
            tooltipContent="Alterar"
            icon={<PencilAltIcon className="h-5 w-5 text-blue-500 inline-block mr-2 cursor-pointer" />}
            onClick={() => handleEditClick(serviceOrder)}
          />

          <IconListButton
            tooltipId="tooltip"
            tooltipContent="Deletar"
            icon={<TrashIcon className="h-5 w-5 text-red-500 inline-block mr-2 cursor-pointer" />}
            onClick={() => handleDeleteClick(serviceOrder.id)}
          />

          <Tooltip id="tooltip" />
        </td>
        <td className="text-sm px-4 py-2">{serviceOrder.id}</td>
        <td className="text-sm px-4 py-2">{serviceOrder.description}</td>
        <td className="text-sm px-4 py-2">{serviceOrder.total}</td>
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
        <h1 className="text-3xl font-bold mb-4">Lista de Ordens de Serviço</h1>

        {error && <div className="bg-red-200 text-red-700 p-3 rounded">{error}</div>}

        <div className="mb-4 relative flex">
          <PlusButton />

          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Pesquisar O.S. por cliente"
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
              Array.isArray(filteredServiceOrders) &&
              filteredServiceOrders.map((serviceOrder: any) => (
                <TableRow key={serviceOrder.id} serviceOrder={serviceOrder} />
              ))
            }

          </tbody>
        </table>
      </div>
    </>
  );
}
