export const initialState = {
  categories: [],
  problems: [],
  comments: [],
  users: [],
  activeProblemDetail: {
    likesUserId: [],
  },
  selectedCategory: null,
  categoryId: null,
  problemContent: "",
  problemHead: "",
  newProblemComment: "",
  activeUser: null,
  loginUserName: "",
  loginPassword: "",
  signupUserName: "",
  signupEmail: "",
  signupPassword: "",
  profileName: "",
  profileSurname: "",
  profilePicture: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
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
    case "createUser":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
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
    case "getCategory":
      return {
        ...state,
        categories: action.payload,
      };
    case "getProblems":
      return {
        ...state,
        problems: action.payload,
      };
    case "getComments":
      return {
        ...state,
        comments: action.payload,
      };
    case "getUsers":
      return {
        ...state,
        users: action.payload,
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

    case "createComment":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "activeProblemDetail":
      return {
        ...state,
        activeProblemDetail: action.payload,
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
    case "problemHead":
      return {
        ...state,
        problemHead: action.payload,
      };
    case "problemContent":
      return {
        ...state,
        problemContent: action.payload,
      };
    case "newProblemComment":
      return {
        ...state,
        newProblemComment: action.payload,
      };

    default:
      return state;
  }
};
