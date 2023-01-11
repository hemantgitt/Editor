import React, { useState, useCallback } from "react";
import "./Popup.css";
import FindReplaceIcon from "@material-ui/icons//FindReplace";
import "../../Style/css/all.css";
import SearchIcon from "@material-ui/icons//Search";
import { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "@mui/material";

const Popup = ({
  open,
  setFindOpen,
  onChangeSearch,
  setReplaceOpen,
  searchNo,
}) => {
  const switchFind = () => {
    setReplaceOpen(true);
    setFindOpen(false);
  };
  var [search, setSearch] = useState("");
  var [searchCount, setSearchCount] = useState(0);

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const prevSearch = useCallback(() => {
    if (searchCount >= 0) {
      searchCount = search - 1;
      setSearchCount(search);
      searchNo(searchCount);
      console.log(searchCount);
    }
  }, [searchCount]);
  const nextSearch = useCallback(() => {
    searchCount = searchCount + 1;
    setSearchCount(searchCount);
    searchNo(searchCount);
    console.log(searchCount);
  }, [searchCount]);

  return (
    <Modal hideBackdrop={true} open={open}>
      <div className="Find-Modal-Container">
        <div className="Modal-Container-TopSection">
          <div className="Find-Header" id="simple-dialog-title">
            <button onClick={() => setFindOpen(false)} id="Modal-Close">
              <i className="fa-solid fa-angle-left"></i>
            </button>
            Find
          </div>

          <div>
            <button
              onClick={() => onChangeSearch(search)}
              id="Find-Modal-Switch"
            >
              <SearchIcon />
            </button>
            <button onClick={switchFind} id="Replace-Modal-Switch">
              <FindReplaceIcon />
            </button>
          </div>
        </div>

        <div className="Modal-Container-secondSection">
          <div className="Inner-box">
            <div className="Find-Th-heading">Find through</div>

            <div>
              <button
                type="button"
                id="Document-expand"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <select name="documents" id="Find-Document">
                  <option value="doc">Entire Document</option>
                  <option value="page">This Page</option>
                  <option value="part">Your Part</option>
                </select>
              </button>
            </div>
          </div>
          <div className="Inner-box">
            <div className="Target-Text-search">Look for</div>

            <div>
              <button
                type="button"
                id="Target-document"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <select name="documents" id="traget-text">
                  <option value="doc">Target Text</option>
                  <option value="page">Source Text</option>
                </select>
              </button>
            </div>
          </div>
        </div>

        <div className="Modal-Container-thirdSection">
          <div className="Find-wh-heading">Find What</div>
          <div>
            {" "}
            <input
              onChange={(e) => onChange(e)}
              className="Input-section"
              type="text"
              placeholder="Lorem"
            />
          </div>
        </div>

        <div className="Modal-Container-Pagination_Section">
          <button onClick={prevSearch} className="Previous-Find">
            <i className="fa-solid fa-angle-left"></i> Previous
          </button>
          <li className="Change-page">21 of 60</li>
          <button onClick={nextSearch} className="Next-Find">
            Next <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(Popup);
