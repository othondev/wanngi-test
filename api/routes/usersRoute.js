const express = require('express');
const router = express.Router();
const passportMiddleware = require('../middleware/passport')
UserSchema = require('../database/schemas/UserSchema')
const auth = require('../middleware/authorization')

router.post('/login', passportMiddleware.authenticate('local'), function({user={}}, res, next) {
  res.json({token: user._id, login: user.login})
});

router.get('/info', auth, async (req, res, next)=>{
  const user = await UserSchema.findOne({_id: req.userId})
  console.log(user)
  res.json({id: user._id, login: user.login, fakeToken: true})
})

module.exports = router;
