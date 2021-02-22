import axios from 'axios';
import { SIGN_IN, SIGN_OUT, BASE_API_URL } from '../utils/constants';
import { initiateGetProfile } from './profile';
import { history } from '../router/AppRouter';
import { getErrors } from './errors';
import { post } from '../utils/api';

export const signIn = (user) => ({
  type: SIGN_IN,
  user
});

export const initiateLogin = (accountNumber, password) => {
  return async (dispatch) => {
    try {
      //const result = await axios.post(`${BASE_API_URL}/signin`, {
        const result = await axios.get(`${BASE_API_URL}/Banking_Application/account/1001`, {
          accountNumber,
        password
      });
      const user = result.data;
      localStorage.setItem('user_token', user.token);
      dispatch(signIn(user));
      dispatch(initiateGetProfile(user.email));
      history.push('/profile');
    } catch (error) {
      console.log('error', error);
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const registerNewUser = (data) => {
  return async (dispatch) => {
    try {
      //await axios.post(`${BASE_API_URL}/signup`, data);
      await axios.post(`${BASE_API_URL}/Banking_Application/customer/add`, data);
      return { success: true };
    } catch (error) {
      console.log('error', error);
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

export const signOut = () => ({
  type: SIGN_OUT
});

export const initiateLogout = () => {
  return async (dispatch) => {
    try {
      await post(`${BASE_API_URL}/logout`, true, true);
      localStorage.removeItem('user_token');
      return dispatch(signOut());
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};
