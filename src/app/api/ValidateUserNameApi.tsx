export const checkUsernameAvailability = async (username: string): Promise<string | null> => {
  if (username.trim().length < 2) return "More Characters";
  
  try
  {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
    const data = await response.json();
    
    return data.length > 0 ? "Username already taken" : null;
  }
  catch (error)
  {
    return "Error checking username";
  }
};
