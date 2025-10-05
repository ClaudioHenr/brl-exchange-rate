import { Component, Input, OnInit } from '@angular/core';
import { DailyExchange } from '../../../core/models/exchange.model';
import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss',
})
export class CurrencyCardComponent implements OnInit {
  @Input({ required: true }) day!: DailyExchange;

  dailyRates: DailyExchange[] = [];

  constructor() {
    this.generateDummyData();
  }
  ngOnInit(): void {
    this.generateDummyData();
  }

  generateDummyData() {
    let lastClose = 5.0;
    for (let i = 0; i < 10; i++) {
      const open = parseFloat((Math.random() * 10).toFixed(2));
      const high = parseFloat((open + Math.random() * 2).toFixed(2));
      const low = parseFloat((open - Math.random() * 2).toFixed(2));
      const close = parseFloat((low + Math.random() * (high - low)).toFixed(2));
      const closeDiff = parseFloat((close - lastClose).toFixed(2));
      lastClose = close;

      this.dailyRates.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        open,
        high,
        low,
        close,
        closeDiff,
      });
    }

    // Ordena do mais antigo para o mais recente
    this.dailyRates.reverse();
  }

}
