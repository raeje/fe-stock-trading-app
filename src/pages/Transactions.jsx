import React, { Children, useState, useEffect } from "react";
import { getMyOrders, getMyInfo } from "../helpers/api_helper";
import ContentTemplate from "../components/ContentTemplate";
import { Pie } from "../components/charts";

const ChartCard = ({ children }) => {
  return (
    <div className="bg-custom-white shadow rounded-lg p-4 border-gray-500 border-2">
      <div className="flex items-center justify-between mb-4">{children}</div>
    </div>
  );
};

const renderCategory = (category) => {
  const color = category === "buy" ? "green" : "red";
  return (
    <span className={`text-${color}-500 font-bold`}>
      {category.toUpperCase()}
    </span>
  );
};

const renderStatus = (status) => {
  const color = status === "fulfilled" ? "green" : "blue";
  return (
    <span className={`text-${color}-500 font-bold`}>
      {status.toUpperCase()}
    </span>
  );
};

const OrdersTable = ({ data = [] }) => {
  const tableRow = (entry) => {
    return (
      <tr className="odd:bg-white even:bg-blue-50" key={entry.ticker}>
        <td className="w-1/12 text-center py-2 px-2">
          {renderCategory(entry.category)}
        </td>
        <td className="w-1/4 text-left text-xs first-line:py-2 px-2">
          {entry.company_name}
        </td>
        <td className="min-w-80 text-right py-3 px-2">{entry.quantity}</td>
        <td className="min-w-80  text-right py-3 px-2">{entry.price || 0}</td>
        <td className="min-w-40  text-right py-3 px-2">
          {(entry.price * entry.quantity).toFixed(2) || 0}
        </td>
        <td className="min-w-40 text-center text-xs py-3 px-2">
          {renderStatus(entry.status)}
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
              <th className="w-1/12 text-center py-3 px-2 uppercase font-semibold text-xs">
                Category
              </th>
              <th className="w-1/4 text-center py-3 px-2 uppercase font-semibold text-xs">
                Company Name
              </th>
              <th className="min-w-80 text-center py-3 px-2 uppercase font-semibold text-xs">
                Quantity
              </th>
              <th className="min-w-80 text-center py-3 px-2 uppercase font-semibold text-xs">
                Price
              </th>
              <th className="min-w-40 text-center py-3 px-2 uppercase font-semibold text-xs">
                Est. Total Price
              </th>
              <th className="text-center py-3 px-2 uppercase font-semibold text-xs">
                Status
              </th>
              <th className="text-center py-3 px-2 uppercase font-semibold text-xs">
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

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const myOrders = await getMyOrders();
      setOrders(myOrders.data);

      const userData = await getMyInfo();
      setUserBalance(userData.data.balance);
    })();
  }, []);

  const ordersBuyData = {
    id: "BUY",
    label: "Buy Orders",
    value: orders.filter((order) => order.category === "buy").length,
  };
  const ordersSellData = {
    id: "SELL",
    label: "Sell Orders",
    value: orders.filter((order) => order.category === "sell").length,
  };

  const ordersCountByStatusData = [
    {
      id: "PLACED",
      label: "Placed",
      value: orders.filter((order) => order.status === "placed").length,
    },
    {
      id: "FULFILLED",
      label: "Fulfilled",
      value: orders.filter((order) => order.status === "fulfilled").length,
    },
    {
      id: "CANCELLED",
      label: "Cancelled",
      value: orders.filter((order) => order.status === "cancelled").length,
    },
  ];

  const buyOrdersValue = orders
    .filter((order) => order.category === "buy")
    .reduce((sum, order) => sum + order.quantity * order.price, 0)
    .toFixed(2);

  const sellOrdersValue = orders
    .filter((order) => order.category === "sell")
    .reduce((sum, order) => sum + order.quantity * order.price, 0)
    .toFixed(2);

  const ordersByCategoryValueData = [
    {
      id: "BUY",
      label: "Buy Orders",
      value: buyOrdersValue,
    },
    {
      id: "SELL",
      label: "Sell Orders",
      value: sellOrdersValue,
    },
  ];

  return (
    <ContentTemplate
      title="Transactions"
      info={parseFloat(userBalance).toLocaleString("en-US")}
    >
      <div className="min-h-80 w-full grid grid-cols-3 gap-8">
        <div className="bg-custom-white rounded-lg col-span-2 w-full p-8 border-2 border-gray-500">
          <div className="min-h-80 w-full flex flex-col">
            <h2 className="text-white">Transaction History</h2>
            <OrdersTable data={orders} />
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-8">
          <ChartCard>
            <div className="min-h-80 w-full">
              <h2 className="text-white">Orders Count By Status</h2>
              <Pie data={ordersCountByStatusData} />
            </div>
          </ChartCard>
          <ChartCard>
            <div className="min-h-80 w-full">
              <h2 className="text-white">Orders By Category Value</h2>
              <Pie data={ordersByCategoryValueData} colorScheme="set3" />
            </div>
          </ChartCard>
          <ChartCard>
            <div className="min-h-80 w-full">
              <h2 className="text-white">Orders Count By Category</h2>
              <Pie data={[ordersBuyData, ordersSellData]} colorScheme="nivo" />
            </div>
          </ChartCard>
        </div>
      </div>
    </ContentTemplate>
  );
};

export default Transactions;
