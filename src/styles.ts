import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(12),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  inputUI: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px auto 20px'
  },
  currencyInput: {
    minWidth: 'calc(70% -10px)',
    marginRight: 10
  },
  currencyType: {
    minWidth: '30%'
  },
  table: {
    minWidth: 650,
  },
  currencyIcon: {
    width: 18,
    height: 18,
    borderRadius: 30
  },
  redColumn: {
    backgroundColor: '#ff5454'
  },
  greenColumn: {
    backgroundColor: '#d8ffc4'
  }
}));