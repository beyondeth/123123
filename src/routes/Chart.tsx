import { useQuery } from "@tanstack/react-query";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IHistorical extends Array<number> {}

interface ChartProps {
  coinId: string;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  //   const { coinId } = useParams<{ coinId: string }>();
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["x-cg-demo-api-key : CG-pJfk4bgfPhgHCeb6YbR1FCF8", coinId],
    queryFn: () => fetchCoinHistory(coinId!),
  });
  console.log(data);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((item) => item[4]) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((item) => item[0]) as number[],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `₩ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
      <Outlet context={{ coinId }} />
    </div>
  );
}

export default Chart;

{
  /* // prop 추가방법
// 1. Coin.tsx 하단 Outlet에 context={{coinId}} 추가
// 2. Chart.tsx에 const { coinId } = useOutletContext(ICoinID)();
// * (ICoinID)는 인터페이스니 괄호를 제거하고 부등호로 변경.

// 그리고 니꼬쌤이 만든 api로 하실 경우 start, end 안넣어도 됩니다.

// - Chart.tsx
// ohlcv 불러오기 API
// https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}
// API 사용 시,
// useQuery의 타입을 number[][] 로 지정해주면 에러없이 사용할 수 있었습니다. */
}
