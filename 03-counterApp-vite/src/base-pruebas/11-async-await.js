export const getUser = async (id) => {
  const resp = await fetch(`https://reqres.in/api/users/${id}`);
  const { data } = await resp.json();
  if (data === undefined) throw new Error('Not found');
  return data;
};
