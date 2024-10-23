import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import PlayPage from "./pages/PlayPage.tsx";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<SignUpPage />} />
                <Route path='/play' element={<PlayPage />} />
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

// test samo za ws
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('Connected to WebSocket server');
    ws.send(JSON.stringify('Hello Server!'));
};

ws.onmessage = (event) => {
    console.log('Message from server:', event.data);
};

export default App;
