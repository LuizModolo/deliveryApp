import React from 'react';
import PropTypes from 'prop-types';

const statusMapper = {
  Pendente: 'bg-red-500',
  Entregue: 'bg-green-700',
  Preparando: 'bg-yellow-500',
  'Em Trânsito': 'bg-blue-800',
};

function DetailOrderHeader({
  order,
  handleDeliveredBtn,
  handlePrepareBtn,
  handleToDeliverBtn,
  userRole,
  orderStatus,
}) {
  const handleDate = (saleDate) => {
    const dataAmericana = saleDate.split('T', 1).toString();
    const dataBrasileira = dataAmericana.split('-').reverse().join('/');
    return dataBrasileira;
  };

  console.log(orderStatus !== 'Em Trânsito');
  return (
    <div
      className="flex px-4 bg-slate-100 justify-between items-center
      shadow-md rounded-lg overflow-hidden mb-6 w-full"
    >
      <h2
        data-testid={
          `${userRole}_order_details__element-order-details-label-order-id`
        }
      >
        Pedido N:
        {' '}
        <span>
          { order.id }
        </span>
      </h2>
      { userRole === 'customer' && (
        <h3
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          Vendedor:
          {' '}
          {order.Seller.name}
        </h3>)}
      <p
        data-testid={
          `${userRole}_order_details__element-order-details-label-order-date`
        }
      >
        Feito em:
        {' '}
        {handleDate(order.saleDate)}
      </p>
      <p
        data-testid={
          `${userRole}_order_details__element-order-details-label-delivery-status`
        }
        className={ `${statusMapper[orderStatus]} text-white px-4 py-2 rounded-md` }
      >
        {orderStatus}
      </p>
      { userRole === 'customer'
        ? (
          <button
            type="button"
            onClick={ handleDeliveredBtn }
            data-testid="customer_order_details__button-delivery-check"
            className="group relative min-w-44 my-2 flex justify-center py-2 px-4
              border border-transparent text-sm font-medium rounded-md text-white
              bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            name="Delivery Button"
            disabled={ orderStatus !== 'Em Trânsito' }
          >
            Marcar como entregue
          </button>)
        : (
          <div className="flex justify-between">
            <button
              type="button"
              onClick={ handlePrepareBtn }
              data-testid="seller_order_details__button-preparing-check"
              className="group relative min-w-44 my-2 flex justify-center py-2 px-4
                border border-transparent text-sm font-medium rounded-md text-white
                bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              name="Prepare Button"
              disabled={ orderStatus !== 'Pendente' }
            >
              Preparar Pedido
            </button>
            <button
              type="button"
              onClick={ handleToDeliverBtn }
              data-testid="seller_order_details__button-dispatch-check"
              className="group relative min-w-44 my-2 flex justify-center py-2 px-4
                border border-transparent text-sm font-medium rounded-md text-white
                ml-4 bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              name="To Deliver Button"
              disabled={ orderStatus !== 'Preparando' }
            >
              Saiu para entrega
            </button>
          </div>
        )}
    </div>
  );
}

DetailOrderHeader.propTypes = {
  handleDeliveredBtn: PropTypes.func.isRequired,
  handlePrepareBtn: PropTypes.func.isRequired,
  handleToDeliverBtn: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  order: PropTypes.shape({
    id: PropTypes.string,
    Seller: PropTypes.shape({
      name: PropTypes.string,
    }),
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default DetailOrderHeader;
