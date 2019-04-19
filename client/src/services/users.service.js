import Axios from "axios";
import { authHeader, roles } from "../utils";

export const UserService = {
  getUsers(queries) {
    return Axios.get("/users" + queries, { headers: authHeader() });
  },
  editUser(formData,role,isLogo) {
    if(role === roles.user){
      return Axios.put("/users", formData, {
        headers: authHeader()
      });
    } else if(role === roles.executor) {
      if (isLogo) {
        const data = new FormData();
        data.append("logo",formData )
        return Axios.put("/companies", data, {
          headers: {
            "Authorization": authHeader().Authorization,
            "Content-Type": "multipart/form-data"
          }
        });
      }
      return Axios.put("/companies", formData, { headers: authHeader() });
    }
  },
  changeStatus(formData, id) {
    return Axios.put(`/users/${id}/block`, formData, { headers: authHeader() })
  },
  deleteUser(formData) {
    return Axios.delete("/users" + formData.id, { headers: authHeader() });
  }
};
