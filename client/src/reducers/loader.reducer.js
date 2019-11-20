const loadingReducer = (state = {}, { type }) => {
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === "REQUEST"
  }
};

export default loadingReducer;
