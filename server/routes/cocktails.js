const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;
const tryAuth = require('../middleware/tryAuth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;
const Cocktail = require('../models/Cocktail');


const router = express.Router();

router.get('/', tryAuth, async (req, res) => {
  try {
    let criteria = {isPublished: true};

    if (req.user && req.user.role !== 'admin') {
      criteria = {
        $or: [
          {isPublished: true},
          {user: req.user._id}
        ]
      }
    }

    const cocktails = await Cocktail.find(criteria);
    return res.send(cocktails);
  } catch(error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id).populate('user');

    if (!cocktail) {
      return res.status(404).send({message: 'Not found'});
    }

    return res.send(cocktail);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', tryAuth, upload.single('image'), async (req, res) => {
  const cocktailData = {
    name: req.body.name,
    recipe: req.body.recipe,
    user: req.user,
  };

  if(req.body.ingredients) {
    cocktailData.ingredients = JSON.parse(req.body.ingredients);
  }

  if (req.file) {
    cocktailData.image = req.file.filename;
  }

  try {
    const cocktail = new Cocktail(cocktailData);
    await cocktail.save();
    return res.send(cocktail);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/:id', [tryAuth, permit('admin')], async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    await cocktail.delete();
    return res.send({message: 'Successfully deleted'});
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/:id/publish', [tryAuth, permit('admin')], async (req, res) => {
  try {
    const cocktail = Cocktail.findById(req.params.id);
    cocktail.isPublished = true;
    await cocktail.save();
    return res.send({message: 'Successfully published'});
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
  }
}});

module.exports = router;
