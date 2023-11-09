import { Route, Routes } from "react-router-dom";
import Navi from "./components/navi/Navi";
import LoadingPage from "./components/loading/LoadingPage";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import CreateProblem from "./components/problem/CreateProblem";
import ListProblem from "./components/problem/ListProblem";
import DetailProblem from "./components/problem/DetailProblem";
import "./style.scss";
import { DataProvider} from "./context/DataContext";
import UserProblems from "./components/problem/UserProblems";
import AdminPanel from "./admin/panel/AdminPanel"
import Users from "./admin/users/Users"
import Categories from "./admin/categories/Categories"
import Problems from "./admin/problems/Problems"
import Comments from "./admin/comments/Comments"
import UserDetail from "./admin/users/UserDetail"
import CategoryDetail from "./admin/categories/CategoryDetail"
import CommentDetail from "./admin/comments/CommentDetail"
import ProblemDetail from "./admin/problems/ProblemDetail" 




function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/*" element={<LoadingPage />} />
        <Route path="home" element={<Navi />}>
          <Route path="main" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="createproblem" element={<CreateProblem />} />
          <Route path="listproblem/:categoryName" element={<ListProblem />} />
          <Route path="userproblems/:userName" element={< UserProblems/>} />
          <Route path="detailproblem/:id" element={<DetailProblem />} />
          </Route>
          <Route path="admin/*" element={<AdminPanel/>} >
            <Route path="users" element={<Users/>} />
            <Route path="categories" element={<Categories/>} />
            <Route path="problems" element={<Problems/>} />
            <Route path="comments" element={<Comments/>} />

            <Route path="userdetail/:username" element={<UserDetail/>}/>
            <Route path="categorydetail/:id" element={<CategoryDetail/>}/>
            <Route path="commentdetail/:id" element={<CommentDetail/>}/>
            <Route path="problemdetail/:id" element={<ProblemDetail/>}/>

          </Route>
      </Routes>
      <Footer />
    </DataProvider>
  );
}

export default App;
