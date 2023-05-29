import React, { useState } from "react";
import { database } from "./firebase-config";

function SelectForm() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const sendSelectedOptionToFirebase = () => {
    database.ref("caminho/para/o/nó").set(selectedOption);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="option1">Opção 1</option>
        <option value="option2">Opção 2</option>
        <option value="option3">Opção 3</option>
      </select>
      <button onClick={sendSelectedOptionToFirebase}>Enviar</button>
    </div>
  );
}

export default SelectForm;
