export const styles = theme => ({
  grid: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    }
  },
  gridBig: {
    display: "flex",
    justifyContent: "space-between"
    // [theme.breakpoints.down("sm")]: {
    //   display: "block",
    // },
  },
  form: {
    width: "100%"
  },
  input: {
    width: 350
  },
  btnMarginTop:{
    margin: "15px 0"
  },
  inputTextAddress: {
    width: 280
  },
  inputProfile:{
    width: 400
  },
  flex: {
    display: "flex"
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column"
  },
  inputBig: {
    width: "100%"
  },
  inputSmall: {
    width: "calc(100% - 20px)"
  },
  textArea: {
    minHeight: 150,
    maxHeight: 300,
    margin: 0,
    [theme.breakpoints.down("md")]: {
      maxWidth: 500,
      minWidth: "calc(100% - 20px)"
    },
    maxWidth: 700,
    minWidth: 700,
  },
  submitMain:{
    [theme.breakpoints.down("xs")]: {
      width: 350,
    }
  },
  textError:{
    fontWeight: 500,
    color: "#a14400"
  }
});
