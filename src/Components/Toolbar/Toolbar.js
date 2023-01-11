import React, { useState } from "react";
import Popup from "./Popup";
import Replace from "./Replace";
import "./Toolbar.css";
import Translator from "./Translator";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import SearchIcon from "@material-ui/icons/Search";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatUnderLined from "@material-ui/icons/FormatUnderlined";
import FormatItalic from "@material-ui/icons/FormatItalic";
import OpenInNew from "@material-ui/icons/OpenInNew";
//import EditIcon from "@material-ui/icons/Edit";
import FindReplaceIcon from "@material-ui/icons//FindReplace";
import TranslateIcon from "@material-ui/icons/Translate";
import "bootstrap/dist/css/bootstrap.min.css";
import { memo } from "react";

const Toolbar = ({
  assId,
  editor,
  fSize,
  setFontSize,
  editorOn,
  editorOff,
  passedId,
  onChangeSearch,
  searchNo
}) => {
  const [translatorpopup, setTranslatorPopup] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [hyperlink, setHyperlink] = useState(false);
  const [superscript, setSuperscript] = useState(false);
  const [subscript, setSubscript] = useState(false);
  const [undo, setUndo] = useState(false);
  const [redo, setRedo] = useState(false);
  const [link, setLink] = useState(false);
  const [unlink, setUnlink] = useState(false);

  const [findOpen, setFindOpen] = useState(false);
  const [replaceOpen, setReplaceOpen] = useState(false);

  const handleFind = () => {
    setFindOpen(true);
  };

  const handleReplace = () => {
    setReplaceOpen(true);
  };


  // const getInnerHtml = (id) => {
  //   const editorContent = document.getElementById(`${id}`);
  //   console.log(editorContent.innerHTML)
  //   return editorContent.innerHTML;
  // };

  // const addContentTo = (content, id) => {
  //   console.log(content)
  //   const targetDiv = document.getElementById(`${id}`);
  //   //targetDiv.innerHTML = "";
  //   targetDiv.innerHTML = content;
  //   console.log(targetDiv);
  // };

  const styleCasing = (value) => {
    if (window.getSelection().toString().length > 0) {
      if (value === "upperCase") {
        var selectedText = window.getSelection().toString().toUpperCase();
        replaceSelectedText(selectedText);
        console.log(selectedText);
      }

      if (value === "lowerCase") {
        selectedText = window.getSelection().toString().toLowerCase();
        replaceSelectedText(selectedText);
        console.log(selectedText);
      }


    }
  }



  function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
      sel = window.getSelection();

      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(replacementText));
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      range.text = replacementText;
    }
  }

  const styling = (func) => {

    if (func === "hyperlink") {
      var url = prompt('Enter a URL:', 'http://');;
      document.execCommand('createLink', true, url);
      // const content = getInnerHtml(passedId);
      //   addContentTo(content,passedId);
    }
    else {

      document.execCommand(func, false, null);
      // const content = getInnerHtml(passedId);
      // addContentTo(content, passedId);

    }


  };

  const tagging = (val) => {
    if (val === "one") {

      document.execCommand('styleWithCSS', true, true);
      document.execCommand('foreColor', true, "red");
      // const content = getInnerHtml(passedId);
      // addContentTo(content, passedId);

    }

  }



  return (
    <div className="ToolBar-Container">

      <div>
        {" "}
        <div className={editor ? "preview" : "preview-display"}>
          <strong>Preview</strong>
        </div>
        <div className={editor ? "edit-display" : "edit"}>
          <strong>Edit</strong>
        </div>
      </div>

      <div className={editor ? "Tool_Mid-clicked" : "Tool__Mid"}>

        <div className="zoom__Counter">
          <div>
            <button
              className="toolbar-button"
              onClick={() => setFontSize(fSize - 5)}
              id="Remove-button"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          <div>
            {" "}
            <input type="text" id="percentage" readOnly value={fSize + "%"} />
          </div>
          <div>
            {" "}
            <button
              className="toolbar-button"
              onClick={() => setFontSize(fSize + 5)}
              id="Add-button"
            >
             <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="Translator__Counter">
          <div>
            {" "}
            <button
              onClick={() => setTranslatorPopup(true)}
              className={
                !translatorpopup
                  ? "toolbar-button button-color"
                  : "toolbar-button button-highlight-color"
              }
              id="Translate-button"
            >
              <TranslateIcon />
            </button>
            <Translator
              assId={assId}
              trigger={translatorpopup}
              setTrigger={setTranslatorPopup}
            ></Translator>
          </div>

          <div>
            {" "}
            <input type="text" id="Translate-percent" readOnly value="90%" />
          </div>
        </div>

        <div className="find-replace-body">
          <button
            onClick={handleFind}
            className={
              !findOpen
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            id="Find-button"
          >
            <SearchIcon />
          </button>

          <button
            onClick={handleReplace}
            className={
              !replaceOpen
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            id="Replace-button"
          >
            <FindReplaceIcon id="toolbar-color" />
          </button>

          <Popup
            assId={assId}
            onChangeSearch={onChangeSearch}
            open={findOpen}
            setFindOpen={setFindOpen}
            setReplaceOpen={setReplaceOpen}
            searchNo={searchNo}
          />
          <Replace
            assId={assId}
            open={replaceOpen}
            setFindOpen={setFindOpen}
            setReplaceOpen={setReplaceOpen}
          />
        </div>

        <div className="Tag__Counter">
          <div>
            {" "}
            <button className="toolbar-button" id="Tag-button">
              Tags
            </button>
          </div>
          <div>
            {" "}
            <button
              className="toolbar-button"
              type="button"
              id="Tag-button-dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <select
                name="documents"
                id="select"
                onChange={(e) => tagging(e.target.value)}
              >
                <option value="zero">0</option>
                <option value="one">1</option>
                <option value="two">2</option>
                <option value="three">3</option>
              </select>
            </button>
          </div>
        </div>

        <div className="link-unlink-body">
          <button
            onClick={() => setLink(!link)}
            className={
              !link
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            id="Link-button"
          >
            <i className="fa-solid fa-link"></i>
          </button>
          <button
            onClick={() => setUnlink(!unlink)}
            className={
              !unlink
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            id="Unlink-button"
          >
            <i className="fa-solid fa-link-slash"></i>
          </button>

        </div>

        <div className="bold-italic-body">
          <button
            value="bold"
            className={
              !bold
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling("bold"), setBold(!bold)]}
            id="Bold-button"
          >
            <FormatBold />
          </button>
          <button
            className={
              !italic
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling("italic"), setItalic(!italic)]}
            id="Italic-button"
          >
            <FormatItalic />
          </button>
          <button
            className={
              !underline
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling("underline"), setUnderline(!underline)]}
            id="Underline-button"
          >
            <FormatUnderLined />
          </button>

        </div>


        <div>
          <button
            className={
              !hyperlink
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling("hyperlink"), setHyperlink(!hyperlink)]}
            id="OpenNew-button"
          >
            <OpenInNew />
          </button>
        </div>
        <div>
          <button
            className={
              !superscript
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling('superscript'), setSuperscript(!superscript)]}
            id="Super-button"
          >
            <i className="fa-solid fa-superscript"></i>
          </button>
          <button
            className={
              !subscript
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling('subscript'), setSubscript(!subscript)]}
            id="Sub-button"
          >
            <i className="fa-solid fa-subscript"></i>
          </button>

        </div>

        <div>
          <button
            className={
              !undo
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling("undo"), setUndo(!undo)]}
            id="Undo-button"
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <button
            className={
              !redo
                ? "toolbar-button button-color"
                : "toolbar-button button-highlight-color"
            }
            onClick={() => [styling("redo"), setRedo(!redo)]}
            id="Redo-button"
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>

        </div>

        <div>

          <button className="sentence-button">
            <select id="dropdown" onChange={(e) => styleCasing(e.target.value)}>
              <option value="NA">Sentence Case</option>
              <option value="upperCase">UpperCase</option>
              <option value="lowerCase">LowerCase</option>
            </select>
          </button>

        </div>
      </div>

      <div className="previw-body">


        <button className={editor ? "Eye-clicked" : "Eye"} onClick={editorOn}>
          <RemoveRedEyeIcon />
        </button>




        <button className={editor ? "eyeEdit-clicked" : "eyeEdit"} onClick={editorOff}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        {/*  */}



      </div>
    </div >
  );
};

export default memo(Toolbar);
