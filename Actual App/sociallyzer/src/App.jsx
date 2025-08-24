// third party imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AnimatePresence } from "framer-motion";

// core modules

// local imports
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import Home from "./pages/HomePage/HomePage.jsx";

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
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  )
}

export default App
