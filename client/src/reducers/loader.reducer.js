const loadingReducer = (state = false, action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);
    
    if (!matches) return state;  
    
    const [, requestName, requestState] = matches;
    return requestState === 'REQUEST';
    // return {
    //   ...state,
    //   [requestName]: requestState === "REQUEST"
    // }
  };

export default loadingReducer;