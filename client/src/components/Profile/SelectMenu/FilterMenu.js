import React from "react";
import { SelectChip,Select } from "../../common/select";
import { statusOrdersArray } from "../../../helpers";

export default function FilterMenu(props) {
  const {
    services,
    statusValue,
    servicesTypes,
    onChange,
  } = props;
  return (
    <div>
      <Select
        value={statusValue}
        name="Статус заказа"
        targetValue="status"
        options={statusOrdersArray}
        onChange={onChange}
      />
      <SelectChip
        services={services}
        onChange={onChange}
        servicesTypes={servicesTypes}
        name="services"
      />
    </div>
  );
}
