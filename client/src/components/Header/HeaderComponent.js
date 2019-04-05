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
import MoreIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';

import styles from './style';

    
 function HeaderComponent(props){
    const {classes} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    function handleProfileMenuOpen(event) {
      setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
      setAnchorEl(null);
    }

    function handleClickLogout(){
      console.log(props);
      props.logout();
    }

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        className={classes.menuHeader}
        onClose={handleMenuClose}
      >
       {!props.isAuthenticated 
          ? <>
              <MenuItem>
                  <IconButton color="inherit">
                    <AccountCircle />
                  </IconButton>
                  <p><Link to='/register' className={classes.linkMenu} >Регистрация</Link></p>
              </MenuItem>
              <MenuItem>
                <IconButton color="inherit">
                    <MailIcon />
                </IconButton>
                <Link to='/login' className={classes.linkMenu} >Войти</Link>
              </MenuItem>
          </>
          : <> 
               <MenuItem>
                <IconButton color="inherit">
                    <MailIcon />
                </IconButton>
                <Link to='/profile' className={classes.linkMenu} >Profile</Link>
              </MenuItem>
              <MenuItem>
                <IconButton color="inherit">
                    <MailIcon />
                </IconButton>
                <Link to='/setting' className={classes.linkMenu} >Setting</Link>
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>
              <IconButton color="inherit">
                  <NotificationsIcon />
              </IconButton>
              <p>Logout</p>
            </MenuItem>
            </>
        }
      </Menu>
    );
  
    return (
        <div className={classes.root} >
            <AppBar position="static"  className={classes.navbar}>
                <Toolbar>
                    <Typography className={classes.title}  variant="h6" color="inherit" noWrap>
                        <Link to="/" className={classes.link} >Клининговые компании</Link> 
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
                      <IconButton aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                        <MoreIcon />
                      </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

export const Header = withStyles(styles)(HeaderComponent);