import green from '@material-ui/core/colors/green';

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
      background: theme.palette.secondary.light,
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    formCode:{
      width: '100%',
      margin : "10px 0",
    },
    btnMargin: {
      margin: "10px 5px"
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
    },
    deleteItem :{
      height: 25,
      marginTop: 30,
      padding: 0
    },
    stepper: {
      background: theme.palette.secondary.light
    },
    root: {
      color: green[600],
      '&$checked': {
        color: green[500],
      },
    },
    checked: {},
  });

  export default styles;