import React, {Component} from 'react';
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {fetchCocktails} from "../store/actions/cocktailsActions";
import CocktailCard from "../components/CocktailCard/CocktailCard";

class Cocktails extends Component {
  componentDidMount() {
    this.props.fetchCocktails();
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <h2>
            Cocktails
            <Link to="/cocktails/new">
              <Button
                color="primary"
                className="float-right"
              >
                Add cocktail
              </Button>
            </Link>
          </h2>

          {this.props.cocktails.map(cocktail => (
            <CocktailCard
              key={cocktail._id}
              _id={cocktail._id}
              name={cocktail.name}
              recipe={cocktail.recipe}
              image={cocktail.image}
              isPublished={cocktail.isPublished}
              ingredients={cocktail.ingredients}
            />
          ))}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  cocktails: state.cocktails.cocktails,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchCocktails: () => dispatch(fetchCocktails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);
