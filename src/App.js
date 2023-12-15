import { Route, Routes } from "react-router-dom";
import Navi from "./components/navi/Navi";
import Main from "./components/main/Main";
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
import LoginAdmin from "./admin/login-admin/LoginAdmin";


function UserRoutes() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<Navi />}>
          <Route index element={<div><Main /></div>} />
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
      </Routes>
    </UserProvider>
  );
}

function AdminRoutes() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/*" element={<AdminLayout />}>
          <Route
            index element={
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
          <Route
            path="commentdetail/:problemId/:commentId"
            element={<CommentDetail />}
          />
          <Route path="problemdetail/:id" element={<ProblemDetail />} />
          <Route path="complaintdetail/:id" element={<DetailComplaint />} />
        </Route>
        <Route path="loginadmin" element={<LoginAdmin />} />
      </Routes>
    </AdminProvider>
  );
}

function Layout() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#aaa" : "#fff",
      }}
    >
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="admin/*" element={<AdminRoutes />} />
      </Routes>
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
