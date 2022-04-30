import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {TCoin, TCoinDiff} from '../types';
import CurrencyStore from "../store/currencyStore";
import {inject, observer} from "mobx-react";

type ICryptoTable = {
  classes: any;
  currencyStore?: CurrencyStore;
}
// const colors:{[key:string]:string} ={
//   green: '#d8ffc4',
//   red: '#ff5454'
// }
const CryptoTable = inject('currencyStore')(
  observer(({classes, currencyStore}: ICryptoTable) => {
    const allCoins: TCoin[] = currencyStore!.getItems
    const diffObj: TCoinDiff = currencyStore!.getDiffObj

    React.useEffect(() => {
      currencyStore?.fetchCoins()
      setInterval(() => {
        currencyStore?.fetchCoins()
      }, 30 * 1000)
      console.log(diffObj,'diffObj--------------')
    }, [])
    return (
      <Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">FullName</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Volume24Hour</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!allCoins?.length ? 'Loading...' : allCoins?.map((coin) => (
                <TableRow key={coin.name}>
                  <TableCell align="left">
                    <img className={classes.currencyIcon} src={coin.img} alt="coin icon"/>
                  </TableCell>
                  <TableCell align="left">{coin.name}</TableCell>
                  <TableCell align="left">{coin.fullName}</TableCell>
                  <TableCell className={diffObj[coin.name] && classes[`${diffObj[coin.name]}Column`]}
                             align="left">${coin.price}</TableCell>
                  <TableCell align="left">${coin.volume24Hour}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }));

export default CryptoTable;