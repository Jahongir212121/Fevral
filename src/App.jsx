import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "@mui/material";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivatePage from "./components/PrivatePage/PrivatePage";

const router = createBrowserRouter([
  { path: "/", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/private", element: <PrivatePage /> },
]);

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </Provider>
  );
};

export default App;
