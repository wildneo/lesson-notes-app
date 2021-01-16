import React from 'react';

import { useHistory, useRouteMatch } from 'react-router-dom';

import {
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  createStyles,
  Theme,
} from '@material-ui/core';
import MUIAppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AccountCircle } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useAuth from '../hooks/useAuth';

const useStyles = makeStyles((theme: Theme) => createStyles({
  goBackButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

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
