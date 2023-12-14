/* eslint-disable array-callback-return */
import React, { createContext, useReducer } from "react";
import { adminReducer, initialState } from "../reducers/adminReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const navigate = useNavigate();
  let url = "http://localhost:3005";
  //date
  const date = () => {
    return new Date().toISOString();
  };
  function formatRelativeTime(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);

    const timeDifference = now - targetDate;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days === 0) {
      if (hours === 0) {
        return `${minutes} dakika önce`;
      } else {
        return `${hours} saat önce`;
      }
    } else if (days === 1) {
      return "Dün";
    } else {
      // Eğer bir önceki günden daha önce ise sadece tarihi döndür
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return targetDate.toLocaleDateString("tr-TR", options);
    }
  }
  function calculateDate(value) {
    const now = new Date();
    switch (value) {
      case "1": // Son 24 Saat
        now.setHours(now.getHours() - 24);
        break;
      case "2": // Son 7 Gün
        now.setDate(now.getDate() - 7);
        break;
      case "3": // Son 30 Gün
        now.setDate(now.getDate() - 30);
        break;
      case "4": // Son 90 Gün
        now.setDate(now.getDate() - 90);
        break;
      case "5": // Son 1 Yıl
        now.setFullYear(now.getFullYear() - 1);
        break;
      default: // Tüm Zamanlar
        return null;
    }
    return now.toISOString();
  }
  //user
  const getUsers = async () => {
    const response = await axios.get(`${url}/users`);
    dispatch({ type: "getUsers", payload: await response.data });
  };

  const getUserDetail = async (userName) => {
    const response = await axios.get(`${url}/users`, {
      params: {
        userName: userName,
      },
    });

    dispatch({ type: "getUserDetail", payload: await response.data[0] });
    dispatch({ type: "userName", payload: await response.data[0].name });
    dispatch({ type: "userSurname", payload: await response.data[0].surName });
    dispatch({
      type: "userUserName",
      payload: await response.data[0].userName,
    });
    dispatch({ type: "userEmail", payload: await response.data[0].email });
    dispatch({ type: "userRol", payload: await response.data[0].userRol });
    dispatch({
      type: "userIsActive",
      payload: String(response.data[0].isActive),
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    const responseUserName = await axios.get(
      `${url}/users/?userName=${state.signupUserName}`
    );
    const responseEmail = await axios.get(
      `${url}/users/?email=${state.signupEmail}`
    );
    if (
      responseUserName.status === 200 &&
      responseUserName.data.length === 0 &&
      responseEmail.status === 200 &&
      responseEmail.data.length === 0
    ) {
      const newUser = {
        id: state.users.length + 1,
        name: "",
        surName: "",
        userName: state.createUserName,
        email: state.createEmail,
        password: state.createPassword,
        userPicture: "",
        problemCount: 0,
        userRol: "user",
        createDate: date(),
        userToken: "",
        isActive: true,
      };
      await axios.post(`${url}/users`, newUser);
      dispatch({ type: "createUser", payload: newUser });
      dispatch({ type: "createUserName", payload: "" });
      dispatch({ type: "createEmail", payload: "" });
      dispatch({ type: "createPassword", payload: "" });
    } else {
      if (
        responseUserName.data.length !== 0 &&
        responseEmail.data.length === 0
      ) {
        alert("Bu kullanıcı adı alınmış");
      } else if (
        responseEmail.data.length !== 0 &&
        responseUserName.data.length === 0
      ) {
        alert("Bu email alınmış");
      } else {
        alert("Bu kullanıcı adı ve email alınmış");
      }
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    const userId = state.userDetail.id;
    const response = await axios.get(`${url}/users/${userId}`);
    const user = await response.data;
    if (
      state.userName !== user.name ||
      state.userSurname !== user.surName ||
      state.userUserName !== user.userName ||
      state.userEmail !== user.email ||
      state.userRol !== user.userRol ||
      state.userIsActive !== user.isActive
    ) {
      const ubdateUser = {
        ...user,
        id: userId,
        name: state.userName,
        surName: state.userSurname,
        userName: state.userUserName,
        email: state.userEmail,
        userRol: state.userRol,
        userToken: "",
        isActive: state.userIsActive,
      };
      await axios.patch(`${url}/users/${userId}`, ubdateUser);
      if (response.status === 200) {
        pasifUserToPasifProblem(
          ubdateUser.id,
          state.userIsActive ? false : true
        );

        dispatch({ type: "ubdateUser", payload: ubdateUser });
        dispatch({ type: "userName", payload: "" });
        dispatch({ type: "userSurname", payload: "" });
        dispatch({ type: "userUserName", payload: "" });
        dispatch({ type: "userEmail", payload: "" });
        dispatch({ type: "userRol", payload: "" });
        dispatch({ type: "userPicture", payload: "" });
        dispatch({ type: "userIsActive", payload: "" });
        alert("Kullanıcı bilgileri güncellendi");
        navigate(`/admin/users`);
      }
    } else {
      alert("Değişiklik yapmadınız");
    }
  };

  const deleteComment = async (problemId, commentId) => {
    const response = await axios.get(`${url}/problems/${problemId}`);
    const problem = response.data;

    const updatedComments = problem.comments.map((comment) => {
      if (comment.id === Number(commentId)) {
        return {
          ...comment,
          isDeleted: true,
        };
      }

      return comment;
    });

    // Yeni yorum listesini kullanarak problemi güncelle
    const updatedProblem = {
      ...problem,
      comments: updatedComments,
      commentCount: problem.commentCount - 1,
    };

    // Güncellenmiş problemi API'ye gönder
    await axios.put(`${url}/problems/${problemId}`, updatedProblem);
    dispatch({ type: "activeProblemDetail", payload: updatedProblem });
    getProblem(false);
  };

  const getCommentDetail = async (problemId, commentId) => {
    const response = await axios.get(`${url}/problems/${problemId}`);
    const comment = await response.data.comments.filter(
      (comment) => comment.id === Number(commentId)
    );

    dispatch({ type: "getCommentDetail", payload: comment[0] });
  };
  //category
  const getCategory = async () => {
    const response = await axios.get(`${url}/categories`);
    dispatch({ type: "getCategory", payload: await response.data });
  };

  const getCategoryDetail = async (id) => {
    const response = await axios.get(`${url}/categories/?id=${id}`);
    dispatch({ type: "getCategoryDetail", payload: await response.data[0] });
    dispatch({
      type: "categoryName",
      payload: await response.data[0].categoryName,
    });
    // Dispatch other category details here
  };

  const createCategory = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${url}/categories/?categoryName=${state.categoryName}`
    );
    if (response.status === 200 && response.data.length === 0) {
      const newCategory = {
        categoryName: state.categoryName.toUpperCase(),
        problemCount: 0,
        isDeleted: false,
      };
      await axios.post(`${url}/categories`, newCategory);
      dispatch({ type: "createCategory", payload: newCategory });
      dispatch({ type: "categoryName", payload: "" });
    } else {
      alert("Bu kategori adı alınmış");
    }
  };

  const deleteCategory = async (id) => {
    const category = await axios.get(`${url}/categories/${id}`);
    const deleted = category.data.isDeleted ? false : true;
    const response = await axios.patch(`${url}/categories/${id}`, {
      isDeleted: deleted,
    });
    if (response.status === 200) {
      getCategory();
      navigate(`/admin/categories`);
    }
  };

  const ubdateCategory = async (e) => {
    e.preventDefault();
    const id = state.categoryDetail.id;
    const response = await axios.patch(`${url}/categories/${id}`, {
      categoryName: state.categoryName.toUpperCase(),
    });
    if (response.status === 200) {
      getCategory();
      navigate(`/admin/categories`);
    }
  };

  //problem
  const getProblem = async (isMore) => {
    let page = 1;
    if (isMore) {
      dispatch({ type: "loadMorePages", payload: (await state.pages) + 1 });
      page = state.pages;
    }
    dispatch({ type: "hideLoadMoreButton", payload: true });
    const response = await axios.get(`${url}/problems`, {
      params: {
        categoryId:
          state.fltProblemCategory.length > 0 ? state.fltProblemCategory : null,
        _sort: "createDate",
        _order: "desc",
        _limit: 12,
        _page: page,
        userId: state.users.map((user) =>
          user.userName === state.fltProblemUserName ? user.id : null
        ),
        isDeleted:
          state.fltProblemIsdeleted === "true"
            ? true
            : state.fltProblemIsdeleted === "false"
            ? false
            : null,
        isCompleted:
          state.fltProblemIscompleted === "true"
            ? true
            : state.fltProblemIscompleted === "false"
            ? false
            : null,
        createDate_gte: calculateDate(state.fltProblemDate),
        q: state.fltProblemSearch,
      },
    });
    response.data.length < 12 &&
      dispatch({ type: "hideLoadMoreButton", payload: false });
    if (isMore) {
      dispatch({ type: "getMoreProblems", payload: await response.data });
    } else {
      dispatch({ type: "getProblems", payload: await response.data });
      dispatch({ type: "loadMorePages", payload: 2 });
    }
  };

  const pasifUserToPasifProblem = async (id, action) => {
    const response = await axios.get(`${url}/problems/?userId=${id}`);
    const problems = await response.data;
    problems.map(async (problem) => {
      await axios.patch(`${url}/problems/${problem.id}`, {
        isDeleted: action,
      });
    });
  };

  const getProblemDetail = async (id) => {
    const response = await axios.get(`${url}/problems/${Number(id)}`);
    dispatch({ type: "activeProblemDetail", payload: await response.data });
  };

  const deleteProblem = async (id) => {
    const response = await axios.patch(`${url}/problems/${id}`, {
      isDeleted: true,
    });
    if (response.status === 200) {
      dispatch({ type: "problemSil", id });
      navigate(`/admin/problems`);
    }
  };

  //comment
  const getComments = async (isMore) => {
    let page = 1;
    if (isMore) {
      dispatch({ type: "loadMorePages", payload: (await state.pages) + 1 });
      page = state.pages;
    }
    dispatch({ type: "hideLoadMoreButton", payload: true });
    const response = await axios.get(`${url}/problems`, {
      params: {
        _sort: "createDate",
        _order: "desc",
        _limit: 10,
        _page: page,
        isDeleted:
          state.fltrCommentIsdeleted === "true"
            ? true
            : state.fltrCommentIsdeleted === "false"
            ? false
            : null,
        q: state.fltrCommentSearch,
        createDate_gte: calculateDate(state.fltrCommentDate),
      },
    });

    response.data.length < 10 &&
      dispatch({ type: "hideLoadMoreButton", payload: false });
    if (isMore) {
      dispatch({
        type: "getMoreproblemComments",
        payload: await response.data,
      });
    } else {
      dispatch({ type: "getproblemComments", payload: await response.data });
      dispatch({ type: "loadMorePages", payload: 2 });
    }
  };

  //complaints
  const getComplaints = async (isMore) => {
    let page = 1;
    if (isMore) {
      dispatch({ type: "loadMorePages", payload: (await state.pages) + 1 });
      page = state.pages;
    }
    dispatch({ type: "hideLoadMoreButton", payload: true });
    const response = await axios.get(`${url}/complaints`, {
      params: {
        _sort: "createDate",
        _order: "desc",
        _page: page,
        _limit: 12,
        status:
          state.fltrComplaintStatus !== "" ? state.fltrComplaintStatus : null,
        createDate_gte: calculateDate(state.fltrComplaintDate),
        q: state.fltrComplaintSearch,
        userId: state.users.map((user) =>
          user.userName === state.fltrComplaintUserName ? user.id : null
        ),
        toUserId: state.users.map((user) =>
          user.userName === state.fltrComplaintToUserName ? user.id : null
        ),
      },
    });
    
    response.data.length < 8 &&
      dispatch({ type: "hideLoadMoreButton", payload: false });
    if (isMore) {
      dispatch({ type: "getMoreComplaints", payload: await response.data });
    } else {
      dispatch({ type: "getComplaints", payload: await response.data });
      dispatch({ type: "loadMorePages", payload: 2 });
    }
  };

  const getComplaintProblem = async () => {
    const response = await axios.get(`${url}/complaints`, {
      params: {
        _sort: "createDate",
        _order: "desc",
        _limit: 12,
        status: state.filterStatus !== "" ? state.filterStatus : null,
        createDate_gte: state.filterDate,
        q: state.fltrCommentSearch,
        userId: state.users.map((user) =>
          user.userName === state.filterUserName ? user.id : null
        ),
      },
    });
    dispatch({ type: "getComplaints", payload: await response.data });
  };
  const getComplaintDetail = async (id) => {
    const response = await axios.get(`${url}/complaints/${Number(id)}`);
    dispatch({ type: "getComplaintDetail", payload: await response.data });
    dispatch({ type: "complaintStatus", payload: await response.data.status });
  };
  const ubdateComplaint = async (newubdateComplaint) => {
    const response = await axios.patch(
      `${url}/complaints/${newubdateComplaint.id}`,
      {
        status: state.complaintStatus,
      }
    );
    if (response.status === 200) {
      dispatch({ type: "ubdateComplaint", payload: "" });
      alert("Şikayet durumu güncellendi");
      navigate(`/admin/complaints`);
    }
  };

  //other
  const roleControl = async () => {
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      const response = await axios.get(`${url}/users/?id=${userId}`);
      const userRol = response.data[0].userRol;
      if (userRol !== "admin") {
        navigate(`/home/main`);
      } else {
        // console.log("admin açık");
      }
    } else {
      navigate(`/home/main`);
    }
  };

  const toggleDropdown = () => {
    dispatch({ type: "isDropdownOpen", payload: !state.isDropdownOpen });
  };

  return (
    <AdminContext.Provider
      value={{
        state,
        dispatch,
        deleteProblem,
        getProblemDetail,
        getUserDetail,
        editUser,
        createUser,
        createCategory,
        getCategoryDetail,
        roleControl,
        toggleDropdown,
        deleteCategory,
        getProblem,
        getCommentDetail,
        deleteComment,
        getUsers,
        getCategory,
        formatRelativeTime,
        getComplaintDetail,
        getComplaints,
        getComplaintProblem,
        ubdateComplaint,
        getComments,
        ubdateCategory
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
