import axios from "axios";

export async function login(username, password) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/token/`,
    {
      username,
      password,
    }
  );
  return response.data;
}
