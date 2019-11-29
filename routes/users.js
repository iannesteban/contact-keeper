const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please add a valid email').isEmail(),
  check('password', 'Please add at least 6 character').isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if(user){
      return res.status(422).send('User already existed');
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password,salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 36000
    }, (err, token) => {
        if(err) throw err;
        res.send({ token });
    } );

  } catch (err) {
    console.error(err.message);

  }
  

});


module.exports = router;