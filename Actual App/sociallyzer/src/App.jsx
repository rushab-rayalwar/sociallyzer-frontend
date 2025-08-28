// external imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";

// core modules

// local imports
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import Home from "./pages/HomePage/HomePage.jsx";
import { store } from "./redux/store.js";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<LandingPage/>
    },
    {
      path:"/register",
      element: <Registration/>
    },
    {
      path:"/home",
      element:<Home/>
    }
  ]);

  return(
    <Provider store={store}>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </Provider>
  )
}

export default App
