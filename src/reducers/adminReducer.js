export const initialState = {
    //login
    activeUser: null,
    //signup
    signupUserName: "",
    signupEmail: "",
    signupPassword: "",
    //profile
    profileName: "",
    profileSurname: "",
    profileUserName: "",
    profileEmail: "",
    profileRol: "",
    profilePicture: "",
    //user
    users: [],
    userDetail:{},
    //navi
    isDropdownOpen: false,
    //comment
    comments: [],
    //category
    categories: [],
    //problem
    problems: [],
    activeProblemDetail: {
      likesUserId: [],
    },
  };
  
  export const adminReducer = (state, action) => {
    
    switch (action.type) {
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
      case "profileUserName":
        return {
          ...state,
          profileUserName: action.payload,
        };
      case "profileEmail":
        return {
          ...state,
          profileEmail: action.payload,
        };
      case "profileRol":
        return {
          ...state,
          profileRol: action.payload,
        };
    //user
      case "createUser":
        return {
          ...state,
          users: [...state.users, action.payload],
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
    //problem
      case "getProblems":
        return {
          ...state,
          problems: action.payload,
        };
      case"problemSil":
        return {
          ...state,
          problems: state.problems.filter(
            (problem) => problem.id !== action.id
          ),
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
  