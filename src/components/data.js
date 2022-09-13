const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
];

const questions = [
  { category_id: 1, id: 1, question: "Test question one" },
  { category_id: 1, id: 4, question: "Test question two" },
  { category_id: 2, id: 2, question: "Test question one category 2" },
  { category_id: 3, id: 3, question: "Test question one category 3" },
];

const choices = [
  { question_id: 1, id: 1, choice: "Extremly quick" },
  { question_id: 1, id: 2, choice: "Quite quick" },
  { question_id: 1, id: 3, choice: "Slightly quick" },
  { question_id: 1, id: 4, choice: "Moderately quick" },
  { question_id: 2, id: 5, choice: "Extremly quick 2" },
  { question_id: 2, id: 6, choice: "Quite quic 2k" },
  { question_id: 3, id: 7, choice: "Slightly quick 3" },
  { question_id: 3, id: 8, choice: "Moderately quick 3" },
];

const customerFeedback = [
  { selected_choice: "Extremly quick", id: 1, question_id: 1, category_id: 1 },
];
