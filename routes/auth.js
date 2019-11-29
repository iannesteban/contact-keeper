const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middleware/auth');

// Route  GET api/auth
// Desc   Get user logged in
// Access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    console.log(user);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server Error'); 
  }
});

// Route  POST api/auth
// Desc   Login auth and JWT
// Access Public
router.post('/', [
  check('email', 'Please include a valid email address').isEmail(),
  check('password', 'Password is Required').exists()
], async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    let user = await User.findOne({email});

    if(!user) {
      return res.status(402).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
     return res.status(402).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    }

   jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 36000
    }, (err, token) => {
      if(err) throw err;
      res.json({token});
    });

  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server Error');    
  }

});

module.exports = router;