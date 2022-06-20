db.users.updateOne(
  { name: "Maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "Good Wine", frequency: 1 },
          { title: "Watch Movies", frequency: 2 },
        ],
      },
    },
    $sort: { frequency: -1 },
  }
);
