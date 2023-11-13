import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("LoginPage Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("submitting of form", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const mockJWTToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwZWVycHJlcC1hcGktZ2F0ZXdheSIsInN1YiI6IjEiLCJyb2xlIjoiVVNFUiIsImV4cCI6MTY5OTkwNTkyMn0.dxxaRo_yEW9RhB3JI6E53Inb7vaUfFz8nqNnAtPxKaw";
    axios.post.mockResolvedValue({
      data: {
        jwt: mockJWTToken,
      },
    });

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });

    const signInButton = screen.getByTestId("sign-in-button");
    fireEvent.click(signInButton);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      {
        username: "user",
        password: "password",
      }
    );
  });
});
