import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
