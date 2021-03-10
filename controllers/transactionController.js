// ANCHOR -- Require Modules --
const Transaction = require("../Models/transactionModel");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Get All Transactions --
module.exports.getAllTransactions = catchAsync(async (req, res, next) => {
  // 1) Get all transactions in DB
  const transactions = await Transaction.find();
  // 2) show error message if no transaction was found
  if (!transactions) console.alert("Could not find any transactions.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully found all transactions",
    results: transactions.length,
    data: transactions,
  });
});

// ANCHOR -- Create Transaction --
module.exports.createTransaction = catchAsync(async (req, res, next) => {
  // 1) Create transaction in DB
  const transaction = await Transaction.create(req.body);
  // 2) show error message if no transaction was found
  if (!transaction) console.alert("Could not create transaction.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully created transaction",
    data: transaction,
  });
});

// ANCHOR -- Get Transaction By ID --
module.exports.getTransaction = catchAsync(async (req, res, next) => {
  // 1) Find transaction in DB
  const transaction = await Transaction.findById(req.params.id);
  // 2) show error message if no transaction was found
  if (!transaction) console.alert("Could not transaction by that ID.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully found transaction",
    data: transaction,
  });
});

// ANCHOR -- Update Transaction --
module.exports.updateTransaction = catchAsync(async (req, res, next) => {
  // 1) Find transaction in DB and update it
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  // 2) show error message if no transaction was found
  if (!transaction) console.alert("Could not update transaction.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully updated transaction",
    data: transaction,
  });
});

// ANCHOR -- Delete Transaction --
module.exports.deleteTransaction = catchAsync(async (req, res, next) => {
  // 1) find transaction in DB and delete
  const transaction = await Transaction.findByIdAndRemove(req.params.id);
  // 2) show error message if no transaction was found
  if (!transaction) console.alert("No transaction with that ID was found");
  // 3) send successful response
  res.status(200).json({
    status: "successfully deleted transaction",
    data: transaction,
  });
});
// !SECTION
