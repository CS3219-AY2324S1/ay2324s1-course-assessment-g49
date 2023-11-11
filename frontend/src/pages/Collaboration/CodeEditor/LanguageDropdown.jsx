import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { languageOptions } from "../../../utils/Languages";
import { YjsContext } from "./CodeEditorLanding";
import { LanguageContext } from "../../../utils/LanguageContextUtil";
import { useContext } from "react";

const LanguagesDropdown = () => {
  const { language, handleChangeLanguage } = useContext(LanguageContext);
  const { provider } = useContext(YjsContext);

  const handleChange = (evt) => {
    const newLanguage = languageOptions.find(
      (lang) => lang.label === evt.target.value
    );
    handleChangeLanguage(newLanguage);
    provider.awareness.setLocalStateField("selectedLanguage", newLanguage);

    if (provider) {
      provider.awareness.setLocalStateField("selectedLanguage", newLanguage);
    }
  };

  return (
    <Select
      value={language?.label}
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
