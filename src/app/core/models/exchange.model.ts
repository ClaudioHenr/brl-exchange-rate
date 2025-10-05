export interface CurrentExchange {
    success: boolean
    fromSymbol: string;
    toSymbol: string;
    fromSymbolIcon?: string;
    toSymbolIcon?: string;
    lastUpdatedAt: string;
    exchangeRate: number
}

export interface DailyExchange {
    date: string;
    close: number;
    high: number;
    low: number;
    open: number;
    closeDiff?: number;
}

//   "data": [
//     {
//       "close": 0,
//       "date": "2025-10-04T22:52:37.946Z",
//       "high": 0,
//       "low": 0,
//       "open": 0
//     }
//   ],
//   "from": "string",
//   "lastUpdatedAt": "2025-10-04T22:52:37.946Z",
//   "rateLimitExceeded": true,
//   "success": true,
//   "to": "string"

