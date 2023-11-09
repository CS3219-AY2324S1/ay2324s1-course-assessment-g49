import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import userEvent from "@testing-library/user-event";

// Mock components for route targets
const HomePageMock = () => <div>Home Page</div>;
const ProfilePageMock = () => <div>Past Submissions</div>;
const QuestionsRepoPageMock = () => <div>Question Repository</div>;

describe("NavBar Component", () => {
  test("renders and navigates to different tabs", async () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<HomePageMock />} />
          <Route path="/profile" element={<ProfilePageMock />} />
          <Route path="/questions" element={<QuestionsRepoPageMock />} />
        </Routes>
        <NavBar />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    // Check if Home Tab is present
    expect(screen.getByText(/home page/i)).toBeInTheDocument();

    // Check navigation to Profile tab
    await user.click(screen.getByText(/profile/i));
    expect(screen.getByText(/past submissions/i)).toBeInTheDocument();

    // Check navigation to Questions Repository tab
    await user.click(screen.getByText(/questions/i));
    expect(screen.getByText(/question repository/i)).toBeInTheDocument();
  });
});
