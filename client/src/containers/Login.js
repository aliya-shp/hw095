import React, {Component} from 'react';
import FacebookLogin from "../components/FacebookLogin/FacebookLogin";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";

class Login extends Component {
  render() {
    return (
      <>
        <Grid container justify="center">
          <Grid item xs>
            <Box pt={20} pb={2}>
              <Typography variant="h4" align="center">Login</Typography>
            </Box>
            <CardActions style={{justifyContent: 'center'}}>
              <FacebookLogin/>
            </CardActions>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Login;