import { Route, Routes } from "react-router-dom";
import Navi from "./components/navi/Navi";
import LoadingPage from "./components/loading/LoadingPage";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import CreateProblem from "./components/problem/CreateProblem";
import ListProblem from "./components/problem/ListProblem";
import DetailProblem from "./components/problem/DetailProblem";
import "./style.scss";
import { UserProvider } from "./context/UserContext";
import UserProblems from "./components/problem/UserProblems";
import AdminLayout from "./admin/panel/AdminLayout";
import Users from "./admin/users/Users";
import Categories from "./admin/categories/Categories";
import Problems from "./admin/problems/Problems";
import Comments from "./admin/comments/Comments";
import UserDetail from "./admin/users/UserDetail";
import CategoryDetail from "./admin/categories/CategoryDetail";
import CommentDetail from "./admin/comments/CommentDetail";
import ProblemDetail from "./admin/problems/ProblemDetail";
import { AdminProvider } from "./context/AdminContext";
import AdminHome from "./admin/panel/AdminHome";
import Menu from "./components/menu/Menu";
import Sidebar from "./components/sidebar/Sidebar";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { useContext } from "react";
import EditProfile from "./components/profile/EditProfile";
import ProfileDetail from "./components/profile/ProfileDetail";
import Complaints from "./admin/complaints/Complaints";
import DetailComplaint from "./admin/complaints/DetailComplaint";

function Layout() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#aaa" : "#fff",
      }}
    >
      <UserProvider>
        <AdminProvider>
          <Routes>
            <Route path="/*" element={<LoadingPage />} />
            <Route path="home" element={<Navi />}>
              <Route path="main" element={<Main />} />
              <Route path="profile/:userName" element={<Profile />}>
                <Route path="problems" element={<UserProblems />} />
                <Route path="detail" element={<ProfileDetail />} />
                <Route path="edit" element={<EditProfile />} />
              </Route>
              <Route path="createproblem" element={<CreateProblem />} />
              <Route element={<Menu />}>
                <Route
                  path="listproblem/:categoryName"
                  element={
                    <div className="listProblem-sidebar">
                      <ListProblem />
                      <Sidebar />
                    </div>
                  }
                />
              </Route>
              <Route path="detailproblem/:id" element={<DetailProblem />} />
            </Route>

            <Route path="admin/*" element={<AdminLayout />}>
              <Route
                index
                element={
                  <div>
                    <AdminHome />
                  </div>
                }
              />
              <Route path="users" element={<Users />} />
              <Route path="categories" element={<Categories />} />
              <Route path="problems" element={<Problems />} />
              <Route path="comments" element={<Comments />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="userdetail/:userName" element={<UserDetail />} />
              <Route path="categorydetail/:id" element={<CategoryDetail />} />
              <Route path="commentdetail/:problemId/:commentId" element={<CommentDetail />} />
              <Route path="problemdetail/:id" element={<ProblemDetail />} />
              <Route path="complaintdetail/:id" element={<DetailComplaint />} />
            </Route>
          </Routes>
          <Footer />
        </AdminProvider>
      </UserProvider>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
