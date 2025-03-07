export const getBaseUrl = () => {
  return "https://user-server-5wqf.onrender.com";
};

// generate a mockId for the new user.
export const getMockId = (userId: string): string => {
  const idInt =  Number(userId)
  return (idInt + 1).toString();
};
