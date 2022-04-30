import ConverterStore from "./converterStore";
import CurrencyStore from "./currencyStore";

const stores ={
  currencyStore: new CurrencyStore(),
  converterStore: new ConverterStore()
}
export default stores