# Stdlib Showcase

A Node.js application that demonstrates the usage of the `@stdlib/stdlib` package for statistical analysis of retail store data. This project processes CSV data containing daily retail metrics and calculates various statistical measures using the stdlib library.

## Features

- Processes CSV data containing daily retail store metrics
- Calculates key statistical measures:
  - Mean
  - Median
  - Standard Deviation
  - Minimum
  - Maximum
- Analyzes various retail metrics including:
  - Total Sales
  - Daily Profit
  - Profit Margin
  - Average Transaction Value
  - Average Customers per Transaction

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jsndz/stdlib-showcase.git
cd stdlib-showcase
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Ensure your data is in a CSV file named `data.csv` with the following columns:

   - Date
   - Total_Sales
   - Total_Costs
   - Marketing_Expense
   - Customers_Count
   - Transactions_Count

2. Run the application:

```bash
node index.js
```

The application will process the CSV file and output statistical analysis for various retail metrics.

## Dependencies

- `@stdlib/stdlib`: For statistical calculations
- `csv-parser`: For parsing CSV files
- `commander`: For command-line argument parsing
