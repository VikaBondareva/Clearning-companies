import React from "react";
import { AdminPageComponent as AdminPage } from "../AdminPage";
import { roles } from "../../../utils";

export function ControlCompanies({
  docs,
  total,
  page,
  pages,
  getCompaniesControl,
  changeStatusCompany,
  isLoading
}) {
  return (
    <AdminPage
      role={roles.executor}
      changeStatus= {changeStatusCompany}
      loadListControl={getCompaniesControl}
      docs={docs}
      total={total}
      page={page}
      pages={pages}
      isLoading={isLoading}
    />
  );
}
