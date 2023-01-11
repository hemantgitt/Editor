import React from "react";
import ForumIcon from "@material-ui/icons/Forum";
import "../../../Style/css/all.css";
import "./Right-Nav.css";
import { memo } from "react";

const RightNav = ({
  sidebar1,
  sidebar2,
  sidebar3,
  sidebar4,
  sidebar5,
  toggleSidebar1,
  toggleSidebar2,
  toggleSidebar3,
  toggleSidebar4,
  toggleSidebar5,
}) => {
  return (
    <React.Fragment>
      <div className="right">
        <div className="right-cn">
          <div
            className={sidebar1 ? "nav-item2-clicked " : "nav-item2"}
            id="info"
          >
            <button
              className={
                sidebar1 ? " modified-button-clicked" : " modified-button"
              }
              onClick={toggleSidebar1}
            >
              <img alt=""
                className="image_size"
                src={
                  sidebar1 ? "/Images/info-light.svg" : "/Images/info-dark.svg"
                }
              />
            </button>
          </div>
          <div
            className={sidebar3 ? "nav-item2-clicked " : "nav-item2"}
            id="translation"
          >
            <button
              className={
                sidebar3 ? "modified-button-clicked " : "modified-button"
              }
              onClick={toggleSidebar3}
            >
              <img
              alt=""
                className="image_size"
                src={
                  sidebar3
                    ? "/Images/translate-light.svg"
                    : "/Images/translate.svg"
                }
              />
            </button>
          </div>

          <div
            className={sidebar4 ? "nav-item2-clicked " : "nav-item2"}
            id="collection"
          >
            <button
              className={
                sidebar4 ? "modified-button-clicked  " : "modified-button"
              }
              onClick={toggleSidebar4}
            >
              <img
              alt=""
                className="image_size"
                src={
                  sidebar4
                    ? "/Images/bookmark-light.svg"
                    : "/Images/bookmark.svg"
                }
              />
            </button>
          </div>
          <div
            className={sidebar2 ? "nav-item2-clicked " : "nav-item2"}
            id="spellchk"
          >
            <button
              className={
                sidebar2 ? "modified-button-clicked" : "modified-button"
              }
              onClick={toggleSidebar2}
            >
              <img
              alt=""
                className="image_size"
                src={
                  sidebar2
                    ? "/Images/spell-check-light.svg"
                    : "/Images/spellcheck.svg"
                }
              />
            </button>
          </div>
          <div
            className={sidebar5 ? "nav-item2-clicked " : "nav-item2"}
            id="forum"
          >
            <button
              className={sidebar5 ? "not-clicked " : "clicked modified-button"}
              onClick={toggleSidebar5}
            >
              <ForumIcon />
            </button>
          </div>
        </div>

        <div className="right-cn1">
          <div className="nav-item3">
            
            <div className="facebook">
            <i class="fa-brands fa-facebook-f  fa-2x"></i>
            </div>

            <div id="linkedin">
            <i class="fa-brands fa-linkedin-in fa-2x"></i>
            </div>
            <div id="insta">
            <i class="fa-brands fa-instagram fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(RightNav);
