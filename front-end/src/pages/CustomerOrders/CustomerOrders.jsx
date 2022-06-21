import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import OrdersCard from '../../components/OrdersCard';
import { getCustomerOrders } from '../../services/api';

function CustomerOrders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [orders, setOrders] = useState([]);

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

  const getAllOrders = async () => {
    const allOrders = await getCustomerOrders(user.token, userId.id);
    setOrders(allOrders);
  };

  const CUSTOMER = 'customer';

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <div className="flex flex-col bg-slate-200">
      <Header buttons={ [productsButton, ordersButton] } userName={ user.name } />
      <section className="flex flex-col items-center w-full min-h-[calc(100vh-86px)]">
        <div
          className="flex flex-col py-16 px-4 sm:px-6 lg:px-8 w-9/12"
        >
          <div className="flex mb-6 justify-start bg-slate-200 md:mx-4">
            <h2
              className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
            >
              Resumo de pedidos
            </h2>
          </div>
          { !orders.status
            ? <OrdersCard orders={ orders } role={ CUSTOMER } />
            : <p>Nenhum produto encontrado</p> }
        </div>
      </section>
    </div>
  );
}

export default CustomerOrders;
