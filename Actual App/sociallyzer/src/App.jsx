// external imports
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";

// core modules

// local imports
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import RegistrationPage from "./pages/Registration/RegistrationPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage.jsx";
import FriendsPage from "./pages/FriendsPage/FriendsPage.jsx";
import SavedPostsPage from "./pages/SavedPostsPage/SavedPostsPage.jsx";
import { store } from "./redux/store.js";

export function App(){
  const router = createBrowserRouter([
    {
      path:"/", element : <LandingPage/>
    },
    {
      path:"/home", element: <HomePage/>, children: [
        {
          path : ":postId", element : <PostDetailsPage/>
        }
      ]
    },
    {
      path:"/register", element: <RegistrationPage/>
    },
    {
      path:'/friends', element:<FriendsPage/>
    },
    {
      path:"/saved", element:<SavedPostsPage/>, children : [
        {
          path : ":postId", element : <PostDetailsPage/>
        }
      ]
    }
  ]);
  return(
    <>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  )
}

export default App
