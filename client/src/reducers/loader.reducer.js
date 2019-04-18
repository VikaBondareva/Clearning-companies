const loadingReducer = (state = {}, { type }) => {
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  // return requestState === 'REQUEST';
  return {
    ...state,
    [requestName]: requestState === "REQUEST"
  }
  // return getLoading(state, requestName, requestState);
};

// const getLoading = (state, requestName, requestState) => {
//   if (requestState !== "REQUEST") {
//     delete state[requestName];
//   } else state[requestName] = true;
//   return state;
// };

export default loadingReducer;
