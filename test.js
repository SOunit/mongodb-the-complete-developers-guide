db.persons
  .aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        location: {
          type: "Point",
          coordinates: [
            "$location.coordinates.longitude",
            "$location.coordinates.latitude",
          ],
        },
      },
    },
    {
      $project: {
        name: 1,
        gender: 1,
        email: 1,
        location: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
            {
              $substrCP: [
                "$name.first",
                1,
                {
                  $subtract: [{ $strLenCP: "$name.first" }, 1],
                },
              ],
            },
            " ",
            { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
            {
              $substrCP: [
                "$name.last",
                1,
                {
                  $subtract: [{ $strLenCP: "$name.last" }, 1],
                },
              ],
            },
          ],
        },
      },
    },
  ])
  .pretty();
