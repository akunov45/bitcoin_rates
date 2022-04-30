import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CryptoTable from "./CryptoTable/CryptoTable";
import ConverterBlock from "./ConverterBlock/ConverterBlock";
import {useStyles} from "./styles";

function App() {
  React.useEffect(() => {

  }, [])
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CryptoTable  classes={classes}/>
          </Grid>
          <Grid item xs={4}>
            <ConverterBlock classes={classes}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}


export default App;
