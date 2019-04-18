const styles = theme=>({
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
    padding: "10px 30px 0 0",
    fontFamily: "sans-serif",
    [theme.breakpoints.down('xs')]: {
      display: "block",
    },
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  text: {
    borderBottom: "1px solid"
  }
});
export default styles;
