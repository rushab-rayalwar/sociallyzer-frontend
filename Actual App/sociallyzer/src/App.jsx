// third party imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// core modules

// local imports
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Registration from "./pages/Registration/Registration.jsx";

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
      path:'/login',
      element: <Login/>
    }
  ]);

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
