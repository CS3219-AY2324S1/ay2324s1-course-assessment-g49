import { useState } from "react";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { languageOptions } from "../../../utils/Languages";

const LanguagesDropdown = ({ handleChangeLanguage }) => {
  const [language, setLanguage] = useState(languageOptions[0]);
  console.log(languageOptions[0]);

  const handleChange = (evt) => {
    setLanguage(evt.target.value);
    handleChangeLanguage(evt.target.value);
  };

  return (
    <Select
      defaultValue={languageOptions[0]}
      value={language}
      onChange={handleChange}
      label="Language"
      size="small"
    >
      {languageOptions.map((language, index) => (
        <MenuItem key={language.id} value={language}>
          {language.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguagesDropdown;
