import React from "react";
import Select from "../../common/select/SetectComponent";
import { SelectChip } from "../../common/select";
import { statusOrders } from "../../../helpers";

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
        options={statusOrders}
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
