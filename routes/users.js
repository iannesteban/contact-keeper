const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('Register User');
});

module.exports = router;