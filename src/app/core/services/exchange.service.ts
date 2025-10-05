import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrentExchange, DailyExchange } from '../models/exchange.model';
import { map, Observable } from 'rxjs';
import { Currency, CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private readonly baseUrl = environment.apiUrl;
  private readonly apiKey = environment.apiKey;

  constructor(
    private http: HttpClient,
    private currencyService: CurrencyService
  ) {}

  // getSymbol(code: string): string {
  //   const 
  // }

  getCurrentRate(fromSymbol: string, toSymbol: string = "BRL"): Observable<CurrentExchange> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('from_symbol', fromSymbol.toUpperCase())
      .set('to_symbol', toSymbol.toUpperCase());

    return this.http.get<CurrentExchange>(`${this.baseUrl}/currentExchangeRate`, { params })
    .pipe(
      map(res => ({
        success: res.success,
        fromSymbol: res.fromSymbol,
        toSymbol: res.toSymbol,
        fromSymbolIcon: this.currencyService.getSymbolIcon(res.fromSymbol),
        toSymbolIcon: this.currencyService.getSymbolIcon(res.toSymbol),
        lastUpdatedAt: res.lastUpdatedAt,
        exchangeRate: res.exchangeRate || 0
      }))
    );
  }

  getDailyRates(fromSymbol: string, toSymbol: string = "BRL", days: number = 30): Observable<DailyExchange[]> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('from_symbol', fromSymbol.toUpperCase())
      .set('to_symbol', toSymbol.toUpperCase());

    return this.http
      .get<any>(`${this.baseUrl}/dailyExchangeRate`, { params })
      .pipe(
        map((res) => {
          const data = res.data || [];
          return data.map((d: any, i: number, arr: any[]) => ({
            date: d.date,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
            closeDiff: i > 0 ? this.calculateCloseDiff(d.close, arr[i - 1].close) : 0,
          }));
        })
      );
  }

  calculateCloseDiff(closeValue: number, closeValueYesterday: number): number {
    return ((closeValue - closeValueYesterday) / closeValueYesterday) * 100
  }

}
