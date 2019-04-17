import Axios from "axios";
import { authHeader } from "../utils";

export const CompanyService = {
  getCompanies(queries) {
    return Axios.get("/companies" + queries);
  },
  getCompanyById(id) {
    return Axios.get("/companies/" + id);
  },
  editCompany(formData, isLogo) {
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
  },
  deleteCompany(formData) {
    return Axios.delete("/companies/" + formData.id, { headers: authHeader() });
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
