import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import RootLayout from "./layouts/RootLayout";
import ExercisePage from "./pages/ExercisePage";
import PreviewPage from "./pages/PreviewPage";
import RequireAuth from "./components/auth/RequireAuth";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { UserRole } from "./enums/userRole";
import PersistLogin from "./components/auth/PersistLogin";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { ArticlesPreviewPage } from "./pages/ArticlesPreviewPage";
import { ArticlePage } from "./pages/ArticlePage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

const App: React.FC = () => {
  return (
    // <RootLayout>
    <Routes>
      {/* public pages */}
      <Route element={<PersistLogin />}>
        {/* TODO: refactor it using different Routes and layouts, not only one: https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=3&ab_channel=NetNinja */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthenticationPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />
          {/*Sections*/}
          <Route path="grammar" element={<PreviewPage />} />
          <Route path="vocabulary" element={<PreviewPage />} />
          <Route path="reading" element={<PreviewPage />} />
          <Route path="listening" element={<PreviewPage />} />
          {/* Articles */}
          <Route path="articles" element={<ArticlesPreviewPage />} />
          <Route path="articles/:level/:article" element={<ArticlePage />} />
          {/*ExerciseSets*/}
          {/* TODO: consider route nesting: https://www.youtube.com/watch?v=l8CS9AMBSIQ&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=4&ab_channel=NetNinja */}
          <Route path="grammar/:exercise" element={<ExercisePage />} />
          <Route path="vocabulary/:exercise" element={<ExercisePage />} />
          <Route path="reading/:exercise" element={<ExercisePage />} />
          <Route path="listening/:exercise" element={<ExercisePage />} />
          {/*Protected Routes */}
          {/*USER ROLE*/}
          <Route element={<RequireAuth allowedRoles={[UserRole.User]} />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[UserRole.User]} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[UserRole.User]} />}>
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[UserRole.User]} />}>
            <Route path="glossary" element={<GlossaryPage />} />
          </Route>
          {/*ADMIN ROLE*/}
          <Route element={<RequireAuth allowedRoles={[UserRole.Admin]} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          {/*Missing Path*/}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
    // </RootLayout>
  );
};

export default App;
