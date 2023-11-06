/* eslint-disable array-callback-return */
import React, { createContext, useEffect, useReducer } from "react";
import { reducer, initialState } from "../reducer/reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  let url = "http://localhost:3005";

  const getCategory = async () => {
    const response = await axios.get(`${url}/categories`);
    dispatch({ type: "getCategory", payload: await response.data });
  };

  const getProblem = async () => {
    const response = await axios.get(`${url}/problems`);
    dispatch({ type: "getProblems", payload: await response.data });
  };

  const getComments = async () => {
    const response = await axios.get(`${url}/comments`);
    dispatch({ type: "getComments", payload: await response.data });
  };

  const getUsers = async () => {
    const response = await axios.get(`${url}/users`);
    dispatch({ type: "getUsers", payload: await response.data });
  };

  const createProblem = async (e) => {
    e.preventDefault();
    const newProblem = {
      id: state.problems.length,
      userId: state.activeUser.id,
      categoryId: state.categoryId,
      problemHead: state.problemHead,
      problemContent: state.problemContent,
      commentCount: 0,
      likesUserId: [],
      createDate: "25.11.2023",
    };
    dispatch({ type: "createAndUbdateProblem", payload: newProblem });
    await axios.post(`${url}/problems`, newProblem);
    navigate(`/home/detailproblem/${newProblem.id}`);
  };

  const writeProblemComment = async (data) => {
    const newProblemComment = {
      id: state.comments.length,
      problemId: data.id,
      userId: state.activeUser.id,
      commentContent: state.newProblemComment,
      createDate: "25.11.2023",
    };

    await axios.post(`${url}/comments`, newProblemComment);
    dispatch({ type: "createComment", payload: newProblemComment });
    dispatch({
      type: "newProblemComment",
      payload: "",
    });

    data = {
      ...data,
      commentCount: (data.commentCount += 1),
    };
    await axios.patch(`${url}/problems/${data.id}`, data);
    dispatch({ type: "activeProblemDetail", payload: data });
    dispatch({ type: "createAndUbdateProblem", payload: data });
  };

  const actionLike = async (problemId) => {
    if (state.activeUser) {
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

  useEffect(() => {
    getProblem();
    getCategory();
    getComments();
    getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        createProblem,
        writeProblemComment,
        actionLike,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
