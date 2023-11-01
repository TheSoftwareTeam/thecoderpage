export const initialState = {
  categories: [],
  problems:[],
  comments:[]
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "getCategory":
      return {
        ...state,
        categories: action.payload
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
      // case "getUserInfo":
      // return {
      //   ...state,
      //   comments: action.payload
      // };

    default:
      return state;
  }
};
