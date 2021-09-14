const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Points = require('../../models/Points');

router.get('/', auth, async (req,res) => {
    try {
        const user = await Points.findOne({ user: req.user.id});
        res.json(user);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
