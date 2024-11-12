import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { WebSocketProvider } from "./components/WebSocketProvider.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import PlayPage from "./pages/PlayPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LobbyPage from "./pages/LobbyPage.tsx";
import BoardPage from "./pages/BoardPage.tsx";
import RulesPage from "./pages/RulesPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import DefeatPage from "./pages/DefeatPage.tsx";
import WinPage from "./pages/WinPage.tsx";
import SinglePlayerBoardPage from "./pages/SinglePlayerBoardPage.tsx";
import DrawPage from "./pages/DrawPage.tsx";
import GameHistoryPage from "./pages/GameHistoryPage.tsx";

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
                <Route path='/sp-board/:publicId' element={<SinglePlayerBoardPage />} />
                <Route path='/rules' element={<RulesPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/defeat/:publicId' element={<DefeatPage />} />
                <Route path='/win/:publicId' element={<WinPage />} />
                <Route path='/draw/:publicId' element={<DrawPage />} />
                <Route path='/game-history' element={<GameHistoryPage />} />
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
