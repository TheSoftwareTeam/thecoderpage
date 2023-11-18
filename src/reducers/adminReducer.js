export const initialState = {
  //login
  activeUser: null,
  //signup
  createUserName: "",
  createEmail: "",
  createPassword: "",
  //user
  userName: "",
  userSurname: "",
  userUserName: "",
  userEmail: "",
  userRol: "",
  userPicture: "",
  //user
  users: [],
  userDetail: {},
  //navi
  isDropdownOpen: false,
  
  //category
  categories: [],
  categoryName: "",
  //problem
  problems: [],
  activeProblemDetail: {
    likesUserId: [],
    comments: [],
  },
};

export const adminReducer = (state, action) => {
  switch (action.type) {
    //Create User
    case "createUserName":
      return {
        ...state,
        createUserName: action.payload,
      };
    case "createEmail":
      return {
        ...state,
        createEmail: action.payload,
      };
    case "createPassword":
      return {
        ...state,
        createPassword: action.payload,
      };
    //user
    case "userName":
      return {
        ...state,
        userName: action.payload,
      };
    case "userSurname":
      return {
        ...state,
        userSurname: action.payload,
      };
    case "userUserName":
      return {
        ...state,
        userUserName: action.payload,
      };
    case "userEmail":
      return {
        ...state,
        userEmail: action.payload,
      };
    case "userRol":
      return {
        ...state,
        userRol: action.payload,
      };
    case "userPicture":
      return {
        ...state,
        userPicture: action.payload,
      };
    //user
    case "createUser":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ubdateUser":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
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
    //navi
    case "isDropdownOpen":
      return {
        ...state,
        isDropdownOpen: action.payload,
      };
    //comment
    case "getComments":
      return {
        ...state,
        comments: action.payload,
      };
    //category
    case "getCategory":
      return {
        ...state,
        categories: action.payload,
      };
      case "getCategoryDetail":
        return {
          ...state,
          categoryDetail: action.payload,
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
    case "createCategory":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "deletedCategory":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.isDeleted === false
        ),
      };
    //problem
    case "getProblems":
      return {
        ...state,
        problems: action.payload,
      };
    case "problemSil":
      return {
        ...state,
        problems: state.problems.filter((problem) => problem.id !== action.id),
      };
    case "activeProblemDetail":
      return {
        ...state,
        activeProblemDetail: action.payload,
      };
    default:
      return state;
  }
};
