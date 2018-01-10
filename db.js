(function(){
  var spicedPg = require('spiced-pg');
  var db = spicedPg('postgres:postgres:postgres@localhost:5432/petition');
  var bcrypt = require('bcryptjs');

  exports.newSign = (data, id) => {
    const params = [data, id];
    const q = `INSERT INTO petition (signature, user_id) VALUES ($1, $2) RETURNING id;`;
    return db.query(q, params).then((results) => {
          return results.rows[0].id;
        })
  };

  exports.newUser = (data, id) => {
    const params = [data.first, data.last, data.username];
    const q = `INSERT INTO users (first, last, username) VALUES ($1, $2, $3) RETURNING id;`;
    return db.query(q, params).then((results) => {
          return results.rows[0].id;
        }).catch((err) =>
      console.log('registration insert err: ', err))
  };

  exports.hashPassword = (userPassword, id) => {
    return new Promise((resolve, reject) => {
      const q = `UPDATE users SET hashed_pass = $1 WHERE id = $2 RETURNING hashed_pass`;
      const params = [];
      bcrypt.genSalt((err, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(userPassword, salt, (err, hash) => {
          if (err) {
            return reject(err);
          }
          params.push(hash);
          params.push(id);
          db.query(q, params).then((results) => {
            return resolve(results.rows[0].hashed_pass);
          }).catch((err) => {
            console.log('hashPass err:', err)
          })
        })
      })
    })
  }

  exports.newProfile = (data, id) => {
    const q = `INSERT INTO user_profiles (user_id, age, city, state, country, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id;`;
    const params = [id, data.age, data.city, data.state, data.country, data.url];
    return db.query(q,params)
  }

  exports.checkPassword = (textEntered, hashedPass) => {
    return new Promise ((resolve, reject) => {
      bcrypt.compare(textEntered, hashedPass, (err, doesMatch) => {
        if(err) {
          reject(err);
        }
        resolve(doesMatch);
      })
    })
  }

  exports.checkUsername = (enterUser) => {
    const q = `SELECT * FROM users WHERE username = $1;`
    const params = [enterUser];
    return db.query(q, params).then((results) => {
          return results.rows[0];
    }).catch((err) =>{
      console.log('username check err: ', err);
    })

  }

  exports.getSig = (id) => {
      const q = `SELECT signature FROM petition WHERE id=$1`
      const params = [id];
    return  db.query(q, params).then((results) => {
        return results.rows[0].signature;
      })
  }

  exports.getAllSigs = () => {
   const q = `SELECT users.first AS first, users.last AS last, petition.id as sig_id, users.id as user_id, user_profiles.city, user_profiles.country, user_profiles.url, user_profiles.age
    FROM petition
    LEFT JOIN users
    ON users.id = petition.user_id
    LEFT JOIN user_profiles
    ON user_profiles.user_id = petition.user_id;`
  return db.query(q).then((results) => {
    return results.rows
  })
  }

  exports.byCity = (city) => {
    const q = `SELECT users.first AS first, users.last AS last, petition.id as sig_id, users.id as user_id, user_profiles.url, user_profiles.country, user_profiles.age
     FROM petition
     LEFT JOIN users
     ON users.id = petition.user_id
     LEFT JOIN user_profiles
     ON user_profiles.user_id = petition.user_id
     WHERE user_profiles.city = $1;`;
    const params = [city];
    return db.query(q,params).then((results) => {
      return results.rows
    }).catch((err) => {
      console.log('error in server by country: ', err);
    })
  }

  exports.userInfo = (id) => {
    const q = `SELECT users.username, users.first AS first, users.last AS last, users.id as user_id, user_profiles.city, user_profiles.country, user_profiles.url, user_profiles.age
     FROM users
     LEFT JOIN user_profiles
     ON users.id = user_profiles.user_id
     WHERE users.id = $1`;
    const params = [id];
    return db.query(q, params).then((results) => {
      return results.rows[0]
    }).catch((err) => {
      console.log('fucked up userInfo db: ', err);
    })
  }

  exports.updateProfile = (data, id) => {
  const q = `UPDATE user_profiles SET age = $1, city = $2, state = $3, country = $4, url = $5 WHERE user_id = $6 RETURNING user_id;`;
  const params = [data.age, data.city, data.state, data.country, data.url, id]
  return db.query(q,params).then((results) => {
    return results.rows[0];
  }).catch((err) => {
    console.log('Update prof err: ', err)
  })
}

exports.updateUsername = (data, id) => {
  const q = `UPDATE users SET username = $1, first = $2, last = $3 WHERE id = $4 RETURNING *;`;
  const params = [data.username, data.first, data.last, id]
  return db.query(q,params).then((results) => {
    return results.rows[0];
  }).catch((err) => {
    console.log('Update username err: ', err)
  })
}


  // exports.freeUsername = function(typedUser) {
  //   const q = `SELECT first FROM users;`;
  //   return db.query(q).then(function(user) {
  //
  //   })
  // }

})();

//`Select signature FROM petition where id=req.sessions.id`
//`Select hash_pass FROM users where `
