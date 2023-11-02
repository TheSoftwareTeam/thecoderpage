export const initialState = {
  categories: [],
  problems:[],
  comments:[],
  users:[],
  problemDetailPage:{},
  selectedCategory:null
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
        problems: action.payload
      };
      case "getComments":
      return {
        ...state,
        comments: action.payload
      };
      case "getUsers":
      return {
        ...state,
        users: action.payload
      };
      case "newProblemDetail":
        return {
          ...state,
          problemDetailPage: action.payload
        };
        case "selectedCategory":
        return {
          ...state,
          selectedCategory: action.payload
        };
       
      // case "getProblemsDetail":
      // return  {
      //     ...state,
      //     problemsDetail:{
      //       id: action.payload.problem.id,
      //       userName: action.payload.userName,
      //       categoryName: action.payload.categoryName,
      //       problemHead: action.payload.problem.problemHead,
      //       problemContent: action.payload.problem.problemContent,
      //       commentCount: action.payload.problem.commentCount,
      //       createDate: action.payload.problem.createDate
      //     }
      // }
      

    default:
      return state;
  }
};
