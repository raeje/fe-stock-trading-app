import React, { Children, useEffect, useState } from "react";
import ContentTemplate from "../components/ContentTemplate";
import SearchBar from "../components/SearchBar";
import {
  getStock,
  getMyInfo,
  createOrder,
  getPortfolio,
} from "../helpers/api_helper";
import { Storefront } from "@mui/icons-material";
import { toast } from "react-toastify";

const ContainerGroup2 = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const card = (child, index) => {
    return (
      <div
        className="w-full bg-custom-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
        key={index}
      >
        {child}
      </div>
    );
  };
  return (
    <div className="min-h-80 w-full grid grid-cols-2 gap-8 mb-8">
      {childrenArray.map((child, index) => card(child, index))}
    </div>
  );
};

const Orders = () => {
  const [userBalance, setUserBalance] = useState(0);

  const [buyStock, setBuyStock] = useState({});
  const [buyStockInput, setBuyStockInput] = useState({});

  const [sellStock, setSellStock] = useState({});
  const [sellStockInput, setSellStockInput] = useState({});
  const [sellSearchedStock, setSellSearchedStock] = useState({});

  const [searchedStock, setSearchedStock] = useState({});

  const localStocks = localStorage.getItem("stocks");
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  const POLLING_TIMEOUT_SECS = 3;
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    updateBuyStock();
    updateSellStock();
    updateUserBalance();
    updatePortfolioStocks();
    const timer = setTimeout(() => {
      setCounter(counter + 1);
      updateBuyStock();
      updateSellStock();
    }, POLLING_TIMEOUT_SECS * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  useEffect(() => {
    const stockObj = JSON.parse(localStocks).filter((item) =>
      item.company_name.includes(buyStockInput)
    );
    setSearchedStock(stockObj[0]);
  }, [buyStockInput]);

  useEffect(() => {
    const stockObj = portfolioStocks.filter((item) =>
      item.company_name.includes(sellStockInput)
    );
    setSellSearchedStock(stockObj[0]);
  }, [sellStockInput]);

  const updateBuyStock = async () => {
    if (!searchedStock) {
      return;
    }
    const buyStock = await getStock({ id: searchedStock.id });
    setBuyStock(buyStock.data);
  };

  const updateSellStock = async () => {
    if (!sellSearchedStock) {
      return;
    }
    const sellStock = await getStock({ id: sellSearchedStock.id });
    setSellStock(sellStock.data);
  };

  const updateUserBalance = async () => {
    const userData = await getMyInfo();
    setUserBalance(userData.data.balance);
  };

  const updatePortfolioStocks = async () => {
    const portfolioStocksData = await getPortfolio();
    setPortfolioStocks(portfolioStocksData.data);
  };

  const inputBuyPrice = document.querySelector("#input-buy-price");
  const setBuyPriceToMarketPrice = () => {
    inputBuyPrice.value = buyStock?.last_traded_price || 1;
  };

  const inputBuyQuantity = document.querySelector("#input-buy-quantity");
  const setBuyQuantityToMax = () => {
    inputBuyQuantity.value = Math.floor(
      userBalance / buyStock.last_traded_price
    );
  };

  const inputSellPrice = document.querySelector("#input-sell-price");
  const setSellPriceToMarketPrice = () => {
    inputSellPrice.value = sellStock?.last_traded_price || 1;
  };

  const inputSellQuantity = document.querySelector("#input-sell-quantity");
  const setSellQuantityToMax = () => {
    inputSellQuantity.value = sellSearchedStock.total_quantity;
  };

  const clearInputs = () => {
    // Buy inputs
    document.querySelector("input[name=buy-order-search]").value = "";
    inputBuyPrice.value = 1;
    inputBuyQuantity.value = 1;
    setBuyStockInput({});

    // Sell inputs
    document.querySelector("input[name=sell-order-search]").value = "";
    inputSellPrice.value = 1;
    inputSellQuantity.value = 1;
    setSellStockInput({});
  };

  const handleCreateOrder = async (category) => {
    let orderForm = {
      price: inputBuyPrice?.value,
      quantity: inputBuyQuantity?.value,
      stocks_id: searchedStock?.id,
    };
    if (category === "sell") {
      orderForm = {
        price: inputSellPrice.value,
        quantity: inputSellQuantity.value,
        stocks_id: sellSearchedStock.id,
      };
    }
    await createOrder({
      category,
      ...orderForm,
    });
    toast.success(`${category.toUpperCase()} order created!`);
    clearInputs();
  };

  return (
    <ContentTemplate
      title="Orders"
      info={parseFloat(userBalance).toLocaleString("en-US")}
    >
      <ContainerGroup2>
        <div id="buy-order-container w-full mb-12" key="buy-order-container">
          <h2 className="text-green-500 mb-4 text-xl">Buy Order</h2>
          <div className="rounded-2xl border-2 border-gray-500 p-8">
            <SearchBar
              componentId="buy-order-search"
              data={localStocks}
              setStock={setBuyStockInput}
            />

            <div className="grid grid-cols-2 w-full bg-teal-100 border border-gray-300 rounded-xl">
              <div className="col-span-2 p-2 flex flex-col items-center box-border ">
                <span className="text-center text-xs">LAST TRADED PRICE</span>
                <span className="text-center text-3xl font-bold text-green-500 p-2">
                  $ {buyStock?.last_traded_price || 0.0}
                </span>
              </div>
            </div>
            <div className="mt-2 w-full text-white pl-4">
              <span className="text-sm pr-2">TICKER:</span>
              <span className="text-sm font-bold text-yellow-500">
                {searchedStock?.ticker}
              </span>
            </div>
            <div className="mt-2 w-full text-white pl-4">
              <span className="text-sm pr-2">AS OF:</span>
              <span className="text-sm font-bold text-yellow-500">
                {new Date(Date.now()).toUTCString()}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-green-500 p-8 mt-4 ">
            <div className="grid grid-cols-4 gap-8 mb-4 items-center relative">
              <label labelfor="buy-price" className="col-span-1 text-white">
                Buy Price
              </label>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none col-span-3 text-right py-2 pr-[75px] text-lg border rounded-lg "
                type="number"
                id="input-buy-price"
                min="1"
                defaultValue="1"
              />
              <button
                className="bg-green-500 text-white border-0 rounded-lg w-[65px] py-2 first-line:text-md absolute right-[1px]"
                onClick={setBuyPriceToMarketPrice}
              >
                <Storefront />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-4 items-center relative">
              <label
                labelfor="input-buy-quantity"
                className="col-span-1 text-white"
              >
                Quantity
              </label>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none col-span-3 text-right py-2 pr-[75px] text-lg border rounded-lg"
                type="number"
                id="input-buy-quantity"
                min="1"
                defaultValue="1"
              />
              <button
                className="bg-green-500 text-white border-0 rounded-lg w-[65px] py-2 first-line:text-md absolute right-[1px]"
                onClick={setBuyQuantityToMax}
              >
                MAX
              </button>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-4 items-center relative">
              <span className="col-span-1 text-white text-xl font-bold">
                TOTAL
              </span>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none col-span-3 text-right py-2 pr-[25px] text-2xl border rounded-lg disabled:opacity-95 text-green-500 font-bold bg-gray-200"
                type="number"
                id="input-buy-quantity"
                min="1"
                defaultValue="1"
                disabled
                value={(
                  buyStock?.last_traded_price * inputBuyQuantity?.value
                ).toFixed(2)}
              />
            </div>
            <button
              className="bg-green-500 text-white w-full text-lg py-2 border-0 rounded-lg mt-4"
              onClick={() => handleCreateOrder("buy")}
            >
              PLACE BUY ORDER
            </button>
          </div>
        </div>

        <div id="sell-order-container" key="sell-order-container">
          <h2 className="text-red-500 mb-4 text-xl">Sell Order</h2>
          <div className="rounded-2xl border-2 border-gray-500 p-8">
            <SearchBar
              componentId="sell-order-search"
              data={portfolioStocks}
              setStock={setSellStockInput}
            />

            <div className="grid grid-cols-2 w-full bg-pink-100 border border-gray-300 rounded-xl">
              <div className="col-span-2 p-2 flex flex-col items-center box-border ">
                <span className="text-center text-xs">LAST TRADED PRICE</span>
                <span className="text-center text-3xl font-bold text-red-500 p-2">
                  $ {sellStock?.last_traded_price || 0.0}
                </span>
              </div>
            </div>
            <div className="mt-2 w-full text-white pl-4">
              <span className="text-sm pr-2">TICKER:</span>
              <span className="text-sm font-bold text-yellow-500">
                {sellSearchedStock?.ticker}
              </span>
            </div>
            <div className="mt-2 w-full text-white pl-4">
              <span className="text-sm pr-2">LAST UPDATED:</span>
              <span className="text-sm font-bold text-yellow-500">
                {new Date(Date.now()).toUTCString()}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-red-500 p-8 mt-4 ">
            <div className="grid grid-cols-4 gap-8 mb-4 items-center relative">
              <label labelfor="sell-price" className="col-span-1 text-white">
                Sell Price
              </label>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none col-span-3 text-right py-2 pr-[75px] text-lg border rounded-lg "
                type="number"
                id="input-sell-price"
                min="1"
                defaultValue="1"
              />
              <button
                className="bg-red-500 text-white border-0 rounded-lg w-[65px] py-2 first-line:text-md absolute right-[1px]"
                onClick={setSellPriceToMarketPrice}
              >
                <Storefront />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-4 items-center relative">
              <label
                labelfor="input-sell-quantity"
                className="col-span-1 text-white"
              >
                Quantity
              </label>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none col-span-3 text-right py-2 pr-[75px] text-lg border rounded-lg"
                type="number"
                id="input-sell-quantity"
                min="1"
                defaultValue="1"
              />
              <button
                className="bg-red-500 text-white border-0 rounded-lg w-[65px] py-2 first-line:text-md absolute right-[1px]"
                onClick={setSellQuantityToMax}
              >
                MAX
              </button>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-4 items-center relative">
              <span className="col-span-1 text-white text-xl font-bold">
                TOTAL
              </span>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none col-span-3 text-right py-2 pr-[25px] text-2xl border rounded-lg disabled:opacity-95 text-red-500 font-bold bg-gray-200"
                type="number"
                id="input-sell-total"
                min="1"
                defaultValue="1"
                disabled
                value={(
                  sellStock?.last_traded_price * inputSellQuantity?.value
                ).toFixed(2)}
              />
            </div>
            <button
              className="bg-red-500 text-white w-full text-lg py-2 border-0 rounded-lg mt-4"
              onClick={() => handleCreateOrder("sell")}
            >
              PLACE SELL ORDER
            </button>
          </div>
        </div>
      </ContainerGroup2>
    </ContentTemplate>
  );
};

export default Orders;
