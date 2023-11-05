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
  activeUser: {
    id: 1,
    name: "Mahir",
    surName: "KURŞUN",
    userName: "mqhirkursun7",
    email: "mqhir7@icloud.com",
    password: "123",
    userPicture: "",
    problemCount: 4,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
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
    case "createProblem":
      return {
        ...state,
        problems: [...state.problems, action.payload],
      };
      case "ubdateLike":
      return {
        ...state,
       problems:[...state.problems, action.payload],
      };
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
