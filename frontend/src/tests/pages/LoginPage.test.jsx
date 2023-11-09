// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import LoginPage from "../../pages/LoginPage";
// import { SnackbarContext } from "../../utils/SnackbarContextUtil";
// import UserContextProvider from "../../utils/UserContextUtil";
// import axios from "axios";
// import { vi } from "vitest";

// // Setup mock for useNavigate
// const mockedNavigate = vi.fn();
// vi.doMock("react-router-dom", () => ({
//   ...vi.requireActual("react-router-dom"),
//   useNavigate: () => mockedNavigate,
// }));

// describe("LoginPage Component", () => {
//   // Mock values for context
//   const mockSetUserContext = vi.fn();
//   const mockSetSnack = vi.fn();

//   test("renders LoginPage component and submits form", async () => {
//     // Provide the mock values for context via provider
//     const wrapper = ({ children }) => (
//       <BrowserRouter>
//         <UserContextProvider.Provider
//           value={{ setUserContext: mockSetUserContext }}
//         >
//           <SnackbarContext.Provider value={{ setSnack: mockSetSnack }}>
//             {children}
//           </SnackbarContext.Provider>
//         </UserContextProvider.Provider>
//       </BrowserRouter>
//     );

//     render(<LoginPage />, { wrapper });

//     // Simulate user typing in the input fields
//     fireEvent.change(screen.getByLabelText(/Username/i), {
//       target: { value: "user1" },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: "password" },
//     });

//     // // Mock the axios post to resolve successfully
//     // axios.post.mockResolvedValue({
//     //   data: { username: "user1", id: "1" },
//     // });

//     // Simulate form submission
//     const signInButton = screen.getByText((content, element) => {
//       return (
//         element.tagName.toLowerCase() === "button" && /sign in/i.test(content)
//       );
//     });
//     fireEvent.click(signInButton);

//     // // Assert axios.post was called correctly
//     // expect(axios.post).toHaveBeenCalledWith(
//     //   expect.stringContaining("/auth/login"),
//     //   {
//     //     username: "user1",
//     //     password: "password",
//     //   }
//     // );

//     // // Since navigation is an async action, wait for the next tick

//     console.log(mockedNavigate.mock.calls);
//     // await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/home"));

//     // // Assert navigation was called
//     // expect(mockedNavigate).toHaveBeenCalledWith("/home");

//     // // Assert the context was set
//     // expect(mockSetUserContext).toHaveBeenCalled();

//     //     // Assert snack was set
//     //     expect(mockSetSnack).toHaveBeenCalledWith({
//     //       message: "Logged in successfully",
//     //       open: true,
//     //       severity: "success",
//     //     });
//   });

//   // Additional tests can go here
// });
