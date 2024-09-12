class AuthService {
  login(username, password) {
    return fetch("https://dev.gigagates.com/social-commerce-backend/v1/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          return {
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token,
          };
        }
        throw new Error("Login failed");
      });
  }

  getUserInfo(accessToken) {
    if (!accessToken) return Promise.reject("No access token found");

    return fetch(
      "https://dev.gigagates.com/social-commerce-backend/v1/person/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => response.json());
  }

  logout(removeCookie) {
    removeCookie("access_token", { path: "/" });
    removeCookie("refresh_token", { path: "/" });
    removeCookie("user_info", { path: "/" });
  }
}

export default new AuthService();
