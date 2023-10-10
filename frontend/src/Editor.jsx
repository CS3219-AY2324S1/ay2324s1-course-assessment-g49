const Editor = {
    modules: {
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "blockquote", "code"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["image"],      ],
    //   clipboard: {
    //     // toggle to add extra line breaks when pasting HTML:
    //     matchVisual: false,
    //   },
    },

    formats: [
      "header",
      "size",
      "bold",
      "italic",
      "underline",
      "blockquote",
      "code",
      "list",
      "bullet",
      "indent",
      "image",
    ],
  };
  
  export default Editor;
  