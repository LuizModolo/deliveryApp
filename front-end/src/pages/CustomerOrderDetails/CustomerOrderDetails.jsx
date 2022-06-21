import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import TableDetails from '../../components/TableDetails';
import {
  getOrderDetails,
  patchDelivered,
  patchPrepare,
  patchToDeliver,
} from '../../services/api';
import DetailOrderHeader from '../../components/DetailOrderHeader';

function CustomerOrderDetails() {
  const navigate = useNavigate();
  const searchParams = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [orderStatus, setOrderStatus] = useState('');
  const [order, setOrder] = useState({
    id: '',
    Seller: { name: '' },
    saleDate: '',
    Products: [],
    totalPrice: '',
    status: '',
  });

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };
  const getOrderInfo = async () => {
    if (!user) {
      localStorage.clear();
      navigate('/login');
    }
    const orderInfo = await getOrderDetails(user.token, searchParams.id);
    if (orderInfo.statusText) {
      navigate('/notfound');
      // console.log(orderInfo);
    }
    setOrder(orderInfo);
    setOrderStatus(orderInfo.status);
    return orderInfo;
  };

  const handleDeliveredBtn = async () => {
    await patchDelivered(user.token, searchParams.id);
    setOrderStatus('Entregue');
  };

  const handlePrepareBtn = async () => {
    await patchPrepare(user.token, searchParams.id);
    setOrderStatus('Preparando');
  };

  const handleToDeliverBtn = async () => {
    await patchToDeliver(user.token, searchParams.id);
    setOrderStatus('Em Trânsito');
  };

  const productsButton = {
    name: 'Produtos',
    dataId: 'customer_products__element-navbar-link-products',
    role: 'customer/products',
  };
  const ordersButton = {
    name: 'Meus Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'customer/orders',
  };
  const sellerOrdersButton = {
    name: 'Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'seller/orders',
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div className="flex flex-col bg-slate-200">
      <Header
        buttons={ user.role === 'seller'
          ? [sellerOrdersButton]
          : [productsButton, ordersButton] }
        userName={ user.name }
      />
      <section className="flex flex-col items-center w-full min-h-[calc(100vh-86px)]">
        <div
          className="flex flex-col py-16 px-4 sm:px-6 lg:px-8 w-9/12"
        >
          <div className="flex mb-6 justify-start bg-slate-200 md:mx-4">
            <h1
              className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
            >
              Detalhes do Pedido
            </h1>
          </div>
          <div className="flex flex-col justify-center items-end mb-16">
            <DetailOrderHeader
              order={ order }
              handleDeliveredBtn={ handleDeliveredBtn }
              userRole={ user.role }
              handlePrepareBtn={ handlePrepareBtn }
              handleToDeliverBtn={ handleToDeliverBtn }
              orderStatus={ orderStatus }
            />
            <TableDetails orders={ order.Products } role={ user.role } />
            <div
              data-testid={ `${user.role}_order_details__element-order-total-price` }
              className="px-8 py-3 border border-transparent font-medium
              rounded-md text-black bg-slate-300 md:py-4
              md:text-lg md:px-10 shadow-md rounded-lg overflow-hidden"
            >
              Total: R$
              {' '}
              { convertPrice(order.totalPrice) }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomerOrderDetails;
