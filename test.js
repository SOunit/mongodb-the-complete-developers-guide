db.sales.find({
  $expr: {
    $gt: [
      {
        $cond: {
          if: { $gte: ["$volume", 190] },
          then: { $subtract: ["$volume", 30] },
          else: "$volume",
        },
      },
      "$target",
    ],
  },
});
