import api from "./api"

export async function login({
  email,
  password
}) {

  const formData =
    new URLSearchParams()

  formData.append(
    "username",
    email
  )

  formData.append(
    "password",
    password
  )

  const response =
    await api.post(

      "/auth/login",

      formData,

      {
        headers: {
          "Content-Type":
          "application/x-www-form-urlencoded"
        }
      }
    )

  return response.data
}

export async function register(data) {

  const response = await api.post(
    "/register",
    data
  )

  return response.data
}

export async function logout() {

  const response = await api.post(
    "/auth/logout"
  )

  return response.data
}

export async function getCurrentUser() {

  const response = await api.get(
    "/users/me"
  )

  return response.data
}