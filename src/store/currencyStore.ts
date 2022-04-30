import {observable, computed, action} from 'mobx'
import {TCoin, TCoinDiff} from "../types";
import axios from "axios";
import store from "./index";

class CurrencyStore {
  @observable private coins: TCoin[] = []
  @observable private diffObj: TCoinDiff = {}

  @computed
  get getItems() {
    return this.coins
  }

  @computed
  get getDiffObj() {
    return this.diffObj
  }

  @action
  setItems = (items: TCoin[]): void => {
    this.diffObj = this.diffCurrencies(this.coins, items).reduce((initObj: TCoinDiff, obj: TCoin) => {
      const newObj: TCoin = items.find(o => o.name === obj.name)!
      const oldDiff: TCoin = this.coins.find(item => item.name === newObj.name) || obj
      const color: string = newObj.price === oldDiff.price ? '' : newObj.price > oldDiff.price ? 'green' : 'red'
      initObj[newObj.name] = color
      return initObj
    }, {})
    this.coins = items
  }

  @action
  fetchCoins = () => {
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD').then(({data}) => {
      const allCoins: TCoin[] = data.Data.map((coin: any) => {
        console.log(coin)
        const obj: TCoin = {
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          img: 'https://www.cryptocompare.com/' + coin.CoinInfo.ImageUrl,
          price: coin.RAW.USD.PRICE.toFixed(3),
          volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
        }
        return obj
      })
      console.log(data.Data, 'res')
      this.setItems(allCoins)
    })
    return []
  }

  diffCurrencies(arr1
                   :
                   TCoin[], arr2
                   :
                   TCoin[]
  ) {
    return arr1.filter((obj, index) => {
      if (obj.name !== arr2[index].name) {
        return true;
      } else {
        return false;
      }
    })

  }


}

export default CurrencyStore