const styles = theme => ({
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    error: {
      color: theme.palette.error.main
    },
    gridForm: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between"
    },
    gridAround: {
      display: "flex",
      justifyContent: "space-around"
    },
    formControl :{
      width: 250,
      marginLeft: 50
    },
    textArea: {
      height: 150,
    },
    deleteItem :{
      height: 25,
      marginTop: 30,
      padding: 0
    },
  });

  export default styles;