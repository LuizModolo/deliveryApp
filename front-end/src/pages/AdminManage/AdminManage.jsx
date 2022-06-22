import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TableAdminManageUsers from '../../components/TableAdminManageUsers';
import Header from '../../components/Header';
import { deleteUser, getUsers, postUserAdmin } from '../../services/api';
import FormAdminRegisterUsers from '../../components/FormAdminRegisterUsers';
import 'react-toastify/dist/ReactToastify.css';

function AdminManage() {
  const [users, setUsers] = useState([]);
  const [removedUser, setRemovedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Selecione');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  const manageUserButton = {
    name: 'Gerenciar Usuários',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'admin/manage',
  };

  const getAllUsers = async () => {
    const allUsers = await getUsers(user.token);
    const allUsersFiltered = allUsers.filter((e) => e.role !== 'administrator');
    const usersList = allUsersFiltered.map((e) => (
      e.role === 'customer'
        ? { ...e, role: 'Cliente' } : { ...e, role: 'P. Vendedora' }
    ));
    setUsers(usersList);
    setRemovedUser(false);
  };

  const removeUser = async (id, roleUser) => {
    if (roleUser !== 'administrator' || id !== 1) {
      await deleteUser(user.token, id);
      setRemovedUser(true);
    }
  };

  const INVALID = 409;

  const handleSubmitBtn = async () => {
    const userData = {
      name,
      email,
      password,
      role,
    };

    const response = await postUserAdmin(user.token, userData);
    if (response.status === INVALID) {
      setErrorMessage(true);
      return toast.error('Email já cadastrado!', { position: 'top-right' });
    }
    setErrorMessage(false);
    getAllUsers();
    setName('');
    setEmail('');
    setPassword('');
    setRole('Selecione');
    setBtnIsDisabled(true);
  };

  useEffect(() => {
    getAllUsers();
  }, [removedUser]);

  return (
    <div className="flex flex-col bg-slate-200">
      <Header buttons={ [manageUserButton] } userName={ user.name } />
      <section className="flex flex-col items-center w-full min-h-[calc(100vh-86px)]">
        <div
          className="flex flex-col items-center justify-center w-full"
        >
          <FormAdminRegisterUsers
            name={ name }
            setName={ setName }
            email={ email }
            setEmail={ setEmail }
            password={ password }
            setPassword={ setPassword }
            role={ role }
            setRole={ setRole }
            handleSubmitBtn={ handleSubmitBtn }
            btnIsDisabled={ btnIsDisabled }
            setBtnIsDisabled={ setBtnIsDisabled }
          />
        </div>
        {errorMessage
            && (
              <div
                className="w-1/2 text-center border-2 rounded-md border-amber-800 py-2"
              >
                <p
                  data-testid="admin_manage__element-invalid-register"
                  className="text-amber-800 text-sm font-medium"
                >
                  Cadastro não registrado, tente novamente!
                </p>
              </div>)}
        <div className="flex flex-col py-2 px-4 sm:px-6 lg:px-8 w-11/12 md:w-9/12">
          <div className="flex mb-6 justify-start bg-slate-200 md:mx-4">
            <h1
              className="text-2xl md:text-3xl font-medium tracking-tight text-gray-700"
            >
              Lista de usuários
            </h1>
          </div>
          <div className="flex flex-col justify-center items-end mb-16">
            {!users.status
              ? <TableAdminManageUsers users={ users } removeUser={ removeUser } />
              : <p>Nenhum usuário encontrado</p>}
          </div>
          <ToastContainer />
        </div>

      </section>
    </div>
  );
}

export default AdminManage;
