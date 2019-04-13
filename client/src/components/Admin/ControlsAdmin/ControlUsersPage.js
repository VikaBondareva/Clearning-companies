import React from "react";
import { AdminPageComponent as AdminPage } from "../AdminPage";
import { roles } from "../../../helpers";

export function ControlUsers({
  docs,
  total,
  page,
  pages,
  getUsersControl,
  changeStatusUser,
  isLoading
}) {
  return (
    <AdminPage
      role={roles.user}
      changeStatus= {changeStatusUser}
      loadListControl={getUsersControl}
      docs={docs}
      total={total}
      page={page}
      pages={pages}
      isLoading={isLoading}
    />
  );
}
