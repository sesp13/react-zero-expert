/*
  Export all FE environment vars
  This is required because in the testing this function is mocked to return the respective env values
*/
export const getEnvironments = () => {
  import.meta.env;
  return {
    ...import.meta.env,
  };
};
