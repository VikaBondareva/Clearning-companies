import Axios from "axios";

export const CompanyService = {
  getCompanies(queries) {
    return Axios.get("/companies" + queries);
  },
  getCompanyById(id) {
    return Axios.get("/companies/" + id);
  }
};
