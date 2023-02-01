import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
} from '../../store/auth';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(startLoginWithEmailAndPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log('Sign in');
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        aria-label='login-form'
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@email.com"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Your password"
              name="password"
              inputProps={{
                'aria-label': 'password-input',
              }}
              value={password}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              sx={{
                display: !!errorMessage ? '' : 'none',
              }}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onGoogleSignIn}
                variant="contained"
                disabled={isAuthenticating}
                fullWidth
                aria-label="google-btn"
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link color="inherit" to="/auth/register" component={RouterLink}>
              Signup
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
