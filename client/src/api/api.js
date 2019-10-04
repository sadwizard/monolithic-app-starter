import request from 'superagent';
const API_LINK = process.env.API_LINK;

class Api {
  constructor() {
    this.address = API_LINK;
  }

  get(path, cb) {
    return new Promise((resolve, reject) => {
      request.get(this.address + path)
      .end((err, res) => {
        if (err) {
          return console.error(err);
        }

        resolve(res.body);
        if (cb) { cb(res); }
      });
    });
  }

  post(path, data, cb) {
    return new Promise((resolve, reject) => {
      request.post(this.address + path)
        .send(data)
        .end((err, res) => {
          if (err) {
            return console.error(err);
          }
          resolve(res.body);
          if (cb) { cb(res); }
        });
    });
  }

  delete(path, data, cb) {
    return new Promise((resolve, reject) => {
      request.del(this.address + path)
        .send(data)
        .end((err, res) => {
          if (err) {
            return console.error(err);
          }

          resolve(res.body)
          if (cb) { cb(res); }
        });
    });
  }

  checkAuth(token, cb) {
    if (!token) {
      if (cb) { cb(false); }
      return;
    };

    return request.post(this.address + '/checkauth')
      .send({ token })
      .end((err, res) => {
        if (err) {
          console.error(err);
          if (cb) { return cb(false); }
        }

        if (cb) { cb(Boolean(res.body.user_exist)); }
      });
  }

  postFileAndFields(path, file, data, cb) {
    return new Promise((resolve, reject) => {
      const req = request.post(this.address + path);

      if (file) {
        req.attach(file.name, file.source);
      }

      for(var i in data) {
        if (typeof data[i] === 'object') {
          req.field(i , JSON.stringify(data[i]));
        } else {
          req.field(i , data[i]);
        }
      }

      req.end((err, res) => {
        if (err) {
          console.error(err);
        }
        
        resolve(res.body);
        if (cb) cb(res);
      });
    });
  }
}

export default Api;