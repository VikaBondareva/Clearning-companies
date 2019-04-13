import Axios from "axios";
import { authHeader } from "../helpers/headers.js";

export const UserService = {
  getUsers(queries) {
    return Axios.get("/users" + queries, { headers: authHeader() });
  },
  editUser(formData) {
    return Axios.put("/users" + formData.id, formData, {
      headers: authHeader()
    });
  },
  changeStatus(formData, id) {
    return Axios.put(`/users/${id}/block`, formData, { headers: authHeader() })
  },
  deleteUser(formData) {
    return Axios.delete("/users" + formData.id, { headers: authHeader() });
  }
};
