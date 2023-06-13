const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json')
    .then((response) => {
      const ip = JSON.parse(response).ip;
      return ip;
    });
};

const fetchCoordsByIP = (ip) => {
  return request(`http://ipwho.is/${ip}`)
    .then((response) => {
      const parsedBody = JSON.parse(response);
      if (!parsedBody.success) {
        throw new Error(`Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`);
      }
      const { latitude, longitude } = parsedBody;
      return { latitude, longitude };
    });
};

const fetchISSFlyOverTimes = (coords) => {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url)
    .then((response) => {
      const passes = JSON.parse(response).response;
      return passes;
    });
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return data;
    });
};

module.exports = { nextISSTimesForMyLocation };
