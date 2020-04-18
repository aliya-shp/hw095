import axios from '../../axiosApi';

export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const CREATE_COCKTAIL_SUCCESS = 'CREATE_COCKTAIL_SUCCESS';

export const fetchCocktailsSuccess = cocktails => ({type: FETCH_COCKTAILS_SUCCESS, cocktails});
export const createCocktailSuccess = () => ({type: CREATE_COCKTAIL_SUCCESS});


export const fetchCocktails = cocktails => {
  return async dispatch => {
    const response = await axios.get('/cocktails');
    dispatch(fetchCocktailsSuccess(response.data));
  };
};

export const createCocktail = cocktailData => {
  return async dispatch => {
    await axios.post('/cocktails', cocktailData);
    dispatch(createCocktailSuccess());
  };
};