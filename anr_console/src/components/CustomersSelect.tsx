import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '@/context/authContext/AuthContext';
import * as Customers from '@/store/reducers/customersSlice';

const CustomerSelect = ({ register, handleKeyDown, labelStyles, inputStyles }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { customers, status } = useSelector((state) => state.customers);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user && !isLoaded) {
      dispatch(Customers.listCustomers(user.organizationId))
        .then(() => setIsLoaded(true));
    }
  }, [user, isLoaded, dispatch]);

  if (status === 'loading') {
    return <div>Carregando clientes...</div>;
  }

  if (status === 'failed') {
    return <div>Erro ao carregar clientes.</div>;
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <label htmlFor="clientes" className={labelStyles}>Cliente:</label>
        <select {...register('serviceOrder.customerId')} onKeyDown={handleKeyDown} className={inputStyles}>
          <option key="" value="" disabled>Selecione um Cliente</option>
          {
            customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
};

export default CustomerSelect;
