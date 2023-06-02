export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    payload: {
      token: token,
    },
  };
};


export const setAdmin = (admin) => {
  return {
    type: 'SET_ADMIN',
    payload: {
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
    },
  };
};

export const clearAdmin = () => {
  return {
    type: 'CLEAR_ADMIN',
  };
};
