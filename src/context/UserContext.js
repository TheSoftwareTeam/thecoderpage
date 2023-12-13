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
      dispatch({ type: "isLoginPage" });
      if (response.data[0].verify === false) {
        console.log(response.data[0].userName);
        navigate(`/home/profile/${response.data[0].userName}/edit`);
      } else {
        localStorage.setItem("userId", JSON.stringify(response.data[0].id));
        localStorage.setItem(
          "userToken",
          JSON.stringify(`${response.data[0].name}${Math.random()}`)
        );
        await axios.patch(`${url}/users/${response.data[0].id}`, {
          userToken: JSON.parse(localStorage.getItem("userToken")),
        });
        navigate(`/home/main`);
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
    dispatch({ type: "isSignUpPage" });
    dispatch({ type: "isLoginPage" });
    
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
        isActive:true
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

    //resim içinde düzenlenecek
    if (
      (state.profileName !== state.activeUser.name &&
        state.profileSurname !== state.activeUser.surName)||
        state.profilePicture !== state.activeUser.userPicture
    ) {
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

      if (state.activeUser.verify === false) {
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem(
          "userToken",
          JSON.stringify(`${state.profileName}${Math.random()}`)
        );
        await axios.patch(`${url}/users/${userId}`, {
          userToken: JSON.parse(localStorage.getItem("userToken")),
        });
      }
      navigate(`/home/listproblem/`);
    }
    else{
      alert("Değişiklik yapılmadı!")
    }
  };
  const getProfilDetail = async (userName) => {
    const response = await axios.get(`${url}/users/?userName=${userName}`);
    dispatch({ type: "getProfilDetail", payload: await response.data[0] });
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
  //problem
  const getProblem = async (isMore) => {
    let page = 1;
    if (isMore) {
      dispatch({ type: "loadMorePages", payload:await state.pages + 1 });
      page = state.pages;
    }
    dispatch({ type: "hideLoadMoreButton", payload: true });
    const response = await axios.get(`${url}/problems`, {
      params: {
        categoryId: state.selectedCategory ? state.selectedCategory:(state.filterCategory.length!==0?state.filterCategory:null),
        _sort: "createDate",
        _order: "desc",
        _limit: 4,
        _page: page,
         isCompleted:state.filterIscompleted&&state.filterIscompleted==="true"?true:state.filterIscompleted==="false"?false:null,
         createDate_gte:state.filterDate&&calculateDate(state.filterDate),
      },
    });
    response.data.length < 4 &&  dispatch({ type: "hideLoadMoreButton", payload: false });
    if (isMore) {
      dispatch({ type: "getMoreProblems", payload: await response.data });
    } else {
      dispatch({ type: "getProblems", payload: await response.data });
      dispatch({ type: "loadMorePages", payload: 2 });
    }
  };

  const activeUserProblem = async (isMore,userName) => {
    const user = await axios.get(`${url}/users?userName=${userName}`);

    let page = 1;
    if (isMore) {
      dispatch({ type: "loadMorePages", payload:await state.pages + 1 });
      page = state.pages;
    }
    dispatch({ type: "hideLoadMoreButton", payload: true });
    const response = await axios.get(`${url}/problems`, {
      params: {
        userId: user.data[0].id,
        categoryId: state.filterCategory.length!==0?state.filterCategory:null,
        _sort: "createDate",
        _order: "desc",
        _limit: 4,
        _page: page,
         isCompleted:state.filterIscompleted&&state.filterIscompleted==="true"?true:state.filterIscompleted==="false"?false:null,
         createDate_gte:state.filterDate&&calculateDate(state.filterDate),
         q:state.filterSearch&&state.filterSearch,
      },
    });
    response.data.length < 4 &&  dispatch({ type: "hideLoadMoreButton", payload: false });
    if (isMore) {
      dispatch({ type: "moreActiveUserProblem", payload: await response.data });
    } else {
      dispatch({ type: "activeUserProblem", payload: response.data });
      dispatch({ type: "loadMorePages", payload: 2 });
    }
  };


  const getPopularProblem = async () => {
    const response = await axios.get(`${url}/problems`, {
      params: {
        _sort: "likesUserId.length", // Sıralama yapmak istediğiniz alanı belirtin
        _order: "desc", // Sıralama yöntemini belirtin (desc: azalan, asc: artan)
        _limit: 5, // Her istekte kaç veri alınacağını belirtin
      },
    });
    dispatch({ type: "getPopularProblems", payload: await response.data });
  };

 

  const getProblemDetail = async (id) => {
    const response = await axios.get(`${url}/problems/${Number(id)}`);
    dispatch({ type: "activeProblemDetail", payload: await response.data });
  };

  const getSearchList=async()=>{
    const response = await axios.get(`${url}/problems`,{params:{q:state.naviFilterSearch,_limit:10}});
    dispatch({ type: "searchList", payload: await response.data });
  }

  const createProblem = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("userToken")) {
      const newProblem = {
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
      const response = await axios.post(`${url}/problems`, newProblem);
      dispatch({ type: "problemHead", payload: "" });
      dispatch({ type: "problemContent", payload: "" });
      navigate(`/home/detailproblem/${response.data.id}`);

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
      const response = await axios.get(`${url}/problems?id=${problemId}`);
      const problem = response.data[0];
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
        dispatch({ type: "ubdatePopulerProblem", payload: ubdateProblem });
        dispatch({ type: "createAndUbdateProblem", payload: ubdateProblem });
        dispatch({ type: "ubdateActiveUserProblem", payload: ubdateProblem });
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
        dispatch({ type: "ubdatePopulerProblem", payload: ubdateProblem });
        dispatch({ type: "createAndUbdateProblem", payload: ubdateProblem });
        dispatch({ type: "ubdateActiveUserProblem", payload: ubdateProblem });
      }
    } else {
      alert("lütfen beğenmek için giriş yapınız!");
    }
  };

  const handleCompletedProblem = async (problemId) => {
    const response = await axios.get(`${url}/problems/${problemId}`);
    const problem= response.data;
    problem.isCompleted = !problem.isCompleted;
    await axios.patch(`${url}/problems/${problemId}`, problem);
    dispatch({ type: "activeProblemDetail", payload: problem });
    dispatch({ type: "ubdatePopulerProblem", payload: problem });
    
    dispatch({ type: "ubdateActiveUserProblem", payload: problem });
    
  };
const sendComplaint = async (problemId) => {
    const newComplaint = {
      userId: state.activeUser.id,
      problemId: problemId,
      complaintContent: state.complaintTextarea,
      status: "submitted",
      createDate: date(),
    };
    dispatch({ type: "complaintTextarea", payload: "" });
    dispatch({ type: "isComplaintPage" });
    await axios.post(`${url}/complaints`, newComplaint);
    alert("Şikayetiniz gönderildi. En kısa sürede incelenecektir.");
  }
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
    getPopularProblem();
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
    }, 240000);

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
        activeUserProblem,
        getProblemDetail,
        getProblem,
        sendComplaint,
        getPopularProblem,
        handleCompletedProblem,
        getUserDetail,
        toggleDropdown,
        handleLogout,
        handleFileUpload,
        formatRelativeTime,
        getProfilDetail,
        getSearchList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
