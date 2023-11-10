import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { languageOptions } from "../../../utils/Languages";

const LanguagesDropdown = ({ selectedLanguage, handleChangeLanguage }) => {
  const handleChange = (evt) => {
    const newLanguage = languageOptions.find(
      (lang) => lang.label === evt.target.value
    );
    handleChangeLanguage(newLanguage);
  };

  selectedLanguage = selectedLanguage?.label || languageOptions[0].label;

  return (
    <Select
      value={selectedLanguage}
      onChange={handleChange}
      label="Language"
      size="small"
    >
      {languageOptions.map((languageOption, index) => (
        <MenuItem key={languageOption.id} value={languageOption.label}>
          {languageOption.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguagesDropdown;
