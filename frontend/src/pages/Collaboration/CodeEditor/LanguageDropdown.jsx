import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { languageOptions } from "../../../utils/Languages";

const LanguagesDropdown = ({ handleChangeLanguage }) => {
  const [language, setLanguage] = useState("");

  const handleChange = (evt) => {
    setLanguage(evt.target.value);
    handleChangeLanguage(evt.target.value);
  };
  //line 15 check what you pass as key and value
  return (
    <Select value={language} onChange={handleChange} autoWidth label="Language">
      {languageOptions.map((language, index) => (
        <MenuItem key={language.id} value={language}>
          {language.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguagesDropdown;
