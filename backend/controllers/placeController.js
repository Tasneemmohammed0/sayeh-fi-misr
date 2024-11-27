const Place = {
  place_id: 1,
  name: "Pyramids of Giza",
  location: "https://g.co/kgs/4mesQk2",
  image:
    "https://images.unsplash.com/photo-1600520611035-84157ad4084d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  type: "Pharonic",
  breif:
    "The Pyramids of Giza, located near Cairo, Egypt, are iconic ancient wonders built over 4,500 years ago during the Old Kingdom. The site features three main pyramids: the Great Pyramid of Khufu, the Pyramid of Khafre, and the Pyramid of Menkaure. The Great Pyramid, originally 146 meters tall, was the tallest man-made structure for millennia and remains a marvel of ancient engineering. The pyramids served as tombs for pharaohs, designed to ensure their journey to the afterlife, with precise alignments to cardinal points and symbolic connections to Egyptian beliefs. The complex also includes the Great Sphinx, a massive limestone statue with a lion’s body and a human head, likely representing Pharaoh Khafre. As a UNESCO World Heritage Site and the last surviving Wonder of the Ancient World, the Pyramids of Giza symbolize the ingenuity and ambition of ancient Egypt, attracting millions of visitors annually.",
  foreign_adult_ticket_price: 100,
  foreign_child_ticket_price: 50,
  egyptian_adult_ticket_price: 10,
  egyptian_child_ticket_price: 5,
  opening_hours: "8:00 AM - 5:00 PM",
};

exports.getPlace = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      Place,
    },
  });
};
