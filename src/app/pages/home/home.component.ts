import { Component, OnInit } from '@angular/core';
import { CurrentExchange, DailyExchange } from '../../core/models/exchange.model';
import { ExchangeService } from '../../core/services/exchange.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyCardComponent } from '../../shared/components/currency-card/currency-card.component';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currencyCode: string = 'USD';
  currentRate?: CurrentExchange;
  dailyRates: DailyExchange[] = [];
  loading: boolean = false;
  error: string = '';
  currentYear: number = 2025;
  showLast30: boolean = false;
  isValid = true;

  constructor(
    private exchangeService: ExchangeService,
    private currencyService: CurrencyService
  ) {}

  checkInput() {
    if (!this.currencyCode) {
      this.isValid = true;
      return;
    }
    this.isValid = this.currencyService.isValidCurrency(this.currencyCode)
  }

  fetchExchange() {
    if (!this.currencyCode) return;
    this.loading = true;
    this.error = '';

    this.exchangeService.getCurrentRate(this.currencyCode).subscribe({
      next: (res) => {
        this.currentRate = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao buscar cotação atual.';
        this.loading = false;
      },
    });
  }

  fetchLast30Days() {
    if (!this.currencyCode) return;
    this.showLast30 = !this.showLast30;
    this.loading = true;
    this.error = '';

    this.exchangeService.getDailyRates(this.currencyCode).subscribe({
      next: (res) => {
        this.dailyRates = res.slice(0, 30);
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao buscar histórico.';
        this.loading = false;
      },
    });
  }


}
