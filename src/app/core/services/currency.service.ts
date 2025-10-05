import { Injectable } from '@angular/core';
import currenciesData from '../../../assets/fake_data/currencies.json';

export interface Currency {
  code: string;
  symbolIcon: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencies: Currency[] = currenciesData;

  getCurrencyByCode(code: string): Currency | undefined {
    return this.currencies.find(c => c.code === code.toUpperCase());
  }

  isValidCurrency(code: string): boolean {
    return this.currencies.some(c => c.code === code.toUpperCase());
  }

  getAllCurrencies(): Currency[] {
    return this.currencies;
  }

  getSymbolIcon(code: string): string {
    const currency: Currency | undefined = this.currencies.find(c => c.code === code.toUpperCase());
    return currency ? currency.symbolIcon : code
  }

}
