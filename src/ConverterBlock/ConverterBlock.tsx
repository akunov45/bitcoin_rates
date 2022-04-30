import React from 'react';
import Paper from "@material-ui/core/Paper";
import {FormControl, MenuItem, TextField, Select, InputLabel} from "@material-ui/core";
import CurrencyStore from "../store/currencyStore";
import {inject, observer} from 'mobx-react';

interface ICryptoInput {
  classes: any;
  currencyStore?: CurrencyStore;
}

const ConverterBlock: React.FC<ICryptoInput> = inject('currencyStore')(observer(({classes, currencyStore}) => {
  const coins: string[] = currencyStore!.getItems.map(coin => coin.name)
  return (
    <Paper className={classes.paper}>
      <div className={classes.inputUI}>
        <FormControl fullWidth className={classes.currencyInput}>
          <TextField label="Сумма"/>
        </FormControl>
        <FormControl className={classes.currencyType}>
          <InputLabel id="demo-customized-select-label">Валюта</InputLabel>
          <Select value={coins[0]}
                  onChange={() => {
                  }}>
            {coins.map(name => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.inputUI}>
        <FormControl fullWidth className={classes.currencyInput}>
          <TextField label="Сумма"/>
        </FormControl>
        <FormControl className={classes.currencyType}>
          <InputLabel id="demo-customized-select-label">Валюта</InputLabel>
          <Select value={coins[0]}
                  renderValue={(value) => `${value}`}
                  onChange={() => {
                  }}>
            {coins.map(name => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
}))

export default ConverterBlock;