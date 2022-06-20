db.users.updateOne(
  { name: "Maria" },
  {
    $addToSet: {
      hobbies: { title: "Good Wine", frequency: 1 },
    },
  }
);
