export const initialState = {
  //login
  activeUser: null,
  loginUserName: "",
  loginPassword: "",
  //signup
  signupUserName: "",
  signupEmail: "",
  signupPassword: "",
  //profile
  profileName: "",
  profileSurname: "",
  profilePicture: "",
  profileDetail: {},
  //user
  users: [],
  userDetail: {},
  pictureUsers:{},
  //navi
  isDropdownOpen: false,
  isLoginPage: false,
  isSignUpPage: false,
  //complaint
  isComplaintPage: false,
  complaintTextarea: "",
  //comment
  comments: [],
  newProblemComment: "",
  //category
  categories: [],
  selectedCategory: null,
  categoryId: null,
  //problem
  problems: [],
  problemContent: "",
  problemHead: "",
  categoryFilterProblem: [],
  activeUserProblem: [],
  populerProblems: [],
  activeProblemDetail: {
    likesUserId: [],
    comments: [],
  },
  pages: 2,
  loadMoreButton: true,
  //filterProblem
  filterCategory: [],
  filterDate: "0",
  filterIscompleted: "0",
  filterSearch: "",
  naviFilterSearch: "",
  searchList: []
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "isComplaintPage":
      return {
        ...state,
        isComplaintPage: state.isComplaintPage ? false : true,
      };
    case "complaintTextarea":
      return {
        ...state,
        complaintTextarea: action.payload,
      };

    //login
    case "login":
      return {
        ...state,
        activeUser: action.payload,
      };
    case "loginUserName":
      return {
        ...state,
        loginUserName: action.payload,
      };
    case "loginPassword":
      return {
        ...state,
        loginPassword: action.payload,
      };
    //signup
    case "signupUserName":
      return {
        ...state,
        signupUserName: action.payload,
      };
    case "signupEmail":
      return {
        ...state,
        signupEmail: action.payload,
      };
    case "signupPassword":
      return {
        ...state,
        signupPassword: action.payload,
      };
    //profile
    case "profileName":
      return {
        ...state,
        profileName: action.payload,
      };
    case "profileSurname":
      return {
        ...state,
        profileSurname: action.payload,
      };
    case "profilePicture":
      return {
        ...state,
        profilePicture: action.payload,
      };
    case "getProfilDetail":
      return {
        ...state,
        profileDetail: action.payload,
      };
    case "activeTab":
      return {
        ...state,
        activeTab: action.payload,
      };
    //user
    case "createUser":
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        // Kullanıcı bulundu, güncelle
        return {
          ...state,
          users: state.users.map((user, index) =>
            index === userIndex ? action.payload : user
          ),
        };
      } else {
        // Kullanıcı bulunamadı, ekle
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      }
    case "getUsers":
      return {
        ...state,
        users: action.payload,
      };
    case "getUserDetail":
      return {
        ...state,
        userDetail: action.payload,
      };
    case "pictureUsers":
      return {
        ...state,
        pictureUsers: action.payload,
      };
    //navi
    case "isDropdownOpen":
      return {
        ...state,
        isDropdownOpen: action.payload,
      };
    case "isLoginPage":
      return {
        ...state,
        isLoginPage: state.isLoginPage ? false : true,
      };
    case "isSignUpPage":
      return {
        ...state,
        isSignUpPage: state.isSignUpPage ? false : true,
      };
    //comment
    case "getComments":
      return {
        ...state,
        comments: action.payload,
      };
    case "createComment":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "newProblemComment":
      return {
        ...state,
        newProblemComment: action.payload,
      };
    //category
    case "getCategory":
      return {
        ...state,
        categories: action.payload,
      };
    case "selectedCategory":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "categoryId":
      return {
        ...state,
        categoryId: action.payload,
      };
    case "categoryName":
      return {
        ...state,
        categoryName: action.payload,
      };

    //problem
    case "getProblems":
      return {
        ...state,
        problems: action.payload,
      };
    case "getMoreProblems":
      return {
        ...state,
        problems: [...state.problems, ...action.payload],
      };
    case "loadMorePages":
      return {
        ...state,
        pages: action.payload,
      };
    case "hideLoadMoreButton":
      return {
        ...state,
        loadMoreButton: action.payload,
      };
    case "problemContent":
      return {
        ...state,
        problemContent: action.payload,
      };
    case "problemSil":
      return {
        ...state,
        problems: state.problems.filter((problem) => problem.id !== action.id),
      };
    case "createAndUbdateProblem":
      const newProblem = action.payload;
      // Eğer yeni problem mevcut problemler listesinde değilse ekle
      if (!state.problems.some((problem) => problem.id === newProblem.id)) {
        return {
          ...state,
          problems: [...state.problems, newProblem],
        };
      } else {
        // Eğer yeni eklenmek istenen problem zaten mevcutsa, güncelle
        return {
          ...state,
          problems: state.problems.map((problem) =>
            problem.id === newProblem.id ? newProblem : problem
          ),
        };
      }

    case "categoryFilterProblem":
      return {
        ...state,
        categoryFilterProblem: action.payload,
      };
    case "activeUserProblem":
      return {
        ...state,
        activeUserProblem: action.payload,
      };

    case "moreActiveUserProblem":
      return {
        ...state,
        activeUserProblem: [...state.activeUserProblem, ...action.payload],
      };
    case "activeProblemDetail":
      return {
        ...state,
        activeProblemDetail: action.payload,
      };
    case "getPopularProblems":
      return {
        ...state,
        populerProblems: action.payload,
      };
    case "ubdatePopulerProblem":
      const ubdateProblem = action.payload;
      return {
        ...state,
        populerProblems: state.populerProblems.map((problem) =>
          problem.id === ubdateProblem.id ? ubdateProblem : problem
        ),
      };

    case "ubdateActiveUserProblem":
      const newActiveUserProblem = action.payload;
      // Eğer yeni problem mevcut problemler listesinde değilse ekle
      if (
        !state.activeUserProblem.some(
          (problem) => problem.id === newActiveUserProblem.id
        )
      ) {
        return {
          ...state,
          activeUserProblem: [...state.activeUserProblem, newActiveUserProblem],
        };
      } else {
        // Eğer yeni eklenmek istenen problem zaten mevcutsa, güncelle
        return {
          ...state,
          activeUserProblem: state.activeUserProblem.map((problem) =>
            problem.id === newActiveUserProblem.id
              ? newActiveUserProblem
              : problem
          ),
        };
      }
    case "problemHead":
      return {
        ...state,
        problemHead: action.payload,
      };
//FilterProblem
case "filterCategory":
  return {
    ...state,
    filterCategory: action.payload,
  };
case "filterDate":
  return {
    ...state,
    filterDate: action.payload,
  };
case "filterIscompleted":
  return {
    ...state,
    filterIscompleted: action.payload,
  };
case "filterSearch":
  return {
    ...state,
    filterSearch: action.payload,
  };
case "naviFilterSearch":
  return {
    ...state,
    naviFilterSearch: action.payload,
  };
case "searchList":
  return {
    ...state,
    searchList: action.payload,
  };
  default:
      return state;
  }

};
