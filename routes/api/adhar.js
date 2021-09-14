const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator/check');

const Adhar = require('../../models/Adhar');
const User = require('../../models/User');
const Points = require('../../models/Points');

router.post('/',
    [auth,
         [
           body('adhar_card_no', 'Please enter your adhar card number').not().isEmpty(),
           body('name', 'Please enter your name').not().isEmpty(),
           body('father_name', 'Please enter your fathers name').not().isEmpty(),
           body('house_no', 'Please enter your house number').not().isEmpty(),
           body('gali_locality', 'Please enter your gali locality').not().isEmpty(),
           body('post_office', 'Please enter your post office').not().isEmpty(),
           body('state', 'Please enter your state').not().isEmpty(),
           body('city', 'Please enter your city').not().isEmpty(),
           body('pin_code', 'Please enter your pin code').not().isEmpty(),
           body('date_of_birth', 'Please enter your date of birth').not().isEmpty(),
           body('date_of_birth_locality', 'Please enter your date of birth locality').not().isEmpty(),
           body('gender', 'Please enter your gender').not().isEmpty(),
           body('gender_local', 'Please enter your gender local').not().isEmpty(),
           body('address', 'Please enter your address').not().isEmpty(),
           body('local_language', 'Please enter your local language').not().isEmpty(),
           body('address_local_language', 'Please enter your address local language').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            adhar_card_no,
            name,
            father_name,
            house_no,
            gali_locality,
            post_office,
            state,
            city,
            pin_code,
            date_of_birth,
            date_of_birth_locality,
            gender,
            gender_local,
            address,
            local_language,
            address_local_language
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if(adhar_card_no) profileFields.adhar_card_no = adhar_card_no;
        if(name) profileFields.name = name;
        if(father_name) profileFields.father_name = father_name;
        if(house_no) profileFields.house_no = house_no;
        if(gali_locality) profileFields.gali_locality = gali_locality;
        if(post_office) profileFields.post_office = post_office;
        if(state) profileFields.state = state;
        if(city) profileFields.city = city;
        if(pin_code) profileFields.pin_code = pin_code;
        if(date_of_birth) profileFields.date_of_birth = date_of_birth;
        if(date_of_birth_locality) profileFields.date_of_birth_locality = date_of_birth_locality;
        if(gender) profileFields.gender = gender;
        if(gender_local) profileFields.gender_local = gender_local;
        if(address) profileFields.address = address;
        if(local_language) profileFields.local_language = local_language;
        if(address_local_language) profileFields.address_local_language = address_local_language;

        try {
            let adhar = await Adhar.findOne({ user: req.user.id });
            let pointCheck = await Points.findOne({ user: req.user.id });

            if(!pointCheck){
              return res.status(400).json({ errors: [{ msg: 'Your wallet balance is low. Please contact help desk for support: 90735 + 69044/69385/68790'}]});
            }

            if(pointCheck.points < 1){
              return res.status(400).json({ errors: [{ msg: 'Your wallet balance is low. Please contact help desk for support: 90735 + 69044/69385/68790'}]});
            }

            if(adhar) {
                adhar = await Adhar.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(adhar);
            }

            adhar = new Adhar(profileFields);

            await adhar.save();
            res.json(adhar);
        }catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', auth, async (req,res) => {
  try {
      const print = await Adhar.findOne({ user: req.user.id });

      if(!print){
        return res.status(400).json({ errors: [{ msg: 'Please create adhar card details'}]});
      }

      res.json(print);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

module.exports = router;
