
export const getUsers = (page) => {
  return fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
    .then(response => {
      return response.json()
        .then(data => {
          if (data.success) {
            return data.users;
          } else {
            return null;
          }
        });
    });
};

export const getPositions = () => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
    .then(response => {
      return response.json()
        .then(result => {
          if (result.success) {
            return result.positions;
          } else {
            return null;
          }
        });
    });
};

export const getToken = () => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .then(response => {
      return response.json()
        .then(res => {
          if (res.success) {
            return res.token;
          } else {
            return null;
          }
        });
    });
};

export const createUser = (body, token) => {
  fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
    method: 'POST',
    body,
    headers:
      { Token: token }
  })
    .then(response => {
      return response.json()
        .then(data => {
          if (data.success) {
            return 'Success';
          } else {
            console.log(data);
          }
        })
        .catch(er => {
          console.log(er);
        });
    });
};
