import React, { Children, useState, useEffect } from "react";
import ContentTemplate from "../components/ContentTemplate";
import {
  getMostActive,
  getGainers,
  getLosers,
} from "../helpers/iex_api_helper";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Pie } from "../components/charts";

const ContainerGroup3 = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const card = ({ child, index }) => {
    return (
      <div
        className="bg-custom-white shadow border-2 border-gray-500 rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
        key={`portfolio-child-${index}`}
      >
        <div className="flex items-center justify-between mb-4">{child}</div>
      </div>
    );
  };
  return (
    <div className="min-h-80 w-full grid grid-cols-3 gap-8">
      {childrenArray.map((child, index) => card({ child, index }))}
    </div>
  );
};

const ContainerGroup2 = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const card = ({ child, index }) => {
    return (
      <div
        className="bg-custom-white shadow border-2 border-gray-500 rounded-lg p-4"
        key={`portfolio-child-${index}`}
      >
        <div className="flex items-center justify-between mb-4">{child}</div>
      </div>
    );
  };
  return (
    <div className="min-h-80 w-full grid grid-cols-2 gap-8">
      {childrenArray.map((child, index) => card({ child, index }))}
    </div>
  );
};

const RenderList = ({ type, array = [] }) => {
  const spanColor = type === "gainers" ? "text-green-500" : "text-red-500";
  return array.map((stock) => {
    return (
      <div key={stock.symbol} className="w-full">
        <Tooltip id={stock.symbol} />
        <a
          key={stock.symbol}
          data-tooltip-id={stock.symbol}
          data-tooltip-content={stock.companyName}
          data-tooltip-place="bottom"
        >
          <div className="text-white text-md flex justify-between py-[1px] w-full border-b-2 border-gray-600 border-dashed">
            <span className="font-bold text-custom-cyan">{stock.symbol}</span>

            {type === "mostactive" ? (
              <span className="text-custom-yellow">
                {parseFloat(stock.marketCap).toLocaleString("en-US")}
              </span>
            ) : (
              <span className={spanColor}>
                {`${(stock.changePercent * 100).toFixed(2)} %`}
              </span>
            )}
          </div>
        </a>
      </div>
    );
  });
};

const Market = () => {
  const [mostActive, setMostActive] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    (async () => {
      const mostActiveData = await getMostActive();
      setMostActive(mostActiveData);

      const gainersData = await getGainers();
      setGainers(gainersData);

      const losersData = await getLosers();
      setLosers(losersData);
    })();
  }, []);

  const avgTotalVolumeData = mostActive.map((entry) => {
    return {
      id: entry.companyName,
      label: entry.symbol,
      value: entry.avgTotalVolume,
    };
  });

  const changePercentData = mostActive.map((entry) => {
    return {
      id: entry.companyName,
      label: entry.symbol,
      value: parseFloat(entry.changePercent * 100).toFixed(2),
    };
  });

  return (
    <ContentTemplate title="The Stock Market">
      <ContainerGroup2>
        <div className="min-h-50 w-full">
          <h2 className="text-white mb-2 font-bold">
            Most Active Avg. Total Volume Shares
          </h2>
          <Pie data={avgTotalVolumeData} colorScheme="set3" />
        </div>

        <div className="min-h-50 w-full">
          <h2 className="text-white mb-2 font-bold">
            Most Active Change Percent Shares
          </h2>
          <Pie data={changePercentData} colorScheme="nivo" />
        </div>
      </ContainerGroup2>

      <ContainerGroup3>
        <div className="min-h-50 w-full">
          <h2 className="text-white mb-2 font-bold">Most Active</h2>
          <RenderList array={mostActive} type="mostactive" />
        </div>

        <div className="min-h-50 w-full">
          <h2 className="text-white mb-2 font-bold">Gainers</h2>
          <RenderList array={gainers} type="gainers" />
        </div>

        <div className="min-h-50 w-full">
          <h2 className="text-white mb-2 font-bold">Losers</h2>
          <RenderList array={losers} type="losers" />
        </div>
      </ContainerGroup3>
    </ContentTemplate>
  );
};

export default Market;
