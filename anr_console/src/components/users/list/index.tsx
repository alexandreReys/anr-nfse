import { useCallback } from 'react';
import { PencilAltIcon, TrashIcon, SearchIcon, PlusIcon, UserIcon } from '@heroicons/react/solid';
import { useUsersList } from '@/components/users/list/useUsersList';
import { Tooltip } from 'react-tooltip'
import IconListButton from '@/components/shared/IconListButton'
import Loading from '@/components/shared/Loading'

export default function UsersListComponent() {

  const {
    users,
    filteredUsers,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    organizationId,
    organizationName,
  } = useUsersList();

  const TableHeader = () => {
    return (
      <thead>
        <tr className="bg-gray-200 text-gray-800">
          <th className="px-4 py-2 text-left">Ações</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Nome</th>
          <th className="px-4 py-2 text-left">Sobrenome</th>
          <th className="px-4 py-2 text-left">Role</th>
        </tr>
      </thead>
    );
  };

  const TableRow = ({ user }) => {
    return (
      <tr key={user.id} className="border-t">
        <td className="px-4 py-2">

          <IconListButton
            tooltipId="Tooltip"
            tooltipContent="Alterar"
            icon={<PencilAltIcon className="h-5 w-5 text-blue-500 inline-block mr-2 cursor-pointer" />}
            onClick={() => handleEditClick(user)}
          />

          <IconListButton
            tooltipId="Tooltip"
            tooltipContent="Deletar"
            icon={<TrashIcon className="h-5 w-5 text-red-500 inline-block mr-2 cursor-pointer" />}
            onClick={() => handleDeleteClick(user.id)}
          />

          <Tooltip id="Tooltip" />
        </td>
        <td className="text-sm px-4 py-2">{user.email}</td>
        <td className="text-sm px-4 py-2">{user.firstName}</td>
        <td className="text-sm px-4 py-2">{user.lastName}</td>
        <td className="text-sm px-4 py-2">{user.role}</td>
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
        <h1 className="text-2xl font-bold mb-4  text-blue-900"></h1>
        <h1 className="text-3xl font-bold mb-4">Lista de Usuários - {organizationName}</h1>

        {error && <div className="bg-red-200 text-red-700 p-3 rounded">{error}</div>}

        <div className="mb-4 relative flex">
          <PlusButton />

          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Pesquisar usuários por nome"
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
              Array.isArray(filteredUsers) &&
              filteredUsers.map((user: any) => (
                <TableRow key={user.id} user={user} />
              ))
            }

          </tbody>
        </table>
      </div>
    </>
  );
}
