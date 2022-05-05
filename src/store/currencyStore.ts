import {observable, computed, action} from 'mobx'
import {TCoin, TCoinDiff} from "../types";
import axios from "axios";

class CurrencyStore {
  @observable private items: TCoin[] = []
  @observable private diffObj: TCoinDiff = {}

  @computed
  get getItems() {
    return this.items
  }

  @computed
  get getDiffObj() {
    return this.diffObj
  }

  @action
  setItems = (items: TCoin[]): void => {
    this.diffObj = this.diffCurrencies(this.items,items).reduce((initObj: TCoinDiff, obj: TCoin)=>{
      console.log(obj, '----------------obj=============')
      const newObj: TCoin = items.find(o => o.name === obj.name)!
      console.log(newObj,'newObjjjjjjjjjjjjjj')
      const oldDiff: TCoin = this.items.find(item => item.name === newObj.name)!
      console.log(JSON.stringify(oldDiff), 'oldDiff=================')
      console.log(JSON.stringify(newObj), 'newObj=================')
      const color: string = newObj.price === oldDiff.price ? '' : newObj.price > oldDiff.price ? 'green' : 'red'
      initObj[newObj.name] = color
      console.log(initObj, 'initObj==========================')
      return initObj
    },{})
    this.items = items
  }

  @action
  fetchCoins = () => {
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD').then(({data}) => {
      const allCoins: TCoin[] = data.Data.map((coin: any) => {
        const obj: TCoin = {
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          img: 'https://www.cryptocompare.com/' + coin.CoinInfo.ImageUrl,
          price: coin.RAW.USD.PRICE.toFixed(3),
          volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
        }
        return obj
      })
      this.setItems(allCoins)
    })
  }

  diffCurrencies(arr1: TCoin[], arr2: TCoin[]) {
    console.log(JSON.stringify(arr1), '111111111')
    console.log(arr2, '2222222222222')
    return arr1.filter((obj, index) => {
      if (obj.price !== arr2[index].price) {
        return true
      } else {
        return false
      }
    })
  }
}

export default CurrencyStore