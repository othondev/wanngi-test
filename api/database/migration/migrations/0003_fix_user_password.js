const Bcrypt = require('bcrypt')
const SALT = 10
const crpyt = (password, salt) => Bcrypt.hashSync(password, SALT);

module.exports = {
  async up(db, callback) {
    const users = await db.collection('users').find({}).toArray()
    users.map(u => {
      u.password = crpyt(u.password)
      return u
    })
    await db.collection('users').deleteMany()
    return db.collection('users').insertMany(users)
    
  },
 
  down(db, callback) {

  }
};
