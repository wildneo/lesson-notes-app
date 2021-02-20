import React from 'react';

import { useTranslation } from 'react-i18next';
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import LanguageIcon from '@material-ui/icons/Language';

import useAuth from '../hooks/useAuth';
import useThemeProvider from '../hooks/useThemeProvider';
import { Nullable } from '../typings';

interface HideOnScrollProps {
  children?: React.ReactElement;
}

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
  const [userBtnEl, setUserBtnEl] = React.useState<Nullable<HTMLElement>>(null);
  const [lngBtnEl, setLngBtnEl] = React.useState<Nullable<HTMLElement>>(null);
  const { i18n, t } = useTranslation();
  const { darkMode, setDarkMode } = useThemeProvider();
  const match = useRouteMatch(['/login', '/']);
  const history = useHistory();
  const classes = useStyles();
  const { auth } = useAuth();

  const showBackButton = match && !match.isExact;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserBtnEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserBtnEl(null);
  };

  const handleOpenLngMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLngBtnEl(event.currentTarget);
  };

  const handleCloseLngMenu = () => {
    setLngBtnEl(null);
  };

  const handleChangeLanguage = (lng: string) => () => {
    handleCloseLngMenu();
    i18n.changeLanguage(lng);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      handleCloseUserMenu();
      history.push('/login');
    });
  };

  const handleBackClick = () => {
    history.goBack();
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
            {/* Lesson notes */}
            {t('appBar.title')}
          </Typography>
          <IconButton onClick={handleChangeThemeMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <>
            <IconButton onClick={handleOpenLngMenu} color="inherit">
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={lngBtnEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(lngBtnEl)}
              onClose={handleCloseLngMenu}
            >
              <MenuItem
                selected={i18n.language === 'en'}
                onClick={handleChangeLanguage('en')}
              >
                English
              </MenuItem>
              <MenuItem
                selected={i18n.language === 'ru'}
                onClick={handleChangeLanguage('ru')}
              >
                Русский
              </MenuItem>
            </Menu>
          </>
          {login && (
            <>
              <IconButton onClick={handleOpenUserMenu} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={userBtnEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(userBtnEl)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleSignOut}>
                  {t('appBar.userMenu.actions.signout')}
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </MUIAppBar>
    </HideOnScroll>
  );
};

export default React.memo(AppBar);
