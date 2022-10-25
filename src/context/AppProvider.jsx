import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [radio, setRadio] = useState('');
  const [radioview, setRadioview] = useState(false);

  const handleRadio = ({ target }) => {
    setRadio(target.value);
  };

  const handleRadioview = useCallback(() => {
    setRadioview(!radioview);
  }, [radioview]);

  const contexto = useMemo(() => ({
    email,
    password,
    setPassword,
    setEmail,
    radio,
    handleRadio,
    radioview,
    handleRadioview,
  }), [email, password, radio, radioview, handleRadioview]);

  return (
    <AppContext.Provider value={ contexto }>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape.isRequired,
};

export default AppProvider;
