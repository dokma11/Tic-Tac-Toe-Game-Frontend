import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import PlayPage from "./pages/PlayPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";
import BoardPage from "./pages/BoardPage.tsx";
import { WebSocketProvider } from "./components/WebSocketProvider.tsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<SignUpPage />} />
                <Route path='/play' element={<PlayPage />} />
                <Route path='/lobby/:publicId' element={<LobbyPage />} />
                <Route path='/board/:publicId' element={<BoardPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        )
    );
    return (
        <WebSocketProvider>
            <RouterProvider router={router} />
        </WebSocketProvider>
    );}

export default App;
