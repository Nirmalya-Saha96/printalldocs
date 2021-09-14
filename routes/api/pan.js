const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const Pan = require('../../models/Pan');
const Points = require('../../models/Points');

router.post('/',
    [auth,
         [
           body('pan_card_no', 'Please enter your adhar card number').not().isEmpty(),
           body('name', 'Please enter your name').not().isEmpty(),
           body('father_name', 'Please enter your fathers name').not().isEmpty(),
           body('date_of_birth', 'Please enter your date of birth').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            pan_card_no,
            name,
            father_name,
            date_of_birth
        } = req.body;

        const panFields = {};
        panFields.user = req.user.id;
        if(pan_card_no) panFields.pan_card_no = pan_card_no;
        if(name) panFields.name = name;
        if(father_name) panFields.father_name = father_name;
        if(date_of_birth) panFields.date_of_birth = date_of_birth;

        try {
            let pan = await Pan.findOne({ user: req.user.id });
            let pointCheck = await Points.findOne({ user: req.user.id });

            if(!pointCheck){
              return res.status(400).json({ errors: [{ msg: 'Your wallet balance is low. Please contact help desk for support: 90735 + 69044/69385/68790'}]});
            }
			
			if(pointCheck.points < 1){
              return res.status(400).json({ errors: [{ msg: 'Your wallet balance is low. Please contact help desk for support: 90735 + 69044/69385/68790'}]});
            }

            if(pan) {
                pan = await Pan.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: panFields },
                    { new: true }
                );

                return res.json(pan);
            }

            pan = new Pan(panFields);

            await pan.save();
            res.json(pan);
        }catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', auth, async (req,res) => {
  try {
      const printPan = await Pan.findOne({ user: req.user.id });

      if(!printPan){
        return res.status(400).json({ errors: [{ msg: 'Please create pan card details'}]});
      }

      res.json(printPan);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

module.exports = router;
