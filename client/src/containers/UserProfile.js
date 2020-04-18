import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../components/UI/Form/FormElement";
import {editProfile} from "../store/actions/usersActions";
import {apiURL} from "../constants";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const [state, setState] = useState({
    password: '',
    avatar: null,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
  });

  const onSubmit = e => {
    e.preventDefault();

    const profileData = new FormData();

    Object.keys(state).forEach(key => {
      profileData.append(key, state[key]);
    });

    dispatch(editProfile(profileData));
  };

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const onFileChange = e => {
    setState({...state, [e.target.name]: e.target.files[0]});
  };

  return (
    <>
      <Grid container>
        <Box pt={2} pb={2}>
          <Typography variant="h4">Change user profile</Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <FormElement
                type="password"
                propertyName="password"
                title="Change password"
                onChange={onChange}
                value={state.password}
              />
            </Grid>
            <Grid item xs>
              <FormElement
                type="file"
                propertyName="avatar"
                title="Upload avatar"
                onChange={onFileChange}
              />
            </Grid>
            <Grid item xs>
              {user.avatar ? (
                <img src={apiURL + '/' + user.avatar} alt={user.username} style={{maxWidth: '100px'}}/>
              ) : 'No avatar selected'}
            </Grid>
            <Grid item xs>
              <FormElement
                propertyName="displayName"
                title="Display name"
                onChange={onChange}
                value={state.displayName}
              />
            </Grid>
            <Grid item xs>
              <Button type="submit" color="primary" variant="contained">Save</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default UserProfile;