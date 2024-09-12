// src/services/data-services.js

import Cookies from "js-cookie";
const token = Cookies.get("access_token");

export class RoleService {
  static async getRoles() {
    try {
      const response = await fetch(
        "https://dev.gigagates.com/social-commerce-backend/v1/oauthrole"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Should be an array of roles
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      throw error;
    }
  }

  static async getRole(guid) {
    if (!guid) {
      throw new Error("GUID is required");
    }

    try {
      const response = await fetch(
        `https://dev.gigagates.com/social-commerce-backend/v1/oauthroleprivilege/?guid=${guid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch role: ${error.message}`);
    }
  }

  static async getPrivileges() {
    try {
      const response = await fetch(
        "https://dev.gigagates.com/social-commerce-backend/v1/oauthprivilege"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Failed to fetch privileges:", error);
      throw error;
    }
  }

  static async createRole(roleData) {
    try {
      const response = await fetch(
        "https://dev.gigagates.com/social-commerce-backend/v1/oauthrole/createoauthrole",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roleData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Failed to create role:", error);
      throw error;
    }
  }

  static async updateActiveStatus(guid, activeStatus) {
    if (!guid) {
      throw new Error("GUID is required");
    }

    try {
      const response = await fetch(
        `https://dev.gigagates.com/social-commerce-backend/v1/oauthrole/updateoauthroleactive?guid=${guid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is correct
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ active: activeStatus.toString() }), // Convert to string as the API expects "true"/"false"
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to update active status:", error);
      throw error;
    }
  }

  static async updateRole(guid, roleData) {
    if (!guid) {
      throw new Error("GUID is required");
    }

    try {
      const response = await fetch(
        `https://dev.gigagates.com/social-commerce-backend/v1/oauthrole/updateoauthrole?guid=${guid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roleData), // Make sure roleData has the correct structure
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Update Role", data);

      return data;
    } catch (error) {
      console.error("Failed to update role:", error);
      throw error;
    }
  }
}

export const PrivilegeService = {
  createPrivilege: async (newPrivilege) => {
    const response = await fetch(
      "https://dev.gigagates.com/social-commerce-backend/v1/oauthprivilege/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPrivilege),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create privilege");
    }

    return response.json();
  },
};
