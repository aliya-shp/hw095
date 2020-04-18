import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";
import imageNotAvailable from '../../assets/images/image_not_available.png';
import {apiURL} from '../../constants';

const styles = {
  width: '100px',
  height: '100px',
  marginRight: '10px'
};

const CocktailCard = props => {
  let image = imageNotAvailable;

  if (props.image) {
    image = apiURL + '/' + props.image;
  }
  return (
    <Card style={{marginTop: '10px'}}>
      <CardBody>
        <img src={image} style={styles} className="img-thumbnail" alt="Cocktail" />
        <Link to={'/cocktails/' + props._id}>
          Name: {props.name}
        </Link>
        <strong style={{marginLeft: '10px'}}>
          <p>Recipe: {props.recipe}</p>
          <p>Ingredients: {props.ingredients.map(ing => (<span>ing</span>))}</p>
          <p>{props.isPublished ? '' : <span>Your cocktail is waiting for moderation!</span>}</p>
        </strong>
      </CardBody>
    </Card>
  );
};

CocktailCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  recipe: PropTypes.string,
  image: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  isPublished: PropTypes.bool,
};

export default CocktailCard;
