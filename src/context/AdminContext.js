/* eslint-disable array-callback-return */
import React, { createContext, useEffect, useReducer } from "react";
import { adminReducer, initialState } from "../reducers/adminReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const navigate = useNavigate();
  let url = "http://localhost:3005";

  const date = () => {
    const formatTwoDigits = (value) => {
      return value < 10 ? `0${value}` : value;
    };
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${
      currentDate.getMonth() + 1
    }.${currentDate.getFullYear()} ${formatTwoDigits(
      currentDate.getHours()
    )}:${formatTwoDigits(currentDate.getMinutes())}:${formatTwoDigits(
      currentDate.getSeconds()
    )}`;
    return formattedDate;
  };

  //user
  const getUsers = async () => {
    const response = await axios.get(`${url}/users`);
    dispatch({ type: "getUsers", payload: await response.data });
  };

  const getUserDetail = async (id) => {
    const response = await axios.get(`${url}/users/?id=${id}`);

    dispatch({ type: "getUserDetail", payload: await response.data[0] });
    dispatch({ type: "userName", payload: await response.data[0].name });
    dispatch({ type: "userSurname", payload: await response.data[0].surName });
    dispatch({
      type: "userUserName",
      payload: await response.data[0].userName,
    });
    dispatch({ type: "userEmail", payload: await response.data[0].email });
    dispatch({ type: "userRol", payload: await response.data[0].userRol });
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
    const ubdateUser = {
      ...user,
      id: userId,
      name: state.userName,
      surName: state.userSurname,
      userName: state.userUserName,
      email: state.userEmail,
      userRol: state.userRol,
      userToken: "",
    };
    await axios.patch(`${url}/users/${userId}`, ubdateUser);
    if (response.status === 200) {
      alert("Kullanıcı bilgileri güncellendi");
      dispatch({ type: "ubdateUser", payload: ubdateUser });
      dispatch({ type: "userName", payload: "" });
      dispatch({ type: "userSurname", payload: "" });
      dispatch({ type: "userUserName", payload: "" });
      dispatch({ type: "userEmail", payload: "" });
      dispatch({ type: "userRol", payload: "" });
      dispatch({ type: "userPicture", payload: "" });
      navigate(`/admin/users`);
    }
  };

  //comment

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
        id: state.categories.length + 1,
        categoryName: state.categoryName,
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
    const response = await axios.patch(`${url}/categories/${id}`, {
      isDeleted: true,
    });
    if (response.status === 200) {
      dispatch({ type: "deletedCategory", id });
      navigate(`/admin/categories`);
    }
  };
  //problem
  const getProblem = async () => {
    const response = await axios.get(`${url}/problems`);
    dispatch({ type: "getProblems", payload: await response.data });
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
        getUsers,
        getCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
