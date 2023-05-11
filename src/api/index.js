const apiHost = 'http://plantaapi-env.eba-pgfbst4z.us-east-1.elasticbeanstalk.com/';

const mkUrl = (path) => `${apiHost}${path}`;

function post (path) {
  const url = mkUrl(path);
  return function (args) {
    console.trace(`POST ${url}`, args);
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(args),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  };
}

function authGet (path) {
  const url = mkUrl(path);
  return function (args) {
    console.trace(`GET ${url}`, args);
    const { token } = args;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    }).then(res => res.json());
  };
}

function catchError (err) {
  console.error(err);
  return Promise.reject(err);
}

////////////////////////////////////////////////////////////////////////////////

export function login ({ username, password }) {
  return post('user/login')({ username, password })
    .then(({ token, reason }) => ({ token, reason, username }))
    .catch(catchError);
}

export function register ({ username, password }) {
  return post('user/create')({ username, password })
    .then(({ created }) => ({ created }))
    .catch(catchError);
}

export function getPlants ({ token }) {
  if (!token) throw new Error('No token');
  return authGet('plant')({ token })
    .then(({ plants }) => ({ plants }))
    .catch(catchError);
}

export function getDataKinds ({ token, pID }) {
  if (!token) throw new Error('No token');
  if (!pID) throw new Error('No plant ID');
  return authGet(`plant/dataKinds/${pID}`)({ token })
    .then(({ kinds }) => ({ kinds }))
    .catch(catchError);
}

export function getData ({ token, pID, kID }) {
  if (!token) throw new Error('No token');
  if (!pID) throw new Error('No plant ID');
  if (!kID) throw new Error('No data kind ID');
  return authGet(`plant/data/${pID}/${kID}`)({ token })
    .then(({ data }) => ({ data }))
    .catch(catchError);
}

export default {
  login,
  register,
  getPlants,
  getDataKinds,
  getData,
};
