import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuestionsRepo from "../../pages/QuestionsRepo";
import { MemoryRouter } from "react-router-dom";

describe("QuestionsRepo renders correctly", () => {
  it("QuestionsRepo mounts", () => {
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
