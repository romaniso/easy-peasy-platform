import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import AuthenticationPage from "./pages/AuthenticationPage";
// import ErrorPage from "./pages/ErrorPage";
// import DashboardPage from "./pages/DashboardPage";
import RootLayout from "./layouts/RootLayout";
// import PrivateRouteLayout from "./layouts/PrivateRouteLayout";
// import ExercisePage from "./pages/ExercisePage";
// import PreviewPage from "./pages/PreviewPage";

const App : React.FC = () => {
    return (
        <Router>
            <RootLayout>
                <Routes>
                    {/* public pages */}
                    <Route path="/" element={<HomePage />} />
                    {/*<Route path="*" element={<ErrorPage />} />*/}
                    {/*<Route path="/auth" element={<AuthenticationPage />} />*/}
                    {/*Sections*/}
                    {/*<Route path="/grammar" element={<PreviewPage />} />*/}
                    {/*<Route path="/vocabulary" element={<PreviewPage />} />*/}
                    {/*<Route path="/reading" element={<PreviewPage />} />*/}
                    {/*ExerciseSets*/}
                    {/*<Route path="/grammar/:exercise" element={<ExercisePage />} />*/}
                    {/*<Route path="/vocabulary/:exercise" element={<ExercisePage />} />*/}
                    {/*<Route path="/reading/:exercise" element={<ExercisePage />} />*/}
                    {/* private pages */}
                    {/*<Route element={<PrivateRouteLayout />}>*/}
                    {/*    <Route path="/dashboard" element={<DashboardPage />} />*/}
                    {/*</Route>*/}
                </Routes>
            </RootLayout>
        </Router>
    );
}

export default App;