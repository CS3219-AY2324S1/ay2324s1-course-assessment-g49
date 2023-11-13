import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Question from "../../components/Question";

const mockQuestion = {
  id: 1,
  title: "Test Question",
  categories: ["Category1", "Category2"],
  complexity: 3,
  description: "Test question description",
};

// Mocking the onDelete and onEdit functions
const onDeleteMock = vi.fn();
const onEditMock = vi.fn();

const renderComponent = () => {
  return render(
    <Question
      question={mockQuestion}
      questionId={1}
      onDelete={onDeleteMock}
      onEdit={onEditMock}
    />
  );
};

describe("Question component", () => {
  it("renders question title as a link", () => {
    renderComponent();
    const linkElement = screen.getByText("Test Question");
    expect(linkElement).toBeInTheDocument();
  });

  it("opens the dialog when the link is clicked", async () => {
    renderComponent();
    const linkElement = screen.getByText("Test Question");
    fireEvent.click(linkElement);

    await vi.waitFor(() => {
      const descriptionHeading = screen.getByText("Question Description");
      expect(descriptionHeading).toBeInTheDocument();
    });
  });
});
