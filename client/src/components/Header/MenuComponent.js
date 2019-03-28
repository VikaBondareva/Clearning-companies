import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
    sectionDesktop: {
      display: 'none',
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
    
 function MenuComponent(props){
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
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My orders</MenuItem>
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
            <p>Profile</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>My orders</p>
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
        <>
            {renderMenu}
            {renderMobileMenu}
        </>
    );
}

export default withStyles(styles)(MenuComponent);