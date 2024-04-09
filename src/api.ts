export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=krw&days=7`
  ).then((response) => response.json());
}

export function fetchCoinPrice(coinId: string) {
  return fetch(
    `api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=krw&days=7`
  ).then((response) => response.json());
}
