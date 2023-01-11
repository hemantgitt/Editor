import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ChatBubbleOutline, MessageOutlined } from "@material-ui/icons";
import Comments from './Comments'
import './InputTable.css';
import { memo } from "react";
import HtmlParser from "react-html-parser";



const InputTable = ({
  fSize,
  sentence,
  onRowClick,
  passId,
  searchOn,
  editable,
  spellingId, saveCellData }) => {

  const [commentpopup, setCommentPopup] = useState(false);
  const [sentenceData, setSentenceData] = useState([]);
  useEffect(() => {
    setSentenceData(sentence);

  }, [sentence])

  return (

    <div className="tab-main" >

      <Table id="edtbl" bordered size="sm-2" >
        <thead className="thead">
          <tr className="tr1">
            <td style={{ fontSize: `${fSize}px` }}>Source Language</td>
            <td id="mergeRows" style={{ fontSize: `${fSize}px` }}>Target Language</td>
            <td className="width1">
              <span className="" onClick={() => setCommentPopup(true)}>
                <ChatBubbleOutline className="chat"></ChatBubbleOutline>
              </span>
              <Comments trigger={commentpopup} setTrigger={setCommentPopup}></Comments>
            </td>
          </tr>
        </thead>

        <tbody  >

          {sentenceData.map((sen, index) => (
            <tr key={index} id="editorRow"
              onClick={() => onRowClick(sen.suggestion, sen.sentence_id)}>
              <td
                id={sen.sentence_id + "SRC"}
                className="inner-int"
                contentEditable="false"
                suppressContentEditableWarning={true}
                width="50%"
                style={{
                  fontSize: `${fSize}px`,
                }}
              >
                {sen?.source_language}

              </td>
              <td

                id={sen.sentence_id}
                className="inputbox"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onFocus={() => passId(sen.sentence_id)}
                style={{
                  fontSize: `${fSize}px`,
                }}
              >


                <div>
                  {HtmlParser(sen?.target_language)}
                </div>



              </td>
              <td>
                <MessageOutlined />
              </td>
            </tr>
          ))}

        </tbody>
      </Table>

    </div>

  );
};

export default memo(InputTable);
