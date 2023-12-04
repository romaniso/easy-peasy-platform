import { useState } from "react";
import Dropdown from "../components/Dropdown";

function DropdownPage() {
  const [selection, setSelect] = useState(null);
  const options = [
    { label: "Red Color", value: "red" },
    { label: "Blue Color", value: "blue" },
    { label: "White Color", value: "white" },
  ];

  const handleSelect = (option) => {
    setSelect(option);
  };

  return (
    <section>
      <Dropdown value={selection} onChange={handleSelect} options={options} />
    </section>
  );
}

export default DropdownPage;
