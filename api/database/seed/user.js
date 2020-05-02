db.users.drop();
db.users.insertMany([
  {
    login: 'test1',
    password: 'password1'
  },
  {
    login: 'test2',
    password: 'password2'
  }
])