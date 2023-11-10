import { useState, createContext, useEffect, useRef } from "react";
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
import { QuillBinding } from "y-quill";
import QuillCursors from "quill-cursors";

export const YjsContext = createContext(null);

function CodeEditorLanding() {
  const [code, setCode] = useState(`Start coding`);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [provider, setProvider] = useState(null);
  const [doc, setDoc] = useState(null);
  const lastCompileTimeRef = useRef(0);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.userId;

  useEffect(() => {
    const doc = new Y.Doc();
    const text = doc.getText("monaco");
    console.log("after mounting landing", text.toString().length);
    const newProvider = new WebrtcProvider("test-room", doc);

    newProvider.awareness.setLocalStateField("user", {
      name: userId,
    });

    setProvider(newProvider);
    setDoc(doc);
    setLanguage(language);

    return () => {
      newProvider.destroy();
    };
  }, []);

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    if (provider) {
      provider.awareness.setLocalStateField("selectedLanguage", newLanguage);
    }
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        console.log("onchange", data, language);
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

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log("res.data", response.data);
    //     const token = response.data.token;
    //     checkStatus(token);
    //   })
    //   .catch((err) => {
    //     let error = err.response ? err.response.data : err;
    //     setProcessing(false);
    //     console.log(error);
    //   });

    if (provider) {
      provider.awareness.setLocalStateField(
        "compileClicked",
        new Date().getTime()
      );
    }
  };

  useEffect(() => {
    if (!provider) {
      return;
    }
    const handleCompileUpdate = ({ added, updated, removed }) => {
      const localClientID = provider.awareness.clientID;
      updated.forEach((clientID) => {
        if (clientID !== localClientID) {
          const clientState = provider.awareness.getStates().get(clientID);

          if (clientState?.compileClicked) {
            const currentTime = new Date().getTime();
            const difference =
              (currentTime - lastCompileTimeRef.current) / 1000;
            if (difference > 5) {
              handleCompile();
              lastCompileTimeRef.current = currentTime;
            }
          }
        }
      });
    };
    provider?.awareness.on("change", handleCompileUpdate);

    return () => {
      provider?.awareness.off("change", handleCompileUpdate);
    };
  }, [provider, handleCompile]);

  useEffect(() => {
    if (!provider) {
      return;
    }
    const handleLanguageUpdate = ({ added, updated, removed }) => {
      const localClientID = provider.awareness.clientID;
      updated.forEach((clientID) => {
        if (clientID !== localClientID) {
          const clientState = provider.awareness.getStates().get(clientID);
          const clientLangObject = JSON.stringify(clientState.selectedLanguage);
          const currentLangObject = JSON.stringify(language);
          if (clientLangObject !== currentLangObject) {
            handleChangeLanguage(clientState.selectedLanguage);
          }
        }
      });
    };
    provider?.awareness.on("change", handleLanguageUpdate);

    return () => {
      provider?.awareness.off("change", handleLanguageUpdate);
    };
  }, [provider, language]);

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

  if (!provider) {
    return <div>Loading...</div>;
  }
  return (
    <YjsContext.Provider value={{ provider, doc: doc }}>
      <Grid container direction="column" alignItems="flex-start" spacing={2}>
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <LanguagesDropdown
              selectedLanguage={language}
              handleChangeLanguage={handleChangeLanguage}
            />
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
}
export default CodeEditorLanding;
