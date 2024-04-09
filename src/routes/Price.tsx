// import { useQuery } from "@tanstack/react-query";
// import { Outlet, useOutletContext, useParams } from "react-router-dom";
// import { fetchCoinPrice } from "../api";
// import ReactApexChart from "react-apexcharts";

// export interface CoinInterfaces {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   market_cap: number;
//   market_cap_rank: number;
//   fully_diluted_valuation: number;
//   total_volume: number;
//   high_24h: number;
//   low_24h: number;
//   price_change_24h: number;
//   price_change_percentage_24h: number;
//   market_cap_change_24h: number;
//   market_cap_change_percentage_24h: number;
//   circulating_supply: number;
//   total_supply: number;
//   max_supply: number;
//   ath: number;
//   ath_change_percentage: number;
//   ath_date: string;
//   atl: number;
//   atl_change_percentage: number;
//   atl_date: string;
//   roi: null;
//   last_updated: string;
// }

// interface ChartPropss {
//   coinId: string;
// }

// function Price() {
//   //   const { coinId } = useParams<{ coinId: string }>();
//   const { coinId } = useOutletContext<ChartPropss>();
//   const { isLoading: tickersLoading, data: tickersData } =
//     useQuery<CoinInterfaces>({
//       queryKey: ["x-cg-demo-api-key : CG-pJfk4bgfPhgHCeb6YbR1FCF8", coinId],
//       queryFn: () => fetchCoinPrice(coinId),
//     });
//   console.log(tickersData);
//   // const { isLoading: tickersLoading, data: tickersData } = useQuery<CoinInterfaces[]>(
//   //     ["tickers", coinId],
//   //     () => fetchCoinPrice(coinId!)
//   //   );

//   return (
//     <div>
//       <h1>Price</h1>
//       <h1 key={coinId}>{tickersData?.current_price}</h1>
//       <Outlet context={{ coinId }} />
//     </div>
//   );
// }
// export default Price;

function Price() {
  return (
    <div>
      <h1 color="tomato">PRICE</h1>
    </div>
  );
}

export default Price;
