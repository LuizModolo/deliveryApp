import PropTypes from 'prop-types';
import React from 'react';

export default function TableCheckout({ orders, removeProduct }) {
  const dataId = 'customer_checkout__element-order-table-item-number-';
  const dataPrice = 'customer_checkout__element-order-table-unit-price-';

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  return (
    <div
      className="inline-block w-full shadow-md rounded-lg overflow-x-auto
      lg:overflow-hidden mb-6"
    >
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
              Descrição
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Quantidade
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Valor Unitário
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Sub-total
            </th>
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-400 text-left
              text-xs font-semibold text-slate-100 uppercase tracking-wider"
            >
              Remover item
            </th>
          </tr>
        </thead>
        <tbody>
          {
            (orders).map((e, index) => (
              <tr key={ e.id }>
                <td
                  data-testid={ `${dataId}${index}` }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { index + 1 }

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { e.name }

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { e.quantity }

                </td>
                <td
                  data-testid={ `${dataPrice}${index}` }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  R$
                  {' '}
                  {convertPrice((+e.price).toFixed(2))}

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                  className="px-5 py-5 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  R$
                  {' '}
                  { convertPrice((e.quantity * +e.price).toFixed(2)) }

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  className="px-5 py-4 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  <button
                    type="button"
                    id={ e.id }
                    onClick={ removeProduct }
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

TableCheckout.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
  removeProduct: PropTypes.func.isRequired,
};
