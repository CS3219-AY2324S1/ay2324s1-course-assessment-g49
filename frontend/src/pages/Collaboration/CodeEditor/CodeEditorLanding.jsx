import { useState, createContext, useEffect, useContext } from "react";
import CollabCodeEditor from "./CollabCodeEditor";
import axios from "axios";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguageDropdown";
import { Grid, Button } from "@mui/material";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { LanguageContext } from "../../../utils/LanguageContextUtil";
import { CodeContext } from "../../../utils/CodeContextUtil";
import AuthenticationToken from "../../../services/AuthenticationToken";

export const YjsContext = createContext(null);

function CodeEditorLanding({ roomName, questionId }) {
  const databaseURL = import.meta.env.VITE_DATABASE_URL;
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { language, handleChangeLanguage } = useContext(LanguageContext);
  const { code, handleChangeCode } = useContext(CodeContext);

  const [provider, setProvider] = useState(null);
  const [doc, setDoc] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.userId;

  useEffect(() => {
    const doc = new Y.Doc();
    const text = doc.getText("monaco");
    const customInputText = doc.getText("customInput");
    customInputText.observe((event) => {
      setCustomInput(customInputText.toString());
    });
    handleChangeCode(text.toString());

    const newProvider = new WebrtcProvider(roomName, doc, {
      signaling: ["wss://wss-dot-peerprep-399116.as.r.appspot.com"],
    });

    newProvider.awareness.setLocalStateField("name", userId);
    newProvider.awareness.setLocalStateField("selectedLanguage", language);

    setProvider(newProvider);
    setDoc(doc);

    return () => {
      newProvider.destroy();
    };
  }, []);

  const handleCustomInputChange = (newCustomInput) => {
    const customInputText = doc.getText("customInput");
    customInputText.delete(0, customInputText.length);
    customInputText.insert(0, newCustomInput);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        handleChangeCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    setProcessing(true);
    const epochTimestamp = new Date().getTime();
    const newAttempt = {
      userId,
      sessionId: roomName,
      questionId,
      epochTimestamp,
    };
    await axios.post(`${databaseURL}/attempt`, newAttempt, {
      headers: AuthenticationToken(),
    });
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
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!provider) {
      return;
    }

    const handleLanguageUpdate = ({ added, updated, removed }) => {
      const localClientID = provider.awareness.clientID;

      updated.forEach((clientID) => {
        if (clientID !== localClientID) {
          const clientState = provider.awareness.getStates().get(clientID);
          const localState = provider.awareness.getStates().get(localClientID);
          const clientLangObject = JSON.stringify(
            clientState?.selectedLanguage
          );
          const localLangObject = JSON.stringify(localState?.selectedLanguage);

          if (clientLangObject !== localLangObject) {
            handleChangeLanguage(clientState.selectedLanguage);

            provider.awareness.setLocalStateField(
              "selectedLanguage",
              clientState.selectedLanguage
            );
          }
        }
      });
    };
    provider?.awareness.on("change", handleLanguageUpdate);

    return () => {
      provider?.awareness.off("change", handleLanguageUpdate);
    };
  }, [provider, language, handleChangeLanguage]);

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
            <LanguagesDropdown disabled={processing} />
          </Grid>
          <Grid item>
            <Button
              onClick={handleCompile}
              disabled={!code}
              variant="contained"
            >
              {processing ? "Processing..." : "Execute"}
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
        <Grid
          container
          item
          justifyContent="space-between"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <CustomInput
              customInput={customInput}
              setCustomInput={handleCustomInputChange}
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
