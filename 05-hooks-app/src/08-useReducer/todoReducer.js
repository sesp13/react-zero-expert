export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ABC':
      throw new Error('Actiom.type = ABC is not implemented');

    default:
      return state;
  }
};
