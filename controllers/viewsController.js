// ANCHOR -- Require Modules --
// const Views = require("../Models/viewsModel");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==
exports.getOverview = (req, res, next) => {
  res.status(200).render("overview", {
    title: "All Tours",
  });
};
// !SECTION
