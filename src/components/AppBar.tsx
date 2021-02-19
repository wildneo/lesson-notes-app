import React from 'react';

import { useHistory, useRouteMatch } from 'react-router-dom';

import MUIAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AccountCircle } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import useAuth from '../hooks/useAuth';
import useThemeProvider from '../hooks/useThemeProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    goBackButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface HideOnScrollProps {
  children?: React.ReactElement;
}

const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const AppBar = () => {
  const [login, setlogin] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const { darkMode, setDarkMode } = useThemeProvider();
  const match = useRouteMatch(['/login', '/']);
  const history = useHistory();
  const classes = useStyles();
  const { auth } = useAuth();

  const showBackButton = match && !match.isExact;

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setAnchorEl(null);
      history.push('/login');
    });
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeThemeMode = () => {
    setDarkMode(!darkMode);
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setlogin(true);
      } else {
        setlogin(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HideOnScroll>
      <MUIAppBar color="default">
        <Toolbar>
          {showBackButton && (
            <IconButton
              onClick={handleBackClick}
              className={classes.goBackButton}
              color="inherit"
              edge="start"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Lesson notes
          </Typography>
          <IconButton onClick={handleChangeThemeMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {login && (
            <div>
              <IconButton onClick={handleOpen} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={!!anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </MUIAppBar>
    </HideOnScroll>
  );
};

export default React.memo(AppBar);
