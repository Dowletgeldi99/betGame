import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { register } from '../redux/thunks/auth';

const Register = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const submit = () => {
    if (!value) return;

    dispatch(register({ name: value }));
  };
  return (
    <div
      className={
        'bg-gray-700 rounded-md px-4 text-center border border-gray-600 h-full'
      }
    >
      <h2 className={'text-xl font-semibold my-20'}>Welcome</h2>
      <p className={'text-gray-400 text-xs capitalize mb-2'}>
        Please insert your name
      </p>
      <input
        className={'block w-full p-3 rounded-md bg-gray-900'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
      />
      <button
        className={
          'bg-gradient-to-r from-pink-600 via-pink-500 to-orange-600 w-full py-3 rounded-md mt-2 font-semibold'
        }
        onClick={submit}
      >
        Accept
      </button>
    </div>
  );
};

export default Register;
