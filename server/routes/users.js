const express = require('express');
const axios = require("axios");
const {nanoid} = require("nanoid");

const config = require('../config');
const User = require('../models/User');

const router = express.Router();

router.post('/facebook', async (req, res) => {
  try {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(url);

    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({message: 'User ID incorrect'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      const [firstName, lastName] = req.body.name.split(' ');

      user = new User({
        username: req.body.id,
        password: nanoid(),
        facebookId: req.body.id,
        firstName,
        lastName,
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    return res.sendStatus(401);
  }
});

module.exports = router;