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
  userIsActive: "",
  //user
  users: [],
  userDetail: {},
  //navi
  isDropdownOpen: false,

  //category
  categories: [],
  categoryName: "",
  categoryDetail: {},
  //problem
  problems: [],
  activeProblemDetail: {
    likesUserId: [],
    comments: [],
  },
  pages: 2,
  loadMoreButton: true,
  //comment
  problemComments: [],
  activeCommentDetail: {},
  //complaint
  complaints: [],
  complaintDetail: {},
  complaintStatus: "",
  //filterProblem
  fltProblemCategory: [],
  fltProblemDate: null,
  fltProblemIscompleted: null,
  fltProblemSearch: "",
  fltProblemIsdeleted: false,
  fltProblemUserName: "",
  //filterComments
  fltrCommentDate: null,
  fltrCommentSearch: "",
  fltrCommentIsdeleted: false,
  fltrCommentUserName: "",
  //filterComplaints
  fltrComplaintDate: null,
  fltrComplaintSearch: "",
  fltrComplaintUserName: "",
  fltrComplaintToUserName: "",
  fltrComplaintStatus: "",
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
    case "userIsActive":
      const aktif = action.payload === "true" ? true : false;
      return {
        ...state,
        userIsActive: aktif,
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

    case "getCommentDetail":
      return {
        ...state,
        activeCommentDetail: action.payload,
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
    //comment
    case "getproblemComments":
      return {
        ...state,
        problemComments: action.payload,
      };
    case "getMoreproblemComments":
      return {
        ...state,
        problemComments: [...state.problemComments, ...action.payload],
      };
    //complaint
    case "getComplaints":
      return {
        ...state,
        complaints: action.payload,
      };
    case "getMoreComplaints":
      return {
        ...state,
        complaints: [...state.complaints, ...action.payload],
      };
    case "getComplaintDetail":
      return {
        ...state,
        complaintDetail: action.payload,
      };
    case "complaintStatus":
      return {
        ...state,
        complaintStatus: action.payload,
      };
    //filterProblem
    case "fltProblemCategory":
      return {
        ...state,
        fltProblemCategory: action.payload,
      };
    case "fltProblemDate":
      return {
        ...state,
        fltProblemDate: action.payload,
      };
    case "fltProblemIscompleted":
      return {
        ...state,
        fltProblemIscompleted: action.payload,
      };
    case "fltProblemSearch":
      return {
        ...state,
        fltProblemSearch: action.payload,
      };

    case "fltProblemIsdeleted":
      return {
        ...state,
        fltProblemIsdeleted: action.payload,
      };
    case "fltProblemUserName":
      return {
        ...state,
        fltProblemUserName: action.payload,
      };
    case "filterStatus":
      return {
        ...state,
        filterStatus: action.payload,
      };
    //filterComment
    case "fltrCommentDate":
      return {
        ...state,
        fltrCommentDate: action.payload,
      };
    case "fltrCommentSearch":
      return {
        ...state,
        fltrCommentSearch: action.payload,
      };
    case "fltrCommentIsdeleted":
      return {
        ...state,
        fltrCommentIsdeleted: action.payload,
      };
    case "fltrCommentUserName":
      return {
        ...state,
        fltrCommentUserName: action.payload,
      };
    //filterComplaint
    case "fltrComplaintDate":
      return {
        ...state,
        fltrComplaintDate: action.payload,
      };
    case "fltrComplaintSearch":
      return {
        ...state,
        fltrComplaintSearch: action.payload,
      };
    case "fltrComplaintIsdeleted":
      return {
        ...state,
        fltrComplaintIsdeleted: action.payload,
      };
    case "fltrComplaintUserName":
      return {
        ...state,
        fltrComplaintUserName: action.payload,
      };
    case "fltrComplaintToUserName":
      return {
        ...state,
        fltrComplaintToUserName: action.payload,
      };
    case "fltrComplaintStatus":
      return {
        ...state,
        fltrComplaintStatus: action.payload,
      };
    default:
      return state;
  }
};
