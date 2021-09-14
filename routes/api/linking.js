const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator/check');

const Adhar = require('../../models/Adhar');
const User = require('../../models/User');
const Linking = require('../../models/Linking');
const Pan = require('../../models/Pan');
const Voter = require('../../models/Voter');

router.post('/',
    [auth,
         [
           body('adhar_card_no', 'Please enter your adhar card number').not().isEmpty(),
           body('pan_card_no', 'Please enter your pan card number').not().isEmpty(),
           body('voter_card_no', 'Please enter your voter card number').not().isEmpty(),
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
           body('address_local_language', 'Please enter your address local language').not().isEmpty(),
           body('name_check', 'Check the name check box').not().isEmpty(),
           body('address_check', 'Check the address check box').not().isEmpty(),
           body('photo_check', 'Check the photo check box').not().isEmpty(),
           body('boimetric_check', 'Check the biometric check').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            adhar_card_no,
            pan_card_no,
            voter_card_no,
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
            address_local_language,
            name_check,
            address_check,
            photo_check,
            boimetric_check
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if(adhar_card_no) profileFields.adhar_card_no = adhar_card_no;
        if(pan_card_no) profileFields.pan_card_no = pan_card_no;
        if(voter_card_no) profileFields.voter_card_no = voter_card_no;
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
        if(name_check) profileFields.name_check = name_check;
        if(address_check) profileFields.address_check = address_check;
        if(photo_check) profileFields.photo_check = photo_check;
        if(boimetric_check) profileFields.boimetric_check = boimetric_check;

        try {
            let link = await Linking.findOne({ user: req.user.id });
            let adharCheck = await Adhar.findOne({ user: req.user.id })
            let panCheck = await Pan.findOne({ user: req.user.id })
            let voterCheck = await Voter.findOne({ user: req.user.id })

            if(!adharCheck){
              return res.status(400).json({ errors: [{ msg: 'First create your adhar profile'}]});
            }

            if(!panCheck){
              return res.status(400).json({ errors: [{ msg: 'First create your pan profile'}]});
            }

            if(!voterCheck){
              return res.status(400).json({ errors: [{ msg: 'First create your voter profile'}]});
            }

            if(adharCheck.adhar_card_no != profileFields.adhar_card_no){
              return res.status(400).json({ errors: [{ msg: 'Adhar card number does not matches please update adhar card number'}]});
            }

            if(panCheck.pan_card_no != profileFields.pan_card_no){
              return res.status(400).json({ errors: [{ msg: 'Pan card number does not matches please update adhar card number'}]});
            }

            if(voterCheck.epic_no != profileFields.voter_card_no){
              return res.status(400).json({ errors: [{ msg: 'Voter card number does not matches please update adhar card number'}]});
            }

            if(link) {
                link = await Linking.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(link);
            }

            link = new Linking(profileFields);

            await link.save();
            res.json(link);
        }catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


module.exports = router;
