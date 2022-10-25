import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contexto = useMemo(() => ({
    email,
    password,
    setPassword,
    setEmail,
  }), [email, password]);

  return (
    <AppContext.Provider value={ contexto }>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape.isRequired,
};

export default AppProvider;
