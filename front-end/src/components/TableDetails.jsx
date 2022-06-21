import React from 'react';
import PropTypes from 'prop-types';

export default function TableDetails({ orders, role }) {
  const fId = 'customer_order_details__element-order-table-item-number-';
  const dataPrice = 'customer_order_details__element-order-table-sub-total-';

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

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
          </tr>
        </thead>
        <tbody>
          {
            (orders).map((e, i) => (
              <tr key={ e.id }>
                <td
                  data-testid={ `${fId}${i}` }
                  className="px-5 py-3 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { i + 1 }

                </td>
                <td
                  data-testid={ `${role}_order_details__element-order-table-name-${i}` }
                  className="px-5 py-3 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { e.name }

                </td>
                <td
                  data-testid={
                    `${role}_order_details__element-order-table-quantity-${i}`
                  }
                  className="px-5 py-3 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { e.SaleProduct.quantity }

                </td>
                <td
                  data-testid={ `${dataPrice}${i}` }
                  className="px-5 py-3 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { convertPrice((+e.price).toFixed(2)) }

                </td>
                <td
                  data-testid={
                    `${role}_order_details__element-order-total-price-${i}`
                  }
                  className="px-5 py-3 border-b border-gray-300 bg-slate-100 text-sm"
                >
                  { convertPrice((e.SaleProduct.quantity * +e.price).toFixed(2)) }

                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

TableDetails.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  })).isRequired,
  role: PropTypes.string.isRequired,
};
