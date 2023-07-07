const { v4: uuidv4 } = require("uuid");

const generateObjectId = () => {
  const uuid = uuidv4().replace(/-/g, "");
  return uuid.slice(0, 24);
};

const defaultCategories = [
  {
    nameUk: "Авто",
    nameEn: "Auto",
    type: "expense",
    color: "#9c27b0",
    _id: generateObjectId(),
  },
  {
    nameUk: "Їжа",
    nameEn: "Food",
    type: "expense",
    color: "#673ab7",
    _id: generateObjectId(),
  },
  {
    nameUk: "Комуналка",
    nameEn: "Utility payments",
    type: "expense",
    color: "#ff9800",
    _id: generateObjectId(),
  },
  {
    nameUk: "Діти",
    nameEn: "Children",
    type: "expense",
    color: "#2196f3",
    _id: generateObjectId(),
  },
  {
    nameUk: "Спорт",
    nameEn: "Sport",
    type: "expense",
    color: "#ffeb3b",
    _id: generateObjectId(),
  },
  {
    nameUk: "Освіта",
    nameEn: "Education",
    type: "expense",
    color: "#e91e63",
    _id: generateObjectId(),
  },
  {
    nameUk: "Здоров'я",
    nameEn: "Health",
    type: "expense",
    color: "#3f51b5",
    _id: generateObjectId(),
  },
  {
    nameUk: "Медицина",
    nameEn: "Medicine",
    type: "expense",
    color: "#673ab7",
    _id: generateObjectId(),
  },
  {
    nameUk: "Зарплата",
    nameEn: "Salary",
    type: "income",
    color: "#4caf50",
    _id: generateObjectId(),
  },
  {
    nameUk: "Подарунок",
    nameEn: "Gift",
    type: "income",
    color: "#75D7B4",
    _id: generateObjectId(),
  },
  {
    nameUk: "Халява",
    nameEn: "Haliava",
    type: "income",
    color: "#00bcd4",
    _id: generateObjectId(),
  },
];

module.exports = { defaultCategories };
module.exports = { generateObjectId };
