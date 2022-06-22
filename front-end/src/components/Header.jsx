import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ buttons, userName }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const checkoutButton = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleClick = (rota) => navigate(`/${rota}`);

  return (
    <div
      className="bg-indigo-600 px-12 sm:px-24 md:px-48 py-6 flex
      items-center justify-between"
    >
      {' '}
      <div className="-mr-2 -my-2 lg:hidden">
        <button
          type="button"
          className="bg-white rounded-md p-2 inline-flex items-center justify-center
          text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none
          focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={ () => setOpen(!open) }
        >
          <span className="sr-only">Open menu</span>
          {/* Heroicon name: outline/menu */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={ 2 }
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        { open && (
          <div
            className="lg:hidden py-4 pr-2 flex flex-col bg-white border
            border-gray-300 rounded-lg shadow-sm absolute"
          >
            {buttons.map((e) => (
              <span key={ e.name } className="sm:ml-3">
                <button
                  type="button"
                  data-testid={ e.dataId }
                  className="inline-flex items-center px-4 py-2
                  text-sm font-medium text-gray-700 bg-white rounded-lg
                  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-indigo-500"
                  onClick={ () => handleClick(e.role) }
                >
                  {e.name}
                </button>
              </span>
            ))}
          </div>
        ) }
      </div>
      <div className="hidden mt-5 lg:flex lg:mt-0 lg:ml-4">
        {buttons.map((e) => (
          <span key={ e.name } className="sm:ml-3">
            <button
              type="button"
              data-testid={ e.dataId }
              className="inline-flex items-center px-4 py-2 border border-gray-300
              rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
              onClick={ () => handleClick(e.role) }
            >
              {e.name}
            </button>
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center lg:mt-0 lg:mr-4">
        <span className="sm:ml-3">
          <p
            className="text-md font-semibold leading-7 text-indigo-100 sm:text-lg
              sm:truncate mr-4 md:mr-8"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {userName}
          </p>
        </span>
        <span className="sm:ml-3">
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300
              rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
            onClick={ checkoutButton }
          >
            Sair
          </button>
        </span>
      </div>
    </div>
  );
}

Header.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    dataId: PropTypes.string,
  })).isRequired,
  userName: PropTypes.string.isRequired,
};

export default Header;
