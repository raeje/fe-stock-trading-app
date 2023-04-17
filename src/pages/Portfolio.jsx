import React, { Children, useState, useEffect } from "react";
import ContentTemplate from "../components/ContentTemplate";
import { getPortfolio, getMyInfo } from "../helpers/api_helper";
import { Pie } from "../components/charts";

const TH_CLASS = "uppercase font-semibold text-sm";

const ContainerGroup1 = ({ children }) => {
  return (
    <div className="min-h-80 w-full grid grid-cols-1 gap-8">
      <div className="bg-custom-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
        <div className="flex items-center justify-between mb-4">{children}</div>
      </div>
    </div>
  );
};

const ContainerGroup3 = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const card = (child) => {
    return (
      <div className="bg-custom-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
        <div className="flex items-center justify-between mb-4">{child}</div>
      </div>
    );
  };
  return (
    <div className="min-h-80 w-full grid grid-cols-3 gap-8">
      {childrenArray.map((child) => card(child))}
    </div>
  );
};

const PortfolioTable = ({ data }) => {
  // console.log(data);

  const tableRow = (entry) => {
    return (
      <tr className="odd:bg-white even:bg-blue-50" key={entry.ticker}>
        <td className="w-1/12 text-left py-2 px-8">{entry.ticker}</td>
        <td className="w-1/3 text-left py-2 px-8">{entry.company_name}</td>
        <td className="min-w-80 text-right py-3 px-4">
          {entry.total_quantity}
        </td>
        <td className="min-w-80  text-right py-3 px-4">
          {entry.last_traded_price || 0}
        </td>
        <td className="min-w-40  text-right py-3 px-4">
          {entry.last_traded_price * entry.total_quantity || 0}
        </td>
        <td></td>
      </tr>
    );
  };

  return (
    <div className="py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/12 text-center py-3 px-8 uppercase font-semibold text-sm">
                Ticker
              </th>
              <th className="w-1/3 text-center py-3 px-8 uppercase font-semibold text-sm">
                Company Name
              </th>
              <th className="min-w-80 text-center py-3 px-4 uppercase font-semibold text-sm">
                Quantity
              </th>
              <th className="min-w-80 text-center py-3 px-4 uppercase font-semibold text-sm">
                Price
              </th>
              <th className="min-w-40 text-center py-3 px-4 uppercase font-semibold text-sm">
                Total Price
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((entry) => {
              return tableRow(entry);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      const portfolio = await getPortfolio();
      setPortfolio(portfolio.data);

      const userData = await getMyInfo();
      setUser(userData.data);
      console.log("me", userData.data.balance);
    })();
  }, []);

  const stockCountDistributionData = portfolio.map((entry) => {
    return {
      id: entry.company_name,
      label: entry.ticker,
      value: entry.total_quantity,
    };
  });

  const stockValueDistributionData = portfolio.map((entry) => {
    return {
      id: entry.company_name,
      label: entry.ticker,
      value: entry.total_quantity * entry.last_traded_price,
    };
  });

  const fundDistributionData = [
    {
      id: "User Balance",
      label: "USD",
      value: user.balance,
    },
    ...stockValueDistributionData,
  ];

  return (
    <ContentTemplate title="Portfolio">
      <ContainerGroup3>
        <div className="min-h-80 w-full">
          <h2 className="text-white">Fund Distribution</h2>
          <Pie data={fundDistributionData} colorScheme="set3" />
        </div>
        <div className="min-h-80 w-full">
          <h2 className="text-white">Stock Value Distribution</h2>
          <Pie data={stockValueDistributionData} colorScheme="nivo" />
        </div>
        <div className="min-h-80 w-full">
          <h2 className="text-white">Stock Quantity Distribution</h2>
          <Pie data={stockCountDistributionData} />
        </div>
      </ContainerGroup3>

      <ContainerGroup1>
        <div className="min-h-80 w-full flex flex-col">
          <h2 className="text-white">Stocks</h2>
          <PortfolioTable data={portfolio} />
        </div>
      </ContainerGroup1>
    </ContentTemplate>
  );
};

export default Portfolio;
