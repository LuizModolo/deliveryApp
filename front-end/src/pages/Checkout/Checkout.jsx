import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import FormCheckout from '../../components/FormCheckout';
import { getSellers, postNewSales } from '../../services/api';
import TableCheckout from '../../components/TableCheckout';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState(2);
  const [address, setAddress] = useState('');
  const [houseNum, setHouseNum] = useState('');
  const [cartList, setCartList] = useState([]);
  const [userName, setUserName] = useState('');
  const [finalSaleProducts, setFinalSaleProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const valitadeUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      localStorage.clear();
      navigate('/login');
    }
    const allSellers = await getSellers(user.token);
    if (!allSellers[0]) {
      localStorage.clear();
      navigate('/login');
    }
    setUserName(user.name);
    return allSellers;
  };

  const priceSum = (filteredList) => filteredList.reduce((acc, curr) => (
    (curr.quantity * +curr.price) + acc), 0);

  const getAllSellers = async () => {
    const sellersList = await valitadeUser();
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length === 0) {
      navigate('/customer/products');
    }
    const filteredList = cart.filter((e) => e.quantity > 0);
    setSellers(sellersList);
    setCartList(cart);
    setFinalSaleProducts([...filteredList]);
    setTotalPrice(priceSum(filteredList).toFixed(2));
  };

  const removeProduct = ({ target }) => {
    const { id } = target;
    const lista = [...cartList];
    const productId = lista.findIndex((e) => e.id === +id);
    lista[productId].quantity = 0;
    setCartList([...lista]);
    const filteredList = lista.filter((e) => e.quantity > 0);
    setFinalSaleProducts([...filteredList]);
    localStorage.setItem('cart', JSON.stringify(lista));
    setTotalPrice(priceSum(filteredList).toFixed(2));
  };

  const handleSubmitBtn = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (seller === 0) {
      return toast.error('Favor selecionar um vendedor', { position: 'top-center' });
    }
    const salesData = {
      userId: userId.id,
      sellerId: seller,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: (Number(houseNum)).toString(),
      products: finalSaleProducts
        .map((p) => ({ productId: p.id, quantity: p.quantity })),
    };
    const response = await postNewSales(user.token, salesData);
    if (response.error) {
      setErrorMessage(true);
      return 'fail';
    }
    setErrorMessage(false);
    localStorage.setItem('cart', JSON.stringify([]));
    navigate(`/customer/orders/${response.id}`);
  };

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  useEffect(() => {
    getAllSellers();
  }, []);

  const buttons = [
    { name: 'Produtos',
      role: 'customer/products',
      dataId: 'customer_products__element-navbar-link-products' },
    { name: 'Meus pedidos',
      role: 'customer/orders',
      dataId: 'customer_products__element-navbar-link-orders' },
  ];

  return (
    <div className="flex flex-col bg-slate-200">
      <Header buttons={ buttons } userName={ userName } />
      <section className="flex flex-col items-center w-full min-h-[calc(100vh-86px)]">
        <div
          className="flex flex-col py-16 px-4 sm:px-6 lg:px-8 w-9/12"
        >
          <div className="flex mb-6 justify-start bg-slate-200 md:mx-4">
            <h2
              className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
            >
              Finalizar pedido
            </h2>
          </div>
          <div className="flex flex-col justify-center items-end mb-16">
            <TableCheckout
              orders={ finalSaleProducts }
              removeProduct={ removeProduct }
            />
            <h3
              data-testid="customer_checkout__element-order-total-price"
              className="px-8 py-3 border border-transparent font-medium
              rounded-md text-black bg-slate-300 md:py-4
              md:text-lg md:px-10 shadow-md rounded-lg overflow-hidden"
            >
              Total: R$
              {' '}
              { convertPrice(totalPrice) }
            </h3>
          </div>
          <FormCheckout
            seller={ seller }
            setSeller={ setSeller }
            address={ address }
            setAddress={ setAddress }
            houseNum={ houseNum }
            setHouseNum={ setHouseNum }
            sellers={ sellers }
            handleSubmitBtn={ handleSubmitBtn }
          />
          {errorMessage
            && (
              <div
                className="w-1/2 text-center border-2 rounded-md border-amber-800 py-2"
              >
                <p
                  data-testid="common_register__element-invalid_register"
                  className="text-amber-800 text-sm font-medium"
                >
                  Pedido não realizado, tente novamente!
                </p>
              </div>)}
        </div>
        <ToastContainer />

      </section>
    </div>
  );
}

export default Checkout;
