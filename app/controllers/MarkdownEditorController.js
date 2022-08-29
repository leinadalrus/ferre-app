const marked = require("marked");
import ModelController from "./ModelController";

class MarkdownEditorController extends ModelController {
  constructor() {
    super();
    const markdownEditorOps = {
      src: "/public/documents",
      type: "file/md"
    };
  }
};

export default MarkdownEditorController;