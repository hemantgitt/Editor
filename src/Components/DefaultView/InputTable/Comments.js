/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Comments.css";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SendIcon from "@material-ui/icons/Send";
import Draggable from "react-draggable";

const Comments = (props) => {
  return props.trigger ? (
    <Draggable>
      <div className="comments">
        <div className="comments-inner">
          <div className="cmt1">
            <div id="comment-head">
              {" "}
              <button
                id="Modal-Close"
                onClick={() => props.setTrigger(false)}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              Comments
            </div>

            <div className="Top__Comment__Section">
              <div className="Sub__Comments">
                 <div id="ignore-all">Ignore All</div>
              <div  id="notIntrested__logo"><NotInterestedIcon /></div>
              </div>
              <div className="Sub__Comments">
                <div id="resolve-all"> <label htmlFor="">Resolve All</label></div>
              <div id="check-box"> <input type="checkbox"/></div>
              </div>

             
              

            </div>
          </div>

          <div className="comments-scroller">
            <div className="cmt2">
              <div className="inner-cmt">
                <div id="cmt21">Ahmad QA</div>
                <div id="cmt22"> 19:14, 12 Sep 21 </div>
                <div id="Delete__Comment">
                  <i className="fa-solid fa-trash-can "></i>
                </div>
              </div>
              <div id="cmt23">
                lorem lorem lorem ipsum dolor sit amet lorem ipsum dolor sit
                amet
              </div>
            </div>

            <div className="cmt3">
              <div className="inner-cmt">
                <div id="Comment__1">Ahmad QA</div>
                <div id="Comment__2">19:14, 12 Sept 21</div>
                <div id="Check_Box_Comment">
                  <CheckBoxIcon />
                </div>
              </div>

              <div className="inner-in-cmt">
                <div id="Comment__3">
                  lorem ipsum dolor sit amet lorem ipsum dolor sit amet
                </div>

                <div id="Comment__4">
                  <NotInterestedIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="Comment__box">

          <input placeholder="Type Here..." className="Input__field" />
          <a className="btn_commonn" ><SendIcon/></a>

        </div>

          {props.children}
        </div>
      </div>
    </Draggable>
  ) : (
    ""
  );
};

export default Comments;
