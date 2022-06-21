import PropTypes from 'prop-types';
import React from 'react';

export default function TableAdminManageUsers({ users, removeUser }) {
  return (
    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mb-6">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Item
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Tipo
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {
            (users).map(({ id, name, email, role }, index) => (
              <tr key={ id }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { name }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { email }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-<index>${index}` }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { role }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  className="px-5 py-4 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  <button
                    type="button"
                    id={ id }
                    onClick={ () => removeUser(id, role) }
                    className="group relative w-full h-10 flex justify-center py-2
                    px-2 border border-transparent text-sm font-medium rounded-md
                    text-white bg-red-500 disabled:bg-red-200 hover:bg-red-400
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:bg-red-300"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

TableAdminManageUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  removeUser: PropTypes.func.isRequired,
};
