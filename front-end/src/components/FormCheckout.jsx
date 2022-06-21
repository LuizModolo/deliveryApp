import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenericInput from './GenericInput';
import GenericButton from './GenericButton';
import GenericSelect from './GenericSelect';

function FormCheckout({
  seller,
  setSeller,
  address,
  setAddress,
  houseNum,
  setHouseNum,
  sellers,
  handleSubmitBtn,
}) {
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const verifyInput = (addressC, numberC) => {
    const addressMinLength = 6;
    const numberMinLength = 1;
    console.log(addressC, numberC);
    if (addressC.length >= addressMinLength
      && numberC.length >= numberMinLength) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
  };

  const handleChangeSeller = ({ target }) => {
    setSeller(target.value);
  };

  const handleChangeAddress = ({ target }) => {
    setAddress(target.value);
    verifyInput(target.value, houseNum);
  };

  const handleChangeHouseNum = ({ target }) => {
    setHouseNum(target.value);
    verifyInput(address, target.value);
  };

  return (
    <div className="flex flex-col justify-center items-start bg-slate-200 md:mx-4">
      <h2
        className="mb-6 text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
      >
        Detalhes e Endereço para Entrega
      </h2>
      <div className="flex w-full justify-center mb-6">
        <div className="flex flex-col w-full justify-center items-center">
          <p
            className="w-full rounded-l-lg px-5 py-3 border-b-2 border-gray-200
            bg-indigo-400 text-left ext-xs font-semibold text-slate-100 uppercase
            tracking-wider"
          >
            Vendedor Responsável
          </p>
          <GenericSelect
            id="customer_checkout__select-seller"
            name="seller"
            label="Seller"
            value={ seller }
            infoClass="rounded-l-lg mt-1 w-full px-5 py-2
              border border-white placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-white
              focus:z-10 sm:text-sm"
            onChange={ handleChangeSeller }
            optionsList={ sellers }
          />
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <p
            className="w-full px-5 py-3 border-b-2 border-gray-200 bg-indigo-400
            text-left ext-xs font-semibold text-slate-100 uppercase tracking-wider"
          >
            Endereço
          </p>
          <GenericInput
            id="customer_checkout__input-address"
            name="address"
            type="text"
            label="Address"
            value={ address }
            infoClass="rounded-none mt-1 w-full px-5 py-2
              border border-white placeholder-gray-500 text-gray-900 border-none
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            placeholder="Endereço"
            onChange={ handleChangeAddress }
          />
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <p
            className="w-full rounded-r-lg px-5 py-3 border-b-2 border-gray-200
            bg-indigo-400 text-left ext-xs font-semibold text-slate-100 uppercase
            tracking-wider"
          >
            Número
          </p>
          <input
            type="number"
            value={ houseNum }
            onChange={ handleChangeHouseNum }
            min="0"
            placeholder="Número"
            className="rounded-r-lg mt-1 w-full px-5 py-2 border-none
              border border-gray-300 placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
            data-testid="customer_checkout__input-addressNumber"
          />
        </div>
      </div>
      <GenericButton
        name="Finalizar Pedido"
        id="customer_checkout__button-submit-order"
        infoClassBtn="group relative w-1/3 my-2 flex justify-center self-center
        py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white
        bg-indigo-600 font-medium md:text-lg disabled:bg-indigo-400 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={ handleSubmitBtn }
        disabled={ btnIsDisabled }
      />
    </div>
  );
}

FormCheckout.propTypes = {
  seller: PropTypes.number.isRequired,
  setSeller: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  // houseNum: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ]).isRequired,
  houseNum: PropTypes.string.isRequired,
  setHouseNum: PropTypes.func.isRequired,
  handleSubmitBtn: PropTypes.func.isRequired,
  sellers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
};

export default FormCheckout;
