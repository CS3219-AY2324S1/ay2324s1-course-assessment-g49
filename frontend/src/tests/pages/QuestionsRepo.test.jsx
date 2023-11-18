import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import QuestionsRepo from "../../pages/QuestionsRepo";
import { MemoryRouter } from "react-router-dom";

describe("QuestionsRepo renders correctly", () => {
  
  it("QuestionsRepo mounts", () => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };

    // Set up mock data in localSto rage
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ userRole: "ADMIN" }));

    // Mock localStorage in the global context
    global.localStorage = localStorageMock;
    global.questions = [];
    global.questionsFilteredByComplexity = [];
    global.questionsFilteredByCategory = [];
    render(
      <MemoryRouter>
        <QuestionsRepo />
      </MemoryRouter>
    );

    expect(screen.getByText(/question repository/i)).toBeInTheDocument();
    expect(screen.getByText(/add a question/i)).toBeInTheDocument();
    expect(screen.getByText(/question title/i)).toBeInTheDocument();
  });
});