import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Contexts
import currentUserContext from "./contexts/currentUser-context";

// Components
import AppPreloader from "./components/AppPreloader";
import CurrentUserProvider from "./components/CurrentUserProvider";
import ToastsProvider from "./components/ToastsProvider";
import NotificationsToasts from "./components/NotificationsToasts";
import BrowsingToasts from "./components/BrowsingToasts";
import OperationsToasts from "./components/OperationsToasts";
import ProtectedRoute from "./components/ProtectedRoute";
import IconsImports from "./components/IconsImports";
import AppNavbar from "./components/AppNavbar";
import MainContentLayout from "./components/MainContentLayout";
import AuthPagesLayout from "./components/AuthPagesLayout";
import PersonalSpaceLayout from "./components/PersonalSpaceLayout";

// Pages
import TestPage from "./pages/TestPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AddPostPage from "./pages/AddPostPage";
import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import MyAccountPage from "./pages/MyAccountPage";

// Styles
import "./App.css";

function App() {
  return (
    <CurrentUserProvider>
      <currentUserContext.Consumer>
        {({ initialSetupIsDone }) =>
          !initialSetupIsDone ? (
            <AppPreloader />
          ) : (
            <ToastsProvider>
              <IconsImports>
                <Router>
                  <div className="App">
                    <AppNavbar />
                    <div id="pages-wrapper">
                      <Routes>
                        <Route path="/" element={<MainContentLayout />}>
                          <Route index element={<Navigate to="/posts" replace />} />
                          <Route path="/posts" element={<PostsPage />} />
                          <Route path="/posts/:postId" element={<PostPage />} />
                          <Route path="/users" element={<UsersPage />} />
                          <Route path="/users/:userId" element={<UserPage />} />
                        </Route>
                        <Route
                          path="/auth/*"
                          element={
                            <ProtectedRoute reverse={true}>
                              <AuthPagesLayout />
                            </ProtectedRoute>
                          }
                        >
                          <Route path="signup" element={<SignupPage />} />
                          <Route path="login" element={<SigninPage />} />
                        </Route>
                        <Route
                          path="/add-post"
                          element={
                            <ProtectedRoute>
                              <AddPostPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/personal-space/*"
                          element={
                            <ProtectedRoute>
                              <PersonalSpaceLayout />
                            </ProtectedRoute>
                          }
                        >
                          <Route index element={<Navigate to="account" replace />} />
                          <Route path="account" element={<MyAccountPage />} />
                        </Route>
                        <Route path="/test" element={<TestPage />} />
                      </Routes>
                      <NotificationsToasts />
                      <BrowsingToasts />
                      <OperationsToasts />
                    </div>
                  </div>
                </Router>
              </IconsImports>
            </ToastsProvider>
          )
        }
      </currentUserContext.Consumer>
    </CurrentUserProvider>
  );
}

export default App;
