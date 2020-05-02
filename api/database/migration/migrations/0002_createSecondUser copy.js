module.exports = {
  up(db, callback) {
    return db.collection('users').insertMany([
      {
        login: 'test3',
        password: 'password3'
      },
      {
        login: 'test4',
        password: 'password4'
      }
    ], callback);
  },
 
  down(db, callback) {

  }
};