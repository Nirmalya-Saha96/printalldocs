const express = require('express');
const router = express.Router();
const authAdmin = require('../../middleware/adminAuth');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const AdminUser = require('../../models/AdminUser');
const Adhar = require('../../models/Adhar');
const Linking = require('../../models/Linking');
const Points = require('../../models/Points');
const Pan = require('../../models/Pan');
const Voter = require('../../models/Voter');
const User = require('../../models/User');

router.post('/',
[
    body('name', 'Please enter your name').not().isEmpty(),
    body('points', 'Plase enter your state').not().isEmpty(),
    body('mobile', 'Please enter your mobile number of 10 digits').isLength({ min: 10 }),
    body('email', 'Please enter proper email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),

],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, points, mobile, email, password } = req.body;

    try{
        let adminUser = await AdminUser.findOne({ mobile });

        if(adminUser){
            return res.status(400).json({ errors: [{ msg: 'Admin user already exists'}]});
        }

        adminUser = new AdminUser({
            name,
            points,
            mobile,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        adminUser.password = await bcrypt.hash(password, salt);

        await adminUser.save();

        const payload = {
            admin_user: {
                id: adminUser.id
            }
        };

        jwt.sign(payload,
             config.get('jwtSecret'),
             { expiresIn: 360000 },
             (err, token) => {
                 if(err) throw err;
                 res.json({ token });
             }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', authAdmin, async (req,res) => {
    try {
        const admin = await AdminUser.findById(req.admin.id).select('-password');
        res.json(admin);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login',
[
    body('mobile', 'Please enter your mobile number of 10 digits').isLength({ min: 10 }),
    body('password', 'Please enter the password').isLength({ min: 6 })
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { mobile, password } = req.body;

    try{
        let admin = await AdminUser.findOne({ mobile });

        if(!admin){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
        }

        const payload = {
            admin_user: {
                id: admin.id
            }
        };

        jwt.sign(payload,
             config.get('jwtSecret'),
             { expiresIn: 360000 },
             (err, token) => {
                 if(err) throw err;
                 res.json({ token });
             }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/adhar', authAdmin, async (req, res) => {
    try {
        const profiles = await Adhar.find().populate('user', ['name', 'mobile']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/link', authAdmin, async (req, res) => {
    try {
        const profiless = await Linking.find().populate('user', ['name', 'mobile']);
        res.json(profiless);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/pan', authAdmin, async (req, res) => {
    try {
        const profilessP = await Pan.find().populate('user', ['name', 'mobile']);
        res.json(profilessP);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/voter', authAdmin, async (req, res) => {
    try {
        const profilessV = await Voter.find().populate('user', ['name', 'mobile']);
        res.json(profilessV);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/addusers/:id', authAdmin, async (req, res) => {
  try {
    let puser = await Points.findOne({ user: req.params.id});

    if(puser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
    }

    const pointsFields= {};
    pointsFields.user = req.params.id;

    puser = new Points(pointsFields);

    await puser.save();

    res.json(puser);
  }catch(err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

router.post('/transfer/:id', authAdmin, async (req, res) => {
  const {
      points
  } = req.body;

  const fields = {};
  const adminFields = {};
  fields.user = req.params.id;
  if(points) fields.points = points;

  try {
      let transfer = await Points.findOne({ user: req.params.id });
      let adminPoints = await AdminUser.findById(req.admin.id);

      adminFields.points = adminPoints.points;
      adminFields.points -= fields.points;

      adminPoints = await AdminUser.findOneAndUpdate(
        { _id: req.admin.id },
        { $set: adminFields},
        { new: true }
      )

      await adminPoints.save();

      if(transfer) {

         fields.points += transfer.points;

          transfer = await Points.findOneAndUpdate(
              { user: req.params.id },
              { $set: fields },
              { new: true }
          );

          return res.json(transfer);
      }

      transfer = new Points(fields);

      await transfer.save();
      res.json(transfer);
  }catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

router.get('/addedusers', authAdmin, async (req, res) => {
  try {
      const addedUsers = await Points.find().populate('user', ['name', 'mobile', 'email', 'state']);
      res.json(addedUsers);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

router.get('/registeruser', authAdmin, async ( req,res) => {
  try{
    const registerUser = await User.find();
    res.json(registerUser)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
