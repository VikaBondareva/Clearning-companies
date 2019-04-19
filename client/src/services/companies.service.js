import Axios from "axios";
import { authHeader } from "../utils";

export const CompanyService = {
  getCompanies(queries) {
    return Axios.get("/companies" + queries);
  },
  getCompanyById(id) {
    return Axios.get("/companies/" + id);
  },
  getCompaniesAdmin(queries) {
    return Axios.get("/companies/admin" + queries);
  },
  changeStatus(formData, id) {
    return Axios.put(`/companies/${id}/block`, formData, {
      headers: authHeader()
    });
  }
};
