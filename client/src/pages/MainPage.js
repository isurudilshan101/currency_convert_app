import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [date, setDate] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState();
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(date, sourceCurrency, targetCurrency, amountInSourceCurrency);
      console.log("testing");

      const response = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
          amountInTargetCurrency,
        },
      });
      setAmountInTargetCurrency(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getCurrencyName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        console.log(response);

        setCurrencyNames(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyName();
  }, []);

  console.log(currencyNames);

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert your currencies
      </h1>
      <p className="lg:mx-32 opacity-40 py-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
        convallis dictum. Vestibulum ante ipsum primis in faucibus orci luctus
        et ultrices posuere cubilia curae; Nulla cursus sodales maximus. Nam
        tempus sit amet sapien ut aliquam. Nulla nec massa eu diam ornare
        accumsan. Phasellus blandit, eros id auctor pretium, enim dui fermentum
        nunc, ut tempor erat purus a ex. Nam aliquam mi lobortis orci varius
      </p>

      <div className="mt-4 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="name@flowbite.com"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  // console.log(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Source Currency
              </label>

              <select
                onChange={(e) => {
                  setSourceCurrency(e.target.value);
                  // console.log(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                value={sourceCurrency}
                name=""
                id=""
              >
                {Object.keys(currencyNames).map((currency) => {
                  return (
                    <option className="p-1" key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Target Currency
              </label>

              <select
                onChange={(e) => {
                  setTargetCurrency(e.target.value);
                  // console.log(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                value={targetCurrency}
                name=""
                id=""
              >
                {Object.keys(currencyNames).map((currency) => {
                  return (
                    <option className="p-1" key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium  dark:text-white"
              >
                Amount In Source Currency
              </label>
              <input
                onChange={(e) => {
                  setAmountInSourceCurrency(e.target.value);
                }}
                value={amountInSourceCurrency}
                type="text"
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="  Amount In Source Currency"
                required
              />
            </div>

            <div>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
                Get the Target Currency
              </button>
            </div>

            {!loading ? (
              <div>
                {amountInSourceCurrency} {currencyNames[sourceCurrency]} Equel
                to{" "}
                <span className="pt-10 text-yellow-500 font-semibold text-xl">
                  {" "}
                  {amountInTargetCurrency}
                </span>{" "}
                {currencyNames[targetCurrency]}
              </div>
            ) : null}
          </form>
        </section>
      </div>
    </div>
  );
}
