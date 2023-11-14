import { vi } from "vitest";

export const mockQuestions = [
  {
    id: 1,
    title: "What is the difference between a class and an object?",
    complexity: "Medium",
    categories: ["Programming", "Object-Oriented Programming"],
    description:
      "A class is a blueprint for creating objects, while an object is an instance of a class.",
  },
  {
    id: 2,
    title: "How does JavaScript inheritance work?",
    complexity: "Hard",
    categories: ["JavaScript", "Inheritance"],
    description:
      "JavaScript inheritance allows you to create classes that inherit properties and methods from other classes.",
  },
];

export const loadQuestions = () => {
  return mockQuestions;
};
