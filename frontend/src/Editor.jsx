const Editor = {
    modules: {
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "code", "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["image"],      ],
    },

    formats: [
      "header",
      "size",
      "bold",
      "italic",
      "underline",
      "code",
      "blockquote",
      "code-block",
      "list",
      "bullet",
      "indent",
      "image",
    ],
  };
  
  export default Editor;
  