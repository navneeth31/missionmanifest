import React from 'react';
import { useNavigate } from 'react-router-dom';

const checkTokenAndRedirect = (Component) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Assuming your token is stored in localStorage, you can change this as per your setup

  const WrapperComponent = (props) => {
    const navigate = useNavigate();

    if (!isLoggedIn) {
      // Redirect to the login page if the token doesn't exist
      return navigate('/login');
    } else {
      // Render the original component if the token exists
      alert("hello");
      return <Component {...props} />;
    }
  };

  return WrapperComponent;
};

export default checkTokenAndRedirect;
