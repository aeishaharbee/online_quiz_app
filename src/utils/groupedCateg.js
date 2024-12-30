export const groupCategories = (categories) => {
  const groups = {
    Entertainment: [],
    ScienceAndTechnology: [],
    CultureAndArts: [],
    HistoryAndGeography: [],
    SportsAndRecreation: [],
    General: [],
  };

  categories.forEach((category) => {
    switch (category.name) {
      case "Entertainment: Books":
      case "Entertainment: Film":
      case "Entertainment: Music":
      case "Entertainment: Musicals & Theatres":
      case "Entertainment: Television":
      case "Entertainment: Video Games":
      case "Entertainment: Board Games":
      case "Entertainment: Comics":
      case "Entertainment: Japanese Anime & Manga":
      case "Entertainment: Cartoon & Animations":
        groups.Entertainment.push(category);
        break;

      case "Science & Nature":
      case "Science: Computers":
      case "Science: Mathematics":
      case "Science: Gadgets":
        groups.ScienceAndTechnology.push(category);
        break;

      case "Art":
      case "Mythology":
      case "Celebrities":
      case "Politics":
        groups.CultureAndArts.push(category);
        break;

      case "History":
      case "Geography":
        groups.HistoryAndGeography.push(category);
        break;

      case "Sports":
      case "Animals":
      case "Vehicles":
        groups.SportsAndRecreation.push(category);
        break;

      case "General Knowledge":
        groups.General.push(category);
        break;

      default:
        break;
    }
  });

  return groups;
};
