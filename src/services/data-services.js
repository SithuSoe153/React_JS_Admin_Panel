export class RoleService {
  static async fetchRole(guid) {
    if (!guid) {
      throw new Error("GUID is required");
    }

    try {
      const response = await fetch(`https://b323-43-239-207-38.ngrok-free.app/social-commerce-backend/v1/oauthrole`);
      console.log(response);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch role: ${error.message}`);
    }
  }
}
