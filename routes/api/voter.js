const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const Voter = require('../../models/Voter');
const Points = require('../../models/Points');

router.post('/',
    [auth,
         [
           body('epic_no', 'Please enter your voter card number').not().isEmpty(),
           body('name', 'Please enter your name').not().isEmpty(),
           body('name_locality', 'Please enter your name').not().isEmpty(),
           body('gender', 'Please enter your gender').not().isEmpty(),
           body('date_of_birth', 'Please enter your date of birth').not().isEmpty(),
           body('relation_father_husband', 'Please enter your relation').not().isEmpty(),
           body('father_husband_name', 'Please enter your fathers/husband name').not().isEmpty(),
           body('father_husband_name_local_language', 'Please enter your fathers/husband name').not().isEmpty(),
           body('police_station', 'Please enter your police station').not().isEmpty(),
           body('tahshil', 'Please enter your tahshil').not().isEmpty(),
           body('assembly', 'Please enter your assembly').not().isEmpty(),
           body('assembly_local_language', 'Please enter your assembly').not().isEmpty(),
           body('part_number', 'Please enter your part number').not().isEmpty(),
           body('part_name', 'Please enter your part name').not().isEmpty(),
           body('part_name_lacal_language', 'Please enter your part name').not().isEmpty(),
           body('language', 'Please enter your local language').not().isEmpty(),
           body('address', 'Please enter your address').not().isEmpty(),
           body('address_local_language', 'Please enter your address local language').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            epic_no,
            name,
            name_locality,
            gender,
            date_of_birth,
            relation_father_husband,
            father_husband_name,
            father_husband_name_local_language,
            police_station,
            tahshil,
            assembly,
            assembly_local_language,
            part_number,
            part_name,
            part_name_lacal_language,
            language,
            address,
            address_local_language
        } = req.body;

        const voterFields = {};
        voterFields.user = req.user.id;
        if(epic_no) voterFields.epic_no = epic_no;
        if(name) voterFields.name = name;
        if(name_locality) voterFields.name_locality = name_locality;
        if(gender) voterFields.gender = gender;
        if(date_of_birth) voterFields.date_of_birth = date_of_birth;
        if(relation_father_husband) voterFields.relation_father_husband = relation_father_husband;
        if(father_husband_name) voterFields.father_husband_name = father_husband_name;
        if(father_husband_name_local_language) voterFields.father_husband_name_local_language = father_husband_name_local_language;
        if(police_station) voterFields.police_station = police_station;
        if(tahshil) voterFields.tahshil = tahshil;
        if(assembly) voterFields.assembly = assembly;
        if(assembly_local_language) voterFields.assembly_local_language = assembly_local_language;
        if(part_number) voterFields.part_number = part_number;
        if(part_name) voterFields.part_name = part_name;
        if(part_name_lacal_language) voterFields.part_name_lacal_language = part_name_lacal_language;
        if(language) voterFields.language = language;
        if(address) voterFields.address = address;
        if(address_local_language) voterFields.address_local_language = address_local_language;

        try {
            let voter = await Voter.findOne({ user: req.user.id });
            let pointCheck = await Points.findOne({ user: req.user.id });

            if(!pointCheck){
              return res.status(400).json({ errors: [{ msg: 'Your wallet balance is low. Please contact Rohan: 90735 + 69044/69385/68790'}]});
            }
			
			if(pointCheck.points < 1){
              return res.status(400).json({ errors: [{ msg: 'Your wallet balance is low. Please contact Rohan: 90735 + 69044/69385/68790'}]});
            }

            if(voter) {
                voter = await Voter.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: voterFields },
                    { new: true }
                );

                return res.json(voter);
            }

            voter = new Voter(voterFields);

            await voter.save();
            res.json(voter);
        }catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', auth, async (req,res) => {
  try {
      const printVoter = await Voter.findOne({ user: req.user.id });

      if(!printVoter){
        return res.status(400).json({ errors: [{ msg: 'Please create voter card details'}]});
      }

      res.json(printVoter);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

module.exports = router;
