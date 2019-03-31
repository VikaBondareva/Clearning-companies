import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import MoreIcon from '@material-ui/icons/MoreVert';

import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
      width: '100%',
    },
    navbar: {
      background: theme.palette.primary.dark
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      marginLeft: "150px",
      color: theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      marginRight: 100,
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  });
    
 function Header(props){
    const {classes} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event) {
      setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
      setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
      setAnchorEl(null);
      handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
      setMobileMoreAnchorEl(event.currentTarget);
    }

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <p><Link to='/login' >Login</Link></p>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <p><Link to='/register' >Регистрация</Link></p>
        </MenuItem>
      </Menu>
    );
  
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p><Link to='/register' >Регистрация</Link></p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
              <MailIcon />
          </IconButton>
          <Link to='/login' >Войти</Link>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
              <NotificationsIcon />
          </IconButton>
          <p>Setting</p>
        </MenuItem>
      </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        <Link to="/">Клининговые компании</Link> 
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                      <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                      <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                        <MoreIcon />
                      </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </div>
    );
}

export default withStyles(styles)(Header);