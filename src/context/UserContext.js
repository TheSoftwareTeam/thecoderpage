/* eslint-disable array-callback-return */
import React, { createContext, useEffect, useReducer } from "react";
import { userReducer, initialState } from "../reducers/userReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();
  let url = "http://localhost:3005";

  //date

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

  //login
  const login = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${url}/users/?userName=${state.loginUserName}&password=${state.loginPassword}`
    );
    if (response.status === 200 && response.data.length !== 0) {
      dispatch({ type: "login", payload: await response.data[0] });
      dispatch({ type: "loginUserName", payload: "" });
      dispatch({ type: "loginPassword", payload: "" });
      dispatch({ type: "selectedCategory", payload: null });
      
      if (response.data[0].verify === false) {
        navigate(`/home/profile/`);
      } else {
        localStorage.setItem("userId", JSON.stringify(response.data[0].id));
        localStorage.setItem(
          "userToken",
          JSON.stringify(`${response.data[0].name}${Math.random()}`)
        );
        await axios.patch(`${url}/users/${response.data[0].id}`, {
        userToken: JSON.parse(localStorage.getItem("userToken")),
      });
        navigate(`/home/listproblem/`);
      }
    } else {
      alert("Kullanıcı adı veya şifre yanlış");
      console.log("Kullanıcı giriş yapamadı");
      return null;
    }
  };
  //signup
  const signupUser = async (e) => {
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
        name: "",
        surName: "",
        userName: state.signupUserName,
        email: state.signupEmail,
        password: state.signupPassword,
        userPicture: "",
        problemCount: 0,
        userRol: "user",
        verify: false,
        userToken: "",
        createDate: date(),
      };
      await axios.post(`${url}/users`, newUser);
      dispatch({ type: "createUser", payload: newUser });
      dispatch({ type: "signupUserName", payload: "" });
      dispatch({ type: "signupEmail", payload: "" });
      dispatch({ type: "signupPassword", payload: "" });
      navigate(`/home/login`);
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
  //profile
  const editProfile = async (e) => {
    e.preventDefault();
    const userId = state.activeUser.id;
    const response = await axios.get(`${url}/users/${userId}`);
    const user = await response.data;
    
   
    const newUser = {
      ...user,
      name: state.profileName,
      surName: state.profileSurname,
      verify: true,
      userPicture:
        state.profilePicture === ""
          ? state.activeUser.userPicture
          : state.profilePicture,
    };
    await axios.patch(`${url}/users/${userId}`, newUser);
    dispatch({ type: "createUser", payload: newUser });
    dispatch({ type: "login", payload: newUser });

     if( state.activeUser.verify === false)
     { localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem( "userToken", JSON.stringify(`${state.profileName}${Math.random()}`));
      await axios.patch(`${url}/users/${userId}`, {
        userToken: JSON.parse(localStorage.getItem("userToken")),
      });}

    navigate(`/home/listproblem/`);
  };
  //user
  const getUsers = async () => {
    const response = await axios.get(`${url}/users`);
    dispatch({ type: "getUsers", payload: await response.data });
  };

  const getUserDetail = async (userName) => {
    const response = await axios.get(`${url}/users/?userName=${userName}`);

    dispatch({ type: "getUserDetail", payload: await response.data[0] });
  };

  //comment

  const writeProblemComment = async (problem) => {
    if (localStorage.getItem("userToken")) {
      const newProblemComment = {
        id: problem.comments.length,
        userId: state.activeUser.id,
        commentContent: state.newProblemComment,
        createDate: date(),
      };

      problem.comments.push(newProblemComment);

      problem.commentCount += 1;

      await axios.patch(`${url}/problems/${problem.id}`, problem);

      dispatch({ type: "createComment", payload: newProblemComment });
      dispatch({ type: "newProblemComment", payload: "" });
      dispatch({ type: "activeProblemDetail", payload: problem });
      dispatch({ type: "createAndUbdateProblem", payload: problem });
    } else {
      alert("Lütfen giriş yapınız!");
    }
  };

  //category
  const getCategory = async () => {
    const response = await axios.get(`${url}/categories`);
    dispatch({ type: "getCategory", payload: await response.data });
  };

  // const getCategoryFilterproblem = async (categoryName) => {

  //   const category = await axios.get(
  //     `${url}/categories?categoryName=${categoryName.toUpperCase()}`
  //   );
  //   const response = await axios.get(
  //     `${url}/problems?categoryId=${category.data[0].id}`
  //   );

  //   dispatch({ type: "categoryFilterProblem", payload: response.data });

  // };

  //problem
  const getProblem = async () => {
    const response = await axios.get(`${url}/problems`);
    dispatch({ type: "getProblems", payload: await response.data });
  };

  const activeUserProblem = async (userName) => {
    const user = await axios.get(`${url}/users?userName=${userName}`);
    const response = await axios.get(
      `${url}/problems?userId=${user.data[0].id}`
    );
    dispatch({ type: "activeUserProblem", payload: response.data });
  };

  const getProblemDetail = async (id) => {
    const response = await axios.get(`${url}/problems/${Number(id)}`);
    dispatch({ type: "activeProblemDetail", payload: await response.data });
  };

  const createProblem = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("userToken")) {
      const newProblem = {
        id: state.problems.length,
        userId: state.activeUser.id,
        categoryId: state.categoryId,
        problemHead: state.problemHead,
        problemContent: state.problemContent,
        commentCount: 0,
        likesUserId: [],
        comments: [],
        isCompleted: false,
        isDeleted: false,
        createDate: date(),
      };

      const categoryResponse = await axios.get(
        `${url}/categories/${state.categoryId}`
      );
      const category = categoryResponse.data;
      category.problemCount += 1;
      await axios.patch(`${url}/categories/${state.categoryId}`, category);

      dispatch({ type: "createAndUbdateProblem", payload: newProblem });
      await axios.post(`${url}/problems`, newProblem);
      dispatch({ type: "problemHead", payload: "" });
      dispatch({ type: "problemContent", payload: "" });
      navigate(`/home/detailproblem/${newProblem.id}`);

      toast.success("Problem eklendi.!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      alert("Problem oluşturmak için giriş yapınız!");
    }
  };

  const actionLike = async (problemId) => {
    if (state.activeUser && localStorage.getItem("userToken")) {
      const problem = state.problems.find(
        (problem) => problem.id === problemId
      );
      // console.log("bu tıklanan problem problems'lerden arandı bulundu getirildi",problem);
      if (problem.likesUserId.find((id) => id === state.activeUser.id)) {
        // alert("problems'lerden arandı bakıldı bu user bu problemi beğenmiş ")
        const response = await axios.get(`${url}/problems?id=${problemId}`);

        const likesUserIds = await response.data[0].likesUserId.filter(
          (id) => id !== state.activeUser.id
        );
        // console.log("userid silinmiş hali taze çekildi. veri: ",likesUserIds);
        await axios.patch(`${url}/problems/${problemId}`, {
          likesUserId: likesUserIds,
        });

        const ubdateProblem = await {
          ...problem,
          likesUserId: response.data[0].likesUserId.filter(
            (id) => id !== state.activeUser.id
          ),
        };
        // console.log("yeni haliyle userid silinmiş olarak problem: ",ubdateProblem);
        dispatch({ type: "activeProblemDetail", payload: ubdateProblem });
        dispatch({ type: "createAndUbdateProblem", payload: ubdateProblem });
      } else {
        // alert("problems'lerden arandı bakıldı bu user bu problemi beğenmemiş")
        const response = await axios.get(`${url}/problems?id=${problemId}`);

        const likesUserIds = await response.data[0].likesUserId;
        likesUserIds.push(state.activeUser.id);
        // console.log("userid taze taze eklenmiş hali . veri: ",likesUserIds);
        await axios.patch(`${url}/problems/${problemId}`, {
          likesUserId: likesUserIds,
        });

        const ubdateProblem = {
          ...problem,
          likesUserId: likesUserIds,
        };
        // console.log("yeni haliyle userid eklenmiş olarak problem: ",ubdateProblem);
        dispatch({ type: "activeProblemDetail", payload: ubdateProblem });
        dispatch({ type: "createAndUbdateProblem", payload: ubdateProblem });
      }
    } else {
      alert("lütfen beğenmek için giriş yapınız!");
    }
  };

  const handleCompletedProblem = async (problemId) => {
    const problem = state.problems.find((problem) => problem.id === problemId);
    problem.isCompleted = !problem.isCompleted;
    await axios.patch(`${url}/problems/${problemId}`, problem);
    dispatch({ type: "createAndUbdateProblem", payload: problem });
    dispatch({ type: "ubdateActiveUserProblem", payload: problem });
  };

  //other
  const userCache = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const response = await axios.get(`${url}/users/${userId}`);
      dispatch({ type: "login", payload: response.data });
    }
  };

  const toggleDropdown = () => {
    dispatch({ type: "isDropdownOpen", payload: !state.isDropdownOpen });
  };

  const handleLogout = async () => {
    dispatch({ type: "login", payload: null });
    dispatch({ type: "selectedCategory", payload: null });
    await axios.patch(`${url}/users/${localStorage.getItem("userId")}`, {
      userToken: "",
    });
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");

    navigate(`/home/login`);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const newFile = new File(
      [file],
      `${state.activeUser.userName}.${file.type.split("/")[1]}`,
      { type: file.type }
    );
    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("userId", state.activeUser.id);
    formData.append("userName", state.activeUser.userName);

    const response = await axios.post(
      "http://localhost:3001/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({ type: "profilePicture", payload: response.data.imagePath });
  };

  useEffect(() => {
    getProblem();
    getCategory();
    getUsers();
    userCache();
    // Check user session validity every 1 minute
    const loginControl = setInterval(async () => {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        const response = await axios.get(`${url}/users/?id=${userId}`);
        const userTokenJson = JSON.stringify(response.data[0].userToken);

        if (userToken !== userTokenJson) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userId");
          dispatch({ type: "login", payload: null });
          alert("Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapınız.");
          navigate("/home/login");
        }
      }
    }, 60000);

    return () => clearInterval(loginControl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        createProblem,
        writeProblemComment,
        actionLike,
        login,
        signupUser,
        editProfile,
        //getCategoryFilterproblem,
        activeUserProblem,
        getProblemDetail,
        handleCompletedProblem,
        getUserDetail,
        toggleDropdown,
        handleLogout,
        handleFileUpload,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
