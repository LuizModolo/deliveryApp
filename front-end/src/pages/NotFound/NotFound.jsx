import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section
      className="flex items-center p-16 dark:bg-gray-900
      dark:text-gray-100 h-screen"
    >
      <div
        className="container flex flex-col items-center justify-center
        px-5 mx-auto my-8 h-screen"
      >
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>
            404
          </h2>
          <p
            className="text-2xl font-semibold md:text-3xl"
          >
            Desculpe, não encontramos esta página.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Mas não se preocupe, volte para nossa página inicial e tente entrar novamente.
          </p>
          <button
            type="submit"
            onClick={ () => navigate('/login') }
            className="px-8 py-3 font-semibold rounded dark:bg-violet-400
            dark:text-gray-900"
          >
            Volte para página inicial
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
