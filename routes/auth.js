const express = require('express');
const router = express.Router();

// Route  GET api/auth
// Desc   Get user logged in
// Access Private
router.get('/', (req, res) => {
  console.log('Get Login User');
});

// Route  POST api/auth
// Desc   Login auth and JWT
// Access Public
router.post('/', (req, res) => {
  console.log('Auth');
});

module.exports = router;