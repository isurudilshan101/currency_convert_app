console.log("as");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL =
    "https://openexchangerates.org/api/currencies.json?app_id=efa5045f7f0644d0b23576b69d68ceae";

  try {
    const nameResponse = await axios.get(nameURL);
    const nameData = nameResponse.data;
    return res.json(nameData);
  } catch (err) {
    console.error(err);
  }
});

app.get("/convert", async (req, res) => {
  const {
    date,
    sourceCurrency,
    targetCurrency,
    amountInSourceCurrency,
    amountInTargetCurrency,
  } = req.query;

  try {
    const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=efa5045f7f0644d0b23576b69d68ceae`;
    const response = await axios.get(dataURL);
    const rates = response.data.rates;
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    const roundedTargetAmount = parseFloat(targetAmount.toFixed(2));
    return res.json(roundedTargetAmount);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`SERVER START ${port} PORT`);
});
