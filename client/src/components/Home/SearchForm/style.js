const styles = theme => ({
    fromFilter: {
      paddingLeft: 20,
    },
    text:{
        borderBottom: "1px solid",
        fontStyle: "italic",
    },
    formControl: {
      margin: "15px 8px",
      minWidth: 200,
      [theme.breakpoints.down('sm')]: {
        minWidth: 150,
      },
    },
    select:{
      paddingTop: theme.spacing.unit,
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      background: "#e5e7ea",
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing.unit * 2,
      margin: "20px 30px",
      width: '80%',
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    main: {
      display: "block",
      width: "100%",
      alignItems: "center",
      background: "white",
      border: "1px solid",
      [theme.breakpoints.down("sm")]: {
        display: "block",
        width: 300
      },
    }
  });

export default styles;
