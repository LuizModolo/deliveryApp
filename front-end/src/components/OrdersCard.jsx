import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const statusMapper = {
  Pendente: 'bg-red-500',
  Entregue: 'bg-green-700',
  Preparando: 'bg-yellow-500',
  'Em Trânsito': 'bg-blue-800',
};

function OrdersCard({ orders, role }) {
  const navigate = useNavigate();

  const handleClick = (rota, id) => navigate(`/${rota}/orders/${id}`);

  const handleDate = (saleDate) => {
    const dataAmericana = saleDate.split('T', 1).toString();
    const dataBrasileira = dataAmericana.split('-').reverse().join('/');
    return dataBrasileira;
  };

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  return (
    <div
      className="flex flex-wrap justify-center lg:justify-start mt-8"
    >
      {orders.map(
        ({ id, deliveryAddress, deliveryNumber, saleDate, status, totalPrice }) => (
          <button
            key={ id }
            type="button"
            onClick={ () => handleClick(role, id) }
            className="flex flex-col justify-evenly items-center border border-transparent
            font-medium rounded-md text-black bg-slate-300 shadow-md px-8 py-4 my-4 mx-4"
          >
            <div className="flex w-full justify-center mb-2">
              <p>Pedido</p>
              <p data-testid={ `${role}_orders__element-order-id-${id}` }>
                :
                {' '}
                {id}
              </p>
            </div>
            <p
              data-testid={ `${role}_orders__element-delivery-status-${id}` }
              className={ `mb-2 px-4 text-white rounded-md ${statusMapper[status]}` }
            >
              {status}
            </p>
            <p
              data-testid={ `${role}_orders__element-order-date-${id}` }
              className="mb-2"
            >
              Feito em
              {' '}
              {handleDate(saleDate)}
            </p>
            <p
              data-testid={ `${role}_orders__element-card-price-${id}` }
              className="text-indigo-700"
            >
              R$
              {' '}
              { convertPrice(totalPrice) }
            </p>
            {
              role === 'seller'
                ? (
                  <p
                    data-testid={ `${role}_orders__element-card-address-${id}` }
                  >
                    { `${deliveryAddress}, ${deliveryNumber}` }
                  </p>
                )
                : null
            }
          </button>
        ),
      )}
    </div>
  );
}

OrdersCard.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.number,
  })).isRequired,
  role: PropTypes.string.isRequired,
};

export default OrdersCard;
