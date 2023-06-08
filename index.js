const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
} = require('./iss');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.error('Error fetching IP:', error);
      callback(error, null);
      return;
    }

    console.log('IP:', ip);

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.error('Error fetching coordinates:', error);
        callback(error, null);
        return;
      }

      console.log('Coordinates:', coords);

      fetchISSFlyOverTimes(coords, (error, flyoverTimes) => {
        if (error) {
          console.error('Error fetching flyover times:', error);
          callback(error, null);
          return;
        }

        console.log('Flyover Times:', flyoverTimes);

        callback(null, flyoverTimes);
      });
    });
  });
};

nextISSTimesForMyLocation((error, flyoverTimes) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Flyover Times:', flyoverTimes);
  }
});
