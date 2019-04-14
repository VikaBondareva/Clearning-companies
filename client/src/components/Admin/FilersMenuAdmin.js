import React from "react";
import { Button } from "../common/buttons";
import {Select} from '../common/select';
import { statusUsersArray } from "../../utils";

const selectStatus = [
  {value: '', name:"Все"},
  ...statusUsersArray
]

export default function FilterMenu(props) {
  const { value, onChange, onClick } = props;
  return (
    <div>
      {/* <Button name="Актывные" onClick={()=>handleClick("verified")} />
      <Button name="Заблокированные" onClick={()=>handleClick("locked")} />
      <Button name="Не подтвержденные" onClick={()=>handleClick("notVerified")} /> */}
     <Select
        value={value}
        name="Статус"
        targetValue="status"
        options={selectStatus}
        onChange={onChange}
      />
      <Button name="Найти" onClick={onClick} />
    </div>
  );
}
