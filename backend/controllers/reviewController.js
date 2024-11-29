const Review1 = {
  review_id: 1,
  rating: 3,
  time: "2024-11-28 14:30:00+00",
  title: "A must-visit for history enthusiasts and travelers alike!",
  main_content:
    "The Colosseum is a breathtaking testament to ancient Roman engineering and history. Walking through its massive arches and imagining the gladiatorial battles is an unforgettable experience. The architecture is stunning, with intricate details that have stood the test of time.Guided tours are highly recommended to fully appreciate its history and significance. While it can get crowded, the energy and atmosphere make it worthwhile.",
  user_id: 1,
  place_id: 1,
  name: "Tasneem Mohammed",
  profile_pic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCF3FunYuwPDPL9ovTOR0MQXdDJpW_ofgXA&s",
};

const Review2 = {
  review_id: 2,
  rating: 3,
  time: "2024-11-28 14:30:00+00",
  title: "A must-visit for history enthusiasts and travelers alike!",
  main_content:
    "The Colosseum is a breathtaking testament to ancient Roman engineering and history. Walking through its massive arches and imagining the gladiatorial battles is an unforgettable experience. The architecture is stunning, with intricate details that have stood the test of time.Guided tours are highly recommended to fully appreciate its history and significance. While it can get crowded, the energy and atmosphere make it worthwhile.",
  user_id: 2,
  place_id: 1,
  name: "Tasneem Mohammed",
  profile_pic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCF3FunYuwPDPL9ovTOR0MQXdDJpW_ofgXA&s",
};

const Review3 = {
  review_id: 3,
  rating: 3,
  time: "2024-11-28 14:30:00+00",
  title: "WOOOOOOOOOOOW!",
  main_content:
    "The Colosseum is a breathtaking testament to ancient Roman engineering and history. Walking through its massive arches and imagining the gladiatorial battles is an unforgettable experience. The architecture is stunning, with intricate details that have stood the test of time.Guided tours are highly recommended to fully appreciate its history and significance. While it can get crowded, the energy and atmosphere make it worthwhile.",
  user_id: 2,
  place_id: 1,
  name: "Tasneem Mohammed",
  profile_pic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCF3FunYuwPDPL9ovTOR0MQXdDJpW_ofgXA&s",
};

const Review4 = {
  review_id: 4,
  rating: 3,
  time: "2024-11-28 14:30:00+00",
  title: "Wow!!",
  main_content:
    "The Colosseum is a breathtaking testament to ancient Roman engineering and history. Walking through its massive arches and imagining the gladiatorial battles is an unforgettable experience. The architecture is stunning, with intricate details that have stood the test of time.Guided tours are highly recommended to fully appreciate its history and significance. While it can get crowded, the energy and atmosphere make it worthwhile.",
  user_id: 2,
  place_id: 1,
  name: "Tasneem Mohammed",
  profile_pic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCF3FunYuwPDPL9ovTOR0MQXdDJpW_ofgXA&s",
};

const reviews = [Review1, Review2, Review3, Review4];

exports.getAllReviews = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
};
