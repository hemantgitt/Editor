import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AssessmentIcon from "@material-ui/icons/Assessment";
import moment from "moment";
import { Date } from "./Date.js";
import "./Footer.css";
import { useCallback } from "react";
import { memo } from "react";
import axios from "axios";
import { Progress_Bar } from "../../Services/AuthService";


const Footer = ({
  assId,
  sidebar1,
  sidebar2,
  sidebar3,
  sidebar4,
  sidebar5,
}) => {
  const [stats, setStats] = useState(false);
  //const [progressAPI, setProgressAPI] = useState([])

  const toggleStats = useCallback(() => {
    setStats(!stats);
    console.log(stats);
  });

  const [progTotalWords, setProgTotalWords] = useState(0);
  const [progSubmitWords, setProgSubmitWords] = useState(0);
  const [progTransWords, setProgTransWords] = useState(0);
  const [progSubmitWordsPer, setProgSubmitWordsPer] = useState(0);
  const [progTransWordsPer, setProgTransWordsPer] = useState(0);
  const [progTime, setProgTime] = useState("");
  const [progTimeDisplayTotal, setProgTimeDisplayTotal] = useState("");
  const [progTimeDisplayRem, setProgTimeDisplayRem] = useState("");

  useEffect(() => {
    Progress_Bar(assId).then((response) => {
      getValue(response.data);
      console.log("Progress Stats", response.data);
    });
  }, []);

  const getValue = (progressAPI) => {
    progressAPI.map((val) => {
      var totalWords = val.words_allocated;
      var submitWords = val.submitted_words;
      var translateWords = val.translated_words;

      setProgSubmitWords(submitWords);
      setProgTransWords(translateWords);
      setProgTotalWords(totalWords);

      var submitWordPer = 100 - ((totalWords - submitWords) / totalWords) * 100;
      var translateWordPer =
        100 - ((totalWords - translateWords) / totalWords) * 100;

      setProgSubmitWordsPer(submitWordPer);
      setProgTransWordsPer(translateWordPer);

      var finalDate = moment(val.resource_deadline, "DD-MM-YYYY HH:mm:ss").diff(
        moment(val.resource_start_time, "DD-MM-YYYY HH:mm:ss")
      );
      var totalDif = moment.duration(finalDate);
      var totalDifMin = totalDif.asMinutes();
      setProgTimeDisplayTotal(
        Math.floor(totalDif.asHours()) +
          " Hours " +
          moment.utc(finalDate).format("mm") +
          " minutes"
      );

      var currentDate = moment(
        val.resource_deadline,
        "DD-MM-YYYY HH:mm:ss"
      ).diff(moment());
      var curentDiff = moment.duration(currentDate);
      var currentDiffMin = curentDiff.asMinutes();
      var currentDiffPer = parseInt(
        ((totalDifMin - currentDiffMin) / totalDifMin) * 100
      );

      while (currentDiffPer <= 100) {
        setProgTime(currentDiffPer);
      }
      setProgTime(100);
      setProgTimeDisplayRem(
        Math.floor(curentDiff.asHours()) +
          " Hours " +
          moment.utc(currentDate).format("mm") +
          " minutes"
      );
    });
  };

  return (
    <>
      {!stats ? (
        <div
          className={
            sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5
              ? "Footer-Container-clicked"
              : "Footer-Container"
          }
        >
          <>
            <div className="nav nav-pills nav-fill submitt">
              <div className="Left">
                <div className="inner-left">
                  <div id="Submit-Progress">
                    Submitted &nbsp; {parseInt(progSubmitWordsPer)}%
                  </div>

                  <div id="Translat-Progress">
                    {" "}
                    Translated &nbsp; {parseInt(progTransWordsPer)}%
                  </div>
                </div>

                <div id="TimeRemaing-progress">
                  Time remaining &nbsp; {progTimeDisplayRem}
                </div>
              </div>

              <div className="center">
                <ProgressBar
                  backgroundColor="lightgrey"
                  visualParts={[
                    {
                      percentage: `${progSubmitWordsPer}%`,
                      color: "deepskyblue",
                    },
                    {
                      percentage: `${progTransWordsPer}%`,
                      color: "skyblue",
                    },
                  ]}
                  sidebar1={sidebar1}
                  sidebar2={sidebar2}
                  sidebar3={sidebar3}
                  sidebar4={sidebar4}
                  sidebar5={sidebar5}
                />

                <Date
                  done={progTime}
                  sidebar1={sidebar1}
                  sidebar2={sidebar2}
                  sidebar3={sidebar3}
                  sidebar4={sidebar4}
                  sidebar5={sidebar5}
                />
              </div>

              <button onClick={toggleStats} className="Right">
                <AssessmentIcon />
              </button>
            </div>
          </>
        </div>
      ) : (
        <div
          className={
            sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5
              ? "Footer-Container-stats-clicked"
              : "Footer-Container-stats"
          }
        >
          <>
            <div className="Statstics-Display">

              <div className="count">

                <div className="sub-Count">
                  <div id="Total">Total Count</div>
                  <div id="Total__1">Total Time </div>
                
                </div>

                <div className="sub-Count_1">

                <div id="Total__Count">{progTotalWords} words</div>
                  <div id="Total__Time">{progTimeDisplayTotal}</div>
                </div>
              </div>

              <div className="count1">

                <div className="sub-Count2">
                  <div id="Trans__1">Translated</div>
                  
                  <div id="Speed__2">Speed</div>
                </div>

                <div className="sub-Count2__">
                <div id="Translate__1">{progTransWords} words</div>
                  <div id="Speed__1">4%</div>
                </div>
              </div>

              <div className="count2">

                <div className="sub-Count_3">
                  <div id="Submitted__2">Submitted</div>
                  
                  <div id="Time__Remaining_1">Time Remaining</div>
                </div>

              <div className="sub-Count3">

              <div id="Submitted__1">{progSubmitWords} words</div>
                  <div id="Time__Rem">{progTimeDisplayRem}</div>
                  
                </div>
              </div>
              <div>
                <button onClick={toggleStats} className="bar-icons">
                  <AssessmentIcon />
                </button>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default memo(Footer);
