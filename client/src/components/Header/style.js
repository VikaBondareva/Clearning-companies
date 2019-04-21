const styles = theme => ({
    root: {
      width: '100%',
    },
    navbar: {
      background: theme.palette.primary.main
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      marginLeft: 150,
      [theme.breakpoints.down('md')]: {
        marginLeft: 10,
      },
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: 'none'
    },
    linkMenu: {
      color: theme.palette.text.primary,
      textDecoration: 'none'
    },
    btnLink: {
      background: theme.palette.common.white
    },
    sectionDesktop: {
      display: 'none',
      marginRight: 100,
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    menuHeader: {
      color: theme.palette.secondary.main
    },
    logo:{
    	width: 100,
    	height: 50
    }
  });

export default styles;