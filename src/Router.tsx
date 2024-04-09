import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import Coins from "./routes/Coins";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Coins />,
    },
    {
      path: ":coinId",
      element: <Coin />,
      children: [
        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "price",
          element: <Price />,
        },
      ],
    },

    // react-router-dom 에게 우리가 Root의 자식을 render 하길 원한다고 말해줘야함 Root.tsx로 가서 Outlet 이라는 컴포넌트를 적어줘야함//
  ]
  // errorElement: <NotFound />,
);
export default router;

// prop 추가방법
// 1. Coin.tsx 하단 Outlet에 context={{coinId}} 추가
// 2. Chart.tsx에 const { coinId } = useOutletContext(ICoinID)();
// * (ICoinID)는 인터페이스니 괄호를 제거하고 부등호로 변경.

// 그리고 니꼬쌤이 만든 api로 하실 경우 start, end 안넣어도 됩니다.

// https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false
// https://api.coingecko.com/api/v3/coins/bitcoin?localization=false
// description 숨어있는곳
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&x_cg_demo_api_key=YOUR_API_KEY
// /coins/markets
