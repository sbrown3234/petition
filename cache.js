(function() {
  const redis = require('redis');

  var client = redis.createClient({
    host: 'localhost',
    port: 6379
  });

  client.on('error', (err) => {
    console.log('client err: ', err);
  })


  exports.del = (key) => {
    return new Promise ((resolve, reject) => {
      client.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }

  exports.get = (key) => {
    return new Promise ((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          console.log('get err: ', err)
          reject(err)
        } else {
          resolve(JSON.parse(data));
        }
      })
    })
  }

  exports.set = (key, value) => {
    return new Promise ((resolve, reject) => {
      client.set(key, JSON.stringify(value), (err, data) => {
        if (err) {
          console.log('set err: ', err);
          reject(err);
        } else {
          resolve(data)
        }
      })
    })
  }


exports.setex = (key, time, value) => {
  return new Promise ((resolve, reject) => {
    client.setex(key, time, JSON.stringify(value), (err, data) => {
      if (err) {
        console.log('setex err: ', err);
      } else {
        resolve(data);
      }
    })
  })
}

})()
