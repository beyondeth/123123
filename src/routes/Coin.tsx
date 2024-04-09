import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { Outlet, useMatch, PathMatch, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .symbols {
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    justify-content: center;
    text-transform: uppercase;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  overflow: hidden;
  line-height: 1.7;
  max-height: 15em;
  text-overflow: ellipsis;
`;
interface RouteParams {
  coinId: string;
}
interface RouteState {
  state: {
    name: string;
  };
}

export interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  coingecko_rank: number;
  description: { en: string };
  market_data: {
    current_price: {
      krw: number;
    };
    max_supply: number;
    total_supply: number;
    circulating_supply: number;
  };
}
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    font-weight: bolder;
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
  }
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 0px;
  border-radius: 25px;
`;

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<string>();
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState<ICoinData>();
  const chartMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/chart");
  const priceMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/price");

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`,
      headers: { "x-cg-demo-api-key": "CG-pJfk4bgfPhgHCeb6YbR1FCF8" },
    };

    const fetchCoins = async () => {
      try {
        const response = await axios.request(options);
        setInfo(response.data);
        setLoading(false);
        // console.log(info);
        setLoading(false);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchCoins();
  }, []);

  console.log(info);

  // function Coin() {
  //   const [loading, setLoading] = useState(true);
  //   const { coinId } = useParams<string>();
  //   const { state } = useLocation() as RouteState;
  //   const [info, setInfo] = useState<InfoData>();
  //   const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(
  //         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  //       )
  //     ).json();
  //     const priceData = await (
  //       await fetch(
  //         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  //       )
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
        {/* state가 존재하면 name을 불러오고 없으면 로딩... */}
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>#{info?.market_cap_rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <p className="symbols">{info?.symbol}</p>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE</span>
              <span>
                ₩{info?.market_data.current_price.krw.toLocaleString()}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description.en}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{info?.market_data.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{info?.market_data.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}
export default Coin;

// prop 추가방법
// 1. Coin.tsx 하단 Outlet에 context={{coinId}} 추가
// 2. Chart.tsx에 const { coinId } = useOutletContext(ICoinID)();
// * (ICoinID)는 인터페이스니 괄호를 제거하고 부등호로 변경.

// 그리고 니꼬쌤이 만든 api로 하실 경우 start, end 안넣어도 됩니다.
