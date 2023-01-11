import React, { useState, useEffect } from "react";
import "../../../Style/css/all.css";
import "./Spelling.css";
import "../../DefaultView/DefaultView.css";
import "../FileInformation/FileInformation.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import {
  SpellingGrammar,
  Inconsistency,
  Untranslated,
} from "../../../Services/AuthService";
import { memo } from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const Spelling = ({ assId, sidebar2, senIdFromSpelling, senFromSpelling }) => {
  const [diagnostic, setDiagnostic] = useState([]);
  const [inconsistency, setInconsistency] = useState([]);
  const [untranslated, setUntranslated] = useState([]);
  const [sentenceID, setSentenceID] = useState(0);

  useEffect(() => {
    SpellingGrammar(assId).then((response) => {
      setDiagnostic(response.data);
      console.log("spelling and grammar", response.data);
    });
    Inconsistency(assId).then((response) => {
      setInconsistency(response.data);
      console.log("inconsistency", response.data);
    });
    Untranslated(assId).then((response) => {
      setUntranslated(response.data);
      console.log("Untranslated", response.data);
    });
  }, [assId]);

  const ignoreSpelling = (idB, idD) => {
    console.log(idB);
    console.log(idD);
    document.getElementById(idB).style.color = "gray";
    document.getElementById(idD).style.color = "gray";
    document.getElementById(idB).style.pointerEvents = "none";
    document.getElementById(idD).style.pointerEvents = "none";
    document.getElementById(sentenceID).style.background = "none";
  };

  return (
    <>
      <div
        id="accordionExample"
        className={
          sidebar2
            ? "Spelling-Container accordion"
            : "Spelling-Container sidebar accordion"
        }
      >
        <div className="accordion-item">
          <h2
            id="headingOne"
            className={
              sidebar2
                ? "Spelling-inner-Container "
                : "Spelling-inner-Container sidebar "
            }
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <span id="Spelling-Heading">Spelling and Grammar</span>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse Untranslated-Scroll"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            {diagnostic.length === 0 ? (
              <div className="Spelling-inner-body accordion-body">
                <p id="Spelling-ID"> No Results Found</p>
              </div>
            ) : (
              diagnostic.map((diag, index) => (
                <div key={index} className="display">
                  <div
                    id={index + "D"}
                    onClick={() => [
                      senIdFromSpelling(diag.sentence_id),
                      setSentenceID(diag.sentence_id),
                    ]}
                    onDoubleClick={() =>
                      senFromSpelling(
                        diag.original_sentence.trimEnd(),
                        diag.recommended_sentence,
                        diag.sentence_id
                      )
                    }
                    className="Spelling-inner-body accordion-body"
                  >
                    <span className="Spelling-ID">
                      <span id="ori-sen">{diag.original_sentence}</span>
                      <span id="arrow-target">
                        <ArrowRightAltIcon />
                      </span>
                      <span id="recom">{diag.recommended_sentence}</span>
                    </span>
                  </div>
                  <button
                    id={index + "B"}
                    onClick={() => ignoreSpelling(index + "B", index + "D")}
                    className="log"
                  >
                    <NotInterestedIcon />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="accordion-item">
          <h2
            id="headingTwo"
            className={sidebar2 ? "Untranslated" : "Untranslated sidebar"}
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <span id="Untranslated-Heading">Untranslated</span>
            </button>
          </h2>

          <div
            id="collapseTwo"
            className="accordion-collapse collapse Untranslated-Scroll"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            {untranslated.length === 0 ? (
              <div className="Untranslated-accordion accordion-body">
                <p id="untranslate_body"> No Results Found</p>
              </div>
            ) : (
              untranslated.map((untrans, index) => (
                <div key={index} className="display">
                  <div
                    id={index + "A"}
                    onClick={() => [
                      senIdFromSpelling(untrans.sentence_id),
                      setSentenceID(untrans.sentence_id),
                    ]}
                    key={index}
                    className="Untranslated-accordion accordion-body"
                  >
                    <p id="untranslate_body"> {untrans.source_text}.....</p>
                  </div>

                  <button
                    id={index + "C"}
                    onClick={() => ignoreSpelling(index + "A", index + "C")}
                    className="log"
                  >
                    <NotInterestedIcon />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="accordion-item">
          <div
            id="headingThree"
            className={sidebar2 ? "Inconsistency" : "Inconsistency sidebar"}
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <span id="Inconsistency-Heading"> Inconsistency</span>
            </button>
          </div>
          <div
            id="collapseThree"
            className="accordion-collapse collapse Inconsistency-Scroll"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            {inconsistency.length === 0 ? (
              <div className="Untranslated-accordion accordion-body">
                <p id="untranslate_body"> No Results Found</p>
              </div>
            ) : (
              inconsistency.map((inconst, index) => (
                <div key={index}>
                  <div id={index + "G"} className="inconsistant">
                    <div id={index + "G"} className="incon_1">
                      <div className="in__1">{inconst.original_sentence}</div>
                      <div className="incon__2">
                        {inconst.recommended_sentence.length} Translations
                      </div>

                      <button
                        id={index + "F"}
                        onClick={() => ignoreSpelling(index + "G", index + "F")}
                        className="log"
                      >
                        <NotInterestedIcon />
                      </button>
                    </div>
                    {inconst.recommended_sentence.map((recom, index) => (
                      <div key={index} className="display">
                        <div
                          onClick={() => [
                            senIdFromSpelling(recom.sentence_id),
                            setSentenceID(recom.sentence_id),
                          ]}
                          className="incon_2"
                        >
                          <div className="inconn__1">
                            <p className="inconsistency-design">
                              {recom.recommended_sentence}
                            </p>
                          </div>
                        </div>
                        <button
                          style={{ border: "none" }}
                          onClick={() =>
                            senFromSpelling(
                              inconst.original_sentence.trimEnd(),
                              recom.recommended_sentence,
                              recom.sentence_id
                            )
                          }
                          className="inconn__2"
                        >
                          <p id="inconn__2">Use</p>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="accordion-item">
          <h2
            id="headingFour"
            className={sidebar2 ? "Unresolved" : "Unresolved sidebar"}
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <span id="Unresolved-heading">Unresolved Comments</span>
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="Unresolved__display">
              <div className="Unresolved__Comments">
                Lorem Ipsum Lorem Ipsum
              </div>
              <div className="Unresolved__ignore">
                {" "}
                <NotInterestedIcon />
              </div>
            </div>
            <div className="Unresolved__display">
              <div className="Unresolved__Comments">
                Lorem Ipsum Lorem Ipsum
              </div>
              <div className="Unresolved__ignore">
                {" "}
                <NotInterestedIcon />
              </div>
            </div>
            <div className="Unresolved__display">
              <div className="Unresolved__Comments">
                Lorem Ipsum Lorem Ipsum
              </div>
              <div className="Unresolved__ignore">
                {" "}
                <NotInterestedIcon />
              </div>
            </div>
            <div className="Unresolved__display">
              <div className="Unresolved__Comments">
                Lorem Ipsum Lorem Ipsum
              </div>
              <div className="Unresolved__ignore">
                {" "}
                <NotInterestedIcon />
              </div>
            </div>
            <div className="Unresolved__display">
              <div className="Unresolved__Comments">
                Lorem Ipsum Lorem Ipsum
              </div>
              <div className="Unresolved__ignore">
                {" "}
                <NotInterestedIcon />
              </div>
            </div>
            <div className="Unresolved__display">
              <div className="Unresolved__Comments">
                Lorem Ipsum Lorem Ipsum
              </div>
              <div className="Unresolved__ignore">
                {" "}
                <NotInterestedIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Spelling);
