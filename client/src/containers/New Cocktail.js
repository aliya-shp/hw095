import React, {Component} from 'react';
import {connect} from "react-redux";
import {createCocktail} from "../store/actions/cocktailsActions";
import {nanoid} from "nanoid";
import FormElement from "../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const ingKey = nanoid();

class NewCocktail extends Component {
  state = {
    name: '',
    ingredients: [
      {
        ingName: '',
        ingAmount: '',
        ingKey: '',
      }
    ],
    recipe: '',
    image: null,
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  submitFormHandler = event => {
    event.preventDefault();
    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      key === 'ingredients' ?
        formData.set(key, JSON.stringify(this.state.ingredients)) :
        formData.append(key, this.state[key]);
    });

    this.props.createCocktail(formData).then(() => {
      console.log(formData.ingredients);
      this.props.history.push('/');
    });
  };


  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0],
    })
  };

  addIngredient = (event) => {
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        {ingName: '', ingAmount: '', ingKey}
      ]
    })
  };

  removeIngredient = (index) => {
    const ingredients = [...this.state.ingredients];
    ingredients.splice(index, 1);
    this.setState({
      ingredients: ingredients,
    });
  };

  ingredientInputChangeHandler = (event, index) => {
    const ingredient = {...this.state.ingredients[index]};
    ingredient[event.target.name] = event.target.value;
    const ingredients = [...this.state.ingredients];
    ingredients[index] = ingredient;
    this.setState({ingredients});
  };

  render() {
    return (
      <Grid container direction="column">
        <Box pt={2}>
          <Typography variant="h4">Add new cocktail</Typography>
        </Box>
        <form onSubmit={this.submitFormHandler}>
          <Box pt={2}></Box>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={6} sm={2}>
              <Typography variant="h8">Name</Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FormElement
                type="text"
                propertyName="name" required
                onChange={this.inputChangeHandler}
                value={this.state.name}
              />
            </Grid>
          </Grid>
          <Box pt={2}></Box>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={6} sm={2}>
              <Typography variant="h8">Recipe</Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FormElement
                type="textarea"
                propertyName="recipe" required
                id="recipe"
                onChange={this.inputChangeHandler}
                value={this.state.recipe}
              />
            </Grid>
          </Grid>
          Ingredients:
          {this.state.ingredients.map((ing, index) => (
            <div key={ing.ingKey}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4} sm={2}>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormElement
                    type="text"
                    propertyName="ingName" required
                    id="ingName"
                    placeholder="Ingredient name"
                    onChange={(event) => this.ingredientInputChangeHandler(event, index)}
                    value={this.state.ingredients.ingName}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormElement
                    type="text"
                    propertyName="ingAmount" required
                    id="ingAmount"
                    placeholder="Amount"
                    onChange={(event) => this.ingredientInputChangeHandler(event, index)}
                    value={this.state.ingredients.ingAmount}
                  />
                </Grid>
                {index > 0 &&
                (<Grid item xs={6} sm={3}>
                  <Box pt={1}>
                    <Button onClick={() => this.removeIngredient(index)} variant="contained">Delete</Button>
                  </Box>
                </Grid>)}
              </Grid>
            </div>
          ))}
          <Grid item xs={4} sm={2}>
          </Grid>
          <Grid item xs={8} sm={4}>
            <Box pt={1} pb={1} pl={27}>
              <Button type='button' variant="contained" onClick={this.addIngredient}>Add ingredient</Button>
            </Box>
          </Grid>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={6} sm={2}>
              <Typography variant="h8">Image</Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FormElement
                type="file"
                propertyName="image"
                onChange={this.fileChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid item xs={8} sm={4}>
            <Box pt={1} pb={1} pl={27}>
              <Button type="submit" color="primary" variant="contained">Create recipe</Button>
            </Box>
          </Grid>
        </form>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createCocktail: cocktailData => dispatch(createCocktail(cocktailData)),
});

export default connect(null, mapDispatchToProps)(NewCocktail);

