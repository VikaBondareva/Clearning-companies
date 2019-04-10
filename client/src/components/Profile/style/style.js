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
    width: "calc(80% - 150px)",
    padding: "10px 30px 0 0",
    fontFamily: "sans-serif"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  text: {
    borderBottom: "1px solid"
  },
  table: {
    width: 700
  }
});
export default styles;
