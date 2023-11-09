import { useState, createContext } from "react";
import CollabCodeEditor from "./CollabCodeEditor";
import axios from "axios";
import { languageOptions } from "../../../utils/Languages";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguageDropdown";
import { Grid, Button } from "@mui/material";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

const pythonDefault = `// some comment`;

export const YjsContext = createContext(null);

const CodeEditorLanding = () => {
  const [code, setCode] = useState(pythonDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]);

  const doc = new Y.Doc();
  const [provider] = useState(() => new WebrtcProvider("test-room", doc));

  const handleChangeLanguage = (newLanguage) => {
    console.log(newLanguage);
    setLanguage(newLanguage);
  };
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        //processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        //showSuccessToast(`Compiled Successfully!`)
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      //showErrorToast();
    }
  };

  return (
    <YjsContext.Provider value={{ provider, awareness: provider.awareness }}>
      <Grid container direction="column" alignItems="flex-start" spacing={2}>
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <LanguagesDropdown handleChangeLanguage={handleChangeLanguage} />
          </Grid>
          <Grid item>
            <Button
              onClick={handleCompile}
              disabled={!code}
              variant="contained"
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <CollabCodeEditor
            code={code}
            onChange={onChange}
            language={language?.value}
          />
        </Grid>
        <Grid container item direction="row" justifyContent="space-between">
          <Grid item>
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          </Grid>
          <Grid item>
            <OutputWindow outputDetails={outputDetails} />
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </Grid>
        </Grid>
      </Grid>
    </YjsContext.Provider>
  );
};
export default CodeEditorLanding;
