import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Logo from '../../static/img/logo.jpg';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "../common/modal/ModalComponent";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {Social} from "../../containers/auth";
import { deleteSendEmail } from "../../actions/authActions";
import styles from "./style";

function AuthPage(props) {
  function handleModal() {
    props.deleteSend();
  }

  const {
    classes,
    error,
    title,
    isShowAuth,
    children,
    size,
    titleDown,
    link,
    nameAction,
    isSendEmail,
    // otherRegisterLink,
    // otherRegisterText
  } = props;
  let classSize = size === "big" ? classes.mainBig : classes.mainSmall;
  return (
    <main className={`${classes.main}`}>
      <div className={classSize}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Link to="/">
              {/* <img className={classes.logo}  src={Logo} alt="Клининговые компании"/> */}
          </Link>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {error ? <p className={classes.error}>{error}</p> : null}
          {children}
          {isShowAuth ? (
            <div style={{ textAlign: "center" }}>
              <Social />
            </div>
          ) : null}
          <p>
            {titleDown} <Link to={link}>{nameAction}</Link>
          </p>
          {/* {otherRegisterLink && otherRegisterText && (
            <Link to={otherRegisterLink}>{otherRegisterText}</Link>
          )} */}
        </Paper>
        {isSendEmail && (
          <Modal
            onClose={handleModal}
            description="На вашу почту отпарвлено сообщение с подтверждением регистрации"
          />
        )}
      </div>
    </main>
  );
}

AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string
};

AuthPage.defaultProps = {
  error: ""
};

const Auth = withStyles(styles)(AuthPage);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteSend: () => {
      dispatch(deleteSendEmail());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
