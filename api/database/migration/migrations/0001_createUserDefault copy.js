module.exports = {
  up(db, callback) {
    return db.collection('users').insertMany([
      {
        login: 'test1',
        password: 'password1'
      },
      {
        login: 'test2',
        password: 'password2'
      }
    ], callback);
  },
 
  down(db, callback) {

  }
};