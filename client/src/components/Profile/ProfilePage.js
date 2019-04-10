import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { Link } from "react-router-dom";

const styles = {
  card: {
    height: "100%",
    width: "calc(100% - 100px)"
  },
  nameSection: {
    fontSize: "1.3em",
    fontStyle: "italic",
    borderBottom: "1px solid",
    margin: "20px 0"
  },
  actions: {
    borderTop: "1px solid",
    paddingTop: 10,
    marginTop: 20
  },
  title: {
    fontSize: "1.3em",
    fontFamily: "serif",
    fontStyle: "italic"
  },
  table: {
    display: "flex",
    justifyContent: "space-between",
    width: "calc(80% - 150px)",
    padding: "10px 30px 0 0",
    fontFamily: "sans-serif"
  },
  text: {
    borderBottom: "1px solid"
  },
};

class ProfilePageComponent extends Component {
  renderAddresses = (address, i) => {
    const { classes } = this.props;
    return (
      <>
        <Typography gutterBottom key={i} className={classes.text}>
          {address}
        </Typography>
      </>
    );
  };

  render() {
    const { classes, user } = this.props;
    const { name, surname, email, addresses, phone } = user;
    return (
      <div className={classes.card}>
        <main className={classes.main}>
          <div className={classes.nameSection}>Main information</div>
          <div className={classes.title}>
            {name} {surname}
          </div>
          <div className={classes.info}>
            {email && (
              <div className={classes.table}>
                <p> Email:</p>
                <p> {email} </p>
              </div>
            )}
            {phone && (
              <div className={classes.table}>
                <p> Phone:</p>
                <p> {phone} </p>
              </div>
            )}
          </div>
          <div className={classes.table}>
            Addresses:
            <div>
              {addresses.map(this.renderAddresses)}
            </div>
          </div>
        </main>
        <section className={classes.actions}>
          <Button size="small" color="primary">
            <Link to="/profile/edit">Edit profile</Link>
          </Button>
          <Button size="small" color="primary">
            <Link to="/orders">My orders</Link>
          </Button>
          <Button size="small" color="primary">
            <Link to="/reviews">My reviews</Link>
          </Button>
        </section>
      </div>
    );
  }
}

ProfilePageComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePageComponent);
