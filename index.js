const fs = require("fs");
const csv = require("csv-parser");
const { mean, mediansorted, stdev, min, max } = require("@stdlib/stats/base");
const anova = require("@stdlib/stats/anova1");

let dates = [];
let totalSales = [];
let totalCosts = [];
let marketingExpense = [];
let customersCount = [];
let transactionsCount = [];
let dailyProfit = [];
let profitMargin = [];
let avgTransactionValue = [];
let avgCustomersPerTransaction = [];

fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (row) => {
    const sales = parseFloat(row.Total_Sales);
    const costs = parseFloat(row.Total_Costs);
    const transactions = parseInt(row.Transactions_Count, 10);
    const customers = parseInt(row.Customers_Count, 10);

    const profit = sales - costs;
    const margin = (profit / sales) * 100;
    const avgTransValue = transactions > 0 ? sales / transactions : 0;
    const avgCustPerTrans = transactions > 0 ? customers / transactions : 0;

    dates.push(row.Date);
    totalSales.push(sales);
    totalCosts.push(costs);
    marketingExpense.push(parseFloat(row.Marketing_Expense));
    customersCount.push(customers);
    transactionsCount.push(transactions);
    dailyProfit.push(profit);
    profitMargin.push(margin);
    avgTransactionValue.push(avgTransValue);
    avgCustomersPerTransaction.push(avgCustPerTrans);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
    console.log(
      `\nAnalysis for Dates: ${dates[0]} to ${dates[dates.length - 1]}`
    );
    console.log(
      "\nThis report provides a summary of daily retail store performance."
    );

    printStatistics("Total Sales", totalSales, "$");
    printStatistics("Daily Profit", dailyProfit, "$");
    printStatistics("Profit Margin (%)", profitMargin, "%");
    printStatistics("Avg Transaction Value", avgTransactionValue, "$");
    printStatistics(
      "Avg Customers per Transaction",
      avgCustomersPerTransaction,
      ""
    );
  });

function calculateMean(data) {
  return mean(data.length, data, 1);
}

function calculateMedian(data) {
  return mediansorted(data.length, data, 1);
}

function calculateStandardDeviation(data) {
  return stdev(data.length, 1, data, 1);
}

function calculateMin(data) {
  return min(data.length, data, 1);
}

function calculateMax(data) {
  return max(data.length, data, 1);
}

function printStatistics(name, data, unit) {
  console.log(`\nDescriptive Statistics for ${name}:`);
  console.log(`  Mean: ${unit}${calculateMean(data).toFixed(2)}`);
  console.log(`  Median: ${unit}${calculateMedian(data).toFixed(2)}`);
  console.log(
    `  Standard Deviation: ${unit}${calculateStandardDeviation(data).toFixed(
      2
    )}`
  );
  console.log(`  Min: ${unit}${calculateMin(data).toFixed(2)}`);
  console.log(`  Max: ${unit}${calculateMax(data).toFixed(2)}`);
}
