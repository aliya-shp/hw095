const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
    enum: [false, true]
  },
  ingredients: [
    {
      ingName: String,
      ingAmount: String,
      ingKey: String,
    }
  ],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;