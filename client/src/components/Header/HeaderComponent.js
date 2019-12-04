import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Logo from '../../static/img/logo.jpg';
import {
  Notifications,
  AccountCircle,
  Edit,
  Event,
  MoreVert as MoreIcon,
  Face,
  SupervisorAccount,
  ExitToApp
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import { roles } from "../../utils";
import styles from "./style";

function HeaderComponent(props) {
  const { classes, role, isAuthenticated } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleClickLogout() {
    console.log(props);
    props.logout();
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      className={classes.menuHeader}
      onClose={handleMenuClose}
    >
      {!isAuthenticated ? (
        <>
          <Link to="/register" className={classes.linkMenu}>
            <MenuItem>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              Регистрация
            </MenuItem>
          </Link>
          <Link to="/login" className={classes.linkMenu}>
            <MenuItem>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              Войти
            </MenuItem>
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile" className={classes.linkMenu}>
            <MenuItem>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              Профиль
            </MenuItem>
          </Link>
          <Link to="/profile/edit" className={classes.linkMenu}>
            <MenuItem>
              <IconButton color="inherit">
                <Edit />
              </IconButton>
              Редактировать
            </MenuItem>
          </Link>
          <Link to="/profile/edit/password" className={classes.linkMenu}>
            <MenuItem>
              <IconButton color="inherit">
                <Edit />
              </IconButton>
              Сменить пароль
            </MenuItem>
          </Link>
          {role !== roles.admin ? (
            <Link to="/profile/orders" className={classes.linkMenu}>
              <MenuItem>
                <IconButton color="inherit">
                  <Event />
                </IconButton>
                Заказы
              </MenuItem>
            </Link>
          ) : (
            <>
              <Link to="/admin/users" className={classes.linkMenu}>
                <MenuItem>
                  <IconButton color="inherit">
                    <SupervisorAccount />
                  </IconButton>
                  Пользователи
                </MenuItem>
              </Link>
              <MenuItem>
                <IconButton color="inherit">
                  <Face />
                </IconButton>
                <Link to="/admin/companies" className={classes.linkMenu}>
                  Компании
                </Link>
              </MenuItem>
            </>
          )}

          <MenuItem onClick={handleClickLogout}>
            <IconButton color="inherit">
              <ExitToApp />
            </IconButton>
            <p>Выйти</p>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            <Link to="/" className={classes.link}>
              <img className={classes.logo}  src={Logo} alt="Клининговые компании"/>
            </Link>
          </Typography>
          <div className={classes.grow} />
          {(role === roles.user || !role) && (
            <Link to="/booking" className={classes.linkMenu}>
              <Button size="small" className={classes.btnLink}>
                Забронировать номер
              </Button>
            </Link>
          )}
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
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
