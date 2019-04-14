export const styles = theme => ({
  grid: {
    display: "flex",
    justifyContent: "space-between"
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
    width: 350,
    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 20px)"
    }
  },
  inputText: {
    width: 350
  },
  inputTextAddress: {
    width: 280
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
  }
});
