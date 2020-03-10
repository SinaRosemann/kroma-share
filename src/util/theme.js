export default {
    palette: {
      text: {
        primary: '#000',
        secondary: '#000'
      },
      primary: {
        light: '#464646',
        main: '#181818',
        dark: '#101010',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff4f4c',
        main: '#ff2420',
        dark: '#b21916',
        contrastText: '#000',
      },
    },
    typography: {
      color: '#fff',
      h2: {
        color: '#fff'
      }
    },
    spreadThis: {
    grid: {
      textAlign: "center",
    },
    image: {
      margin: 20
    },
    pageTitle: {
      textAlign: "left",
      margin: "10px 0px"
    },
    form: {
      textAlign: "left"
    },
    textField: {
      margin: "10px 0px"
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    customError: {
      color: "#3d0000",
      fontSize: "0.8rem",
      marginTop: 20
    },
    progress: {
        position: 'absolute'
    },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
}
}
