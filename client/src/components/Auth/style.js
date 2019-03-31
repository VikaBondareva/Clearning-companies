const styles = theme => ({
    main: {
      width: 'auto',
      display: 'flex', 
      justifyContent: "center",
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    mainSmall:{
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
      },
    },
    mainBig: {
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 600,
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    error: {
      color: theme.palette.error.main
    },
    grid: {
      display: "flex",
      justifyContent: "space-evenly"
    },
    formControl :{
      width: 450,
      marginLeft: 50
    },
    textArea: {
      height: 150,
    }
  });

  export default styles;