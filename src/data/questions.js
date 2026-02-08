// src/data/questions.js
export const initialQuestions = [
  {
    id: 1,
    categoryId: 1,
    text: "کوروش کبیر بنیان‌گذار کدام امپراتوری بود؟",
    options: [
      { id: "a", text: "امپراتوری هخامنشی", isCorrect: true },
      { id: "b", text: "امپراتوری ساسانی", isCorrect: false },
      { id: "c", text: "امپراتوری اشکانی", isCorrect: false },
      { id: "d", text: "امپراتوری روم", isCorrect: false },
    ],
    active: true,
  },
  {
    id: 2,
    categoryId: 2,
    text: "پایتخت کشور برزیل کدام است؟",
    options: [
      { id: "a", text: "ریو دو ژانیرو", isCorrect: false },
      { id: "b", text: "برازیلیا", isCorrect: true },
      { id: "c", text: "سائوپائولو", isCorrect: false },
      { id: "d", text: "لیما", isCorrect: false },
    ],
    active: true,
  },
  {
    id: 3,
    categoryId: 3,
    text: 'کارگردان فیلم "Inception" چه کسی است؟',
    options: [
      { id: "a", text: "کریستوفر نولان", isCorrect: true },
      { id: "b", text: "استیون اسپیلبرگ", isCorrect: false },
      { id: "c", text: "مارتین اسکورسیزی", isCorrect: false },
      { id: "d", text: "جیمز کامرون", isCorrect: false },
    ],
    active: true,
  },
];
