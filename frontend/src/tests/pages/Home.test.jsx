import Home from "../../pages/Home";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";


test("full app rendering/navigating", async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // verify page content for default route
  expect(screen.getByText(/Welcome to PeerPrep!/i)).toBeInTheDocument();
});
