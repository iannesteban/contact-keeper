const express = require('express');
const router = express.Router();

// Route  GET api/contacts
// Desc   GET all contacts
// Access Private
router.get('/', (req, res) => {
  console.log('Get All Contacts');
});

// Route  POST api/contacts
// Desc   Add Contact
// Access Private
router.post('/', (req, res) => {
  console.log('Add Contacts');
});

// Route  PUT api/contacts/:id
// Desc   Update contact
// Access Private
router.put('/:id', (req, res) => {
  console.log('Update Contact');
});

// Route  DELETE api/contacts/:id
// Desc   Delete contact
// Access Private
router.delete('/:id', (req, res) => {
  console.log('Delete Contact');
});

module.exports = router;