const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Route  GET api/contacts
// Desc   GET all contacts
// Access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

    res.json(contacts);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route  POST api/contacts
// Desc   Add Contact
// Access Private
router.post('/', [ auth, [
  check('name', 'Please add a name' ).not().isEmpty(),
  check('email', 'Please add a valid email').isEmail()
] ], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {

    const { name, email, phone, type } = req.body;

   const newContact = new Contact({
     name,
     email,
     phone,
     type,
     user: req.user.id
   });

   const contact = await newContact.save();

   res.json(contact);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
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