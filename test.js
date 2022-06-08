db.movies.find({
  $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }],
});
