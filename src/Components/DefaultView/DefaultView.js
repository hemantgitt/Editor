import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "../../Style/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './DefaultView.css';
import { useParams } from 'react-router';
import { Progress_Bar } from '../../Services/AuthService';
import AuthHeader from "../../Services/AuthHeader";
import InputTable from "./InputTable/InputTable";
import Toolbar from "../Toolbar/Toolbar"
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import RightNav from '../Sidebar/Right-Nav/RightNav'
import TopNavBar from "../TopNavBar/TopNavBar";
import LeftNav from "../LeftNav/LeftNav";

import { useCallback } from "react";
import { Save } from "@material-ui/icons";



const DefaultView = () => {

    const [sentence, setSentence] = useState([]);
    const [rowSuggestion, setRowSuggestion] = useState([]);
    const [sentenceId, setSentenceId] = useState(0);
    const [sentenceIdFromSuggest, setSentenceIdFromSuggest] = useState(0);
    const [fSize, setFSize] = useState(20);
    const [sidebar2, setsidebar2] = useState(false);
    const [sidebar1, setsidebar1] = useState(false);
    const [sidebar3, setsidebar3] = useState(false);
    const [sidebar4, setsidebar4] = useState(false);
    const [sidebar5, setsidebar5] = useState(false);
    const [progress, setProgress] = useState([]);
    const [findData, setFindData] = useState([])
    const [editor, setEditor] = useState(false);
    const [target, setTarget] = useState("");
    const [fill, setFill] = useState(false)
    const [click, setClick] = useState(false);
    var [page, setPage] = useState(1)
    const [primaryInfo, setPrimaryInfo] = useState({});
    const [searchOn, setSearchOn] = useState('');
    const [editorId, setEditorId] = useState('');
    const updatedData = { editor_id: "0", data: [] };
    const { assId, resId } = useParams();
    const [passedId, setPassedId] = useState(0);
    const [existing, setExisting] = useState("")
    const [spellingId, setSpellingID] = useState(0);
    var [totalCount, setTotalCount] = useState(0);
    const [ignoreClick, setIgnoreClick] = useState(false);
    const [stamp, setStamp] = useState('Last Saved At');
    const [editable, setEditable] = useState(true);
    const [savedEditor, setSavedEditor] = useState("")

    const API_URL = process.env.REACT_APP_API_URL



    // const url = `${API_URL}api/v1/file-preview/?assignment_id=${assId}`;

    const enterTarget = (targetData, sentIdFromSuggest) => {
        //setTarget(targetData);
        setSentenceIdFromSuggest(sentIdFromSuggest);
        document.getElementById(sentIdFromSuggest).innerText = targetData;
    }
    // const ServicesRef = useRef(null);

    const onChangeSearch = async (searchValue) => {
        const response = await axios.get(`${API_URL}api/v1/find-replace/find/?assignment_id=${assId}&find_text=${searchValue}&search_on=entire_document&source_status=true`, { headers: AuthHeader() })
        //setFindData(response.data.data)
        console.log(response.data.data)
        // setSearchOn(searchValue);
        // console.log("search", searchOn);
        // // setEditorId(response.data.data.editor_id);
        // console.log("Editor", editorId);
    }

    const searchNo = (valSearch) => {

        console.log(findData[valSearch].sentence_id)

        //document.getElementById(findData[valSearch].sentence_id+"SRC")?.scrollIntoView({ top: 0, behavior: 'smooth' });


    }



    const passId = (val) => {


        //console.log(document.getElementById(val).innerText);
        setPassedId(val);
        setExisting(document.getElementById(val).innerText);
    }


    const senIdFromSpelling = (valSpell) => {
        console.log(valSpell)
        setSpellingID(valSpell);


        document.getElementById(valSpell)?.scrollIntoView({ top: 0, behavior: 'smooth' });
        document.getElementById(valSpell).style.background = "skyblue"

        // document.getElementById(valSpell).style.background = "none";

    }
    const onIgnoreClick = (id) => {
        console.log(id);
        setIgnoreClick(true);

        // ignoreClick === true ?
        document.getElementById(id).style.color = "gray";
        document.getElementById(id).style.pointerEvents = "none ";
        document.getElementById(id).style.cursor = "not-allowed "
        document.getElementById(spellingId).style.background = "none";
        //    

    }


    const senFromSpelling = useCallback((recomSpell, senSpell, valSpell) => {

        console.log(senSpell);
        console.log(recomSpell.length);

        document.getElementById(valSpell).style.background = "none";

        var text = document.getElementById(valSpell).innerText
        document.getElementById(valSpell).innerText = text.replaceAll(recomSpell, senSpell);

        console.log(document.getElementById(valSpell).innerText);

    }, [])

    const prevPage = useCallback(() => {
        if (page > 1) {
            page = --page
            setPage(page);
            console.log(page)
        }


    }, [page])
    const nextPage = useCallback((lastVal) => {
        if (page < lastVal) {
            page = ++page
            setPage(page);
            console.log(page)
        }
    }, [page])

    const setFontSize = useCallback((fontSizing) => {
        setFSize(fontSizing);
        return false;
    }, [fSize])


    const initialState = {
        tardata: {
            editor_id: "",
            data: [
                {
                    sentence_id: "",
                    target_language: ""
                }
            ]
        }
    };

    const [tardata, setTarData] = useState([]);



    // const [updatedData, setUpdatedData] = useState(initialState.tardata);

    //For Single Sentence Update
    // const handleSingleSentenceChange = (e, senId) => {

    //     const updateTarData = {
    //         editor_id: "0",
    //         data: [
    //             {
    //                 sentence_id: senId,
    //                 target_language: e.target.value
    //             }
    //         ]
    //     }
    //     setTarData(updateTarData);
    //     console.log("data", tardata);
    // };




    // console.log("Re-render");

    console.log("Editor", editorId);

    console.log("Re-render");

    //         },
    //             error => {
    //                 //alert(error);
    //                 console.log(error);
    //             });
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post(`http://34.237.48.240:8004/api/v1/sentence-info/submit/${assId}/`, updatedData, { headers: AuthHeader() })
    //         .then((res) => {
    //             alert(res.data.message);

    //         },
    //             error => {
    //                 //alert(error);
    //                 console.log(error);
    //             });

    // }


    // const updatedSentence = sentence.map((sent) => {

    //   return {
    //     sentence_id: sent.sentence_id,
    //     target_language: "",
    //   };

    // });

    const offlineData = useCallback(() => {

        totalCount = 0;


        for (var j = 0; j < tardata.length; j++) {

            var str = JSON.stringify(tardata[j].target_language)

            var count = 0;
            for (var i = 0; i <= str.length; i++) {
                if ((str.charAt(i) === ' ') && (str.charAt(i + 1) !== ' ') && (i > 0)) {
                    count = count + 1;
                }
            }
            totalCount = totalCount + count;

        }
        //console.log(totalCount)


        if (navigator.onLine) {
            // console.log("Online inside")
            //console.log(JSON.parse(autoSaved));
            axios
                .post(
                    `${API_URL}api/v1/sentence-info/save/${assId}/`,
                    JSON.parse(localStorage.getItem("Offline Saved Data")),
                    { headers: AuthHeader() }
                )
                .then(
                    (res) => {
                        //alert(res.data.message);

                    },
                    (error) => {
                        console.log(error);
                    }
                );
            var currentdate = new Date();
            var datetime = "Last Saved at " + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ","
                + currentdate.getDate() + "/"
                + (currentdate.getMonth()) + "/"
                + currentdate.getFullYear()
            setStamp(datetime)
        }

    })


    // setInterval(() => {
    //     offlineData();
    // }, 2000);





    useEffect(() => {




        const results = sentence.filter(sent =>
            sent.source_language.toLowerCase().includes(searchOn)
        );
        setSentence(results);




        axios.get(`${API_URL}api/v1/primary-info/?assignment_id=${assId}`, { headers: AuthHeader() }).then(
            response => {
                setPrimaryInfo(response.data)
                console.log("Primary Info", primaryInfo);
            });


        axios.get(`${API_URL}api/v1/file-preview/s3-path?assignment_id=${assId}`, { headers: AuthHeader() }, { responseType: 'application/pdf' }).then((response) => {
            console.log("URLResponse", response.data)
            const file = response.data.file_url;
            const iframe = document.querySelector("iframe");
            if (iframe?.src) iframe.src = file;
        })
            .catch((error) => {
                console.log(error)
            });

        //Populate sentence into the editor table


        (navigator.onLine) ? axios.get(`${API_URL}api/v1/sentence-info/${assId}/?editor_id=${page}&role=None`, { headers: AuthHeader() }).then(
            response => {
                localStorage.setItem("Sentence Saved", JSON.stringify(response.data.data))
                setSentence(response.data.data)

                console.log("Sentence", response.data.data);
            }) : setSentence(JSON.parse(localStorage.getItem("Sentence Saved")))
    }

        , [page]);


    const saveCellData = (e) => {
        e.preventDefault();
        save();


    }
    const toggleSidebar1 = useCallback(() => {
        setsidebar1(!sidebar1)
        setsidebar2(false)
        setsidebar3(false)
        setsidebar4(false)
        setsidebar5(false)
    }, [sidebar1]
    );
    const toggleSidebar2 = useCallback(() => {
        setsidebar1(false)
        setsidebar2(!sidebar2)
        setsidebar3(false)
        setsidebar4(false)
        setsidebar5(false)
        return false;

    }, [sidebar2]);
    const toggleSidebar3 = useCallback(() => {
        setsidebar1(false)
        setsidebar2(false)
        setsidebar3(!sidebar3)
        setsidebar4(false)
        setsidebar5(false)
        return false;

    }, [sidebar3]);
    const toggleSidebar4 = useCallback(() => {
        setsidebar1(false)
        setsidebar2(false)
        setsidebar3(false)
        setsidebar4(!sidebar4)
        setsidebar5(false)
        return false;

    }, [sidebar4]);
    const toggleSidebar5 = useCallback(() => {
        setsidebar1(false)
        setsidebar2(false)
        setsidebar3(false)
        setsidebar4(false)
        setsidebar5(!sidebar5)
        return false;

    }, [sidebar5]);
    // const replaceOnClick = (e) => {
    //   searchOn.replace(searchOn, e.target.value);
    // }

    //pouplate suggestion on row click

    const onRowClick = (sug, sentId) => {

        setClick(!click);
        setRowSuggestion(sug);
        setSentenceId(sentId);
        return false;

    }
    const editorOn = useCallback(() => {
        setEditor(true)
    }, []);

    const editorOff = useCallback(() => {
        setEditor(false)
    }, []);

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const save = () => {
        if (navigator.onLine) {
            console.log("online")
            var currentdate = new Date();
            var datetime = "Last Saved at " + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ","
                + currentdate.getDate() + " "
                + month[(currentdate.getMonth())] + " "
                + currentdate.getFullYear()
            setStamp(datetime)

            totalCount = 0;
            while (tardata.length > 0) {
                tardata.pop();
            }
            sentence.map((sen) =>
                tardata.push({
                    sentence_id: sen.sentence_id,
                    target_language: document.getElementById(sen.sentence_id).innerHTML.substr(5).slice(0, -6),
                })
            );
            const updateTarData = {
                editor_id: page,
                data: tardata,
            };

            console.log("Saved Data", tardata);

            console.log(totalCount)


            for (var j = 0; j < tardata.length; j++) {

                var str = JSON.stringify(tardata[j].target_language)

                var count = 0;
                for (var i = 0; i <= str.length; i++) {
                    if ((str.charAt(i) == ' ') && (str.charAt(i + 1) != ' ') && (i > 0)) {
                        count = count + 1;
                    }
                }
                totalCount = totalCount + count;

            }
            console.log(totalCount)

            axios
                .post(
                    `${API_URL}api/v1/sentence-info/save/${assId}/`,
                    updateTarData,
                    { headers: AuthHeader() }
                )
                .then(
                    (res) => {
                        alert(res.data.message);
                        //window.location.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
        if (!navigator.onLine) {
            console.log("offline")
            currentdate = new Date();
            datetime = "Last Saved at " + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ","
                + currentdate.getDate() + "/"
                + (currentdate.getMonth()) + "/"
                + currentdate.getFullYear()
            setStamp(datetime)

            totalCount = 0;
            while (tardata.length > 0) {
                tardata.pop();
            }
            sentence.map((sen) =>
                tardata.push({
                    sentence_id: sen.sentence_id,
                    target_language: document.getElementById(sen.sentence_id).innerHTML.substr(5).slice(0, -6),
                })
            );
            const updateTarData = {
                editor_id: page,
                data: tardata,
            };

            console.log("Saved Data", tardata);

            console.log(totalCount)


            for (j = 0; j < tardata.length; j++) {

                str = JSON.stringify(tardata[j].target_language)

                count = 0;
                for (i = 0; i <= str.length; i++) {
                    if ((str.charAt(i) === ' ') && (str.charAt(i + 1) !== ' ') && (i > 0)) {
                        count = count + 1;
                    }
                }
                totalCount = totalCount + count;

            }
            console.log(totalCount)

            localStorage.setItem("Offline Saved Data", JSON.stringify(updateTarData))

        }
    };

    const submit = () => {

        var currentdate = new Date();
        var datetime = "Last Saved at " + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ","
            + currentdate.getDate() + "/"
            + (currentdate.getMonth()) + "/"
            + currentdate.getFullYear()
        setStamp(datetime)

        totalCount = 0;
        while (tardata.length > 0) {
            tardata.pop();
        }
        sentence.map((sen) =>
            tardata.push({
                sentence_id: sen.sentence_id,
                target_language: document.getElementById(sen.sentence_id).innerHTML.substr(5).slice(0, -6),
            })
        );
        const updateTarData = {
            editor_id: page,
            data: tardata,
        };

        console.log("Saved Data", tardata);

        console.log(totalCount)


        for (var j = 0; j < tardata.length; j++) {

            var str = JSON.stringify(tardata[j].target_language)

            var count = 0;
            for (var i = 0; i <= str.length; i++) {
                if ((str.charAt(i) === ' ') && (str.charAt(i + 1) !== ' ') && (i > 0)) {
                    count = count + 1;
                }
            }
            totalCount = totalCount + count;

        }
        console.log(totalCount)

        axios
            .post(
                `${API_URL}api/v1/sentence-info/submit/${assId}/`,
                updateTarData,
                { headers: AuthHeader() }
            )
            .then(
                (res) => {
                    alert(res.data.message);
                    setEditable(false);
                    //window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );


    };

    return (
        <div className={sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5 ? "Grid-Container-clicked" : "Grid-Container"}>

            <TopNavBar primaryInfo={primaryInfo} />
            <LeftNav />
            <div className={sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5 ? "RightNav-Container-Clicked" : "RightNav-Container "}>
                <ul className="nav flex-column">
                    <RightNav toggleSidebar1={toggleSidebar1} toggleSidebar2={toggleSidebar2} toggleSidebar3={toggleSidebar3} toggleSidebar4={toggleSidebar4} toggleSidebar5={toggleSidebar5} sidebar3={sidebar3} sidebar1={sidebar1} sidebar2={sidebar2} sidebar4={sidebar4} sidebar5={sidebar5} />
                    <Sidebar ignoreClick={ignoreClick} onIgnoreClick={onIgnoreClick} sidebar3={sidebar3} sidebar1={sidebar1} sidebar2={sidebar2}
                        sidebar4={sidebar4} assId={assId}
                        sidebar5={sidebar5} rowSuggestion={rowSuggestion} senIdFromSpelling={senIdFromSpelling} senFromSpelling={senFromSpelling}
                        sentenceId={sentenceId} enterTarget={enterTarget} passedId={passedId} existing={existing} />

                </ul >
            </div >
            <Footer assId={assId} progress={progress} sidebar1={sidebar1} sidebar2={sidebar2} sidebar3={sidebar3} sidebar4={sidebar4} sidebar5={sidebar5} totalCount={totalCount} />
            <div className={sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5 ? "editor-card-clicked" : "editor-card"}>
                {/* {
                    alertLogin ? (<div>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert onClose={() => { setAlertLogin(false) }}>Logged in Successfully</Alert>
                        </Stack>
                    </div>) : ""
                } */}




                <Toolbar assId={assId} onChangeSearch={onChangeSearch} editorOn={editorOn}
                    editorOff={editorOff} editor={editor} fSize={fSize} setFontSize={setFontSize}
                    passedId={passedId} searchNo={searchNo} />


                <div className={editor ? "text-area1" : "text-area"}>

                    <p

                        id="content"
                        className="editableText"
                    >
                    </p>
                    {
                        <InputTable searchOn={searchOn} onRowClick={onRowClick} target={target} sentence={sentence} sentenceIdFromSuggest={sentenceIdFromSuggest} fSize={fSize}
                            saveCellData={saveCellData} fill={fill} passId={passId} spellingId={spellingId} editable={editable} />

                    }
                    {/* <Exceltab /> */}

                    <div className={editor ? "tab-main-pdf" : "text-area1"}>

                        <iframe title="" className="pdf-view" src=""></iframe>

                    </div>

                </div>


                <div className={editor ? "paginate-section-pdf" : "paginate-section"}>

                    <div className="paginate-sec-1">
                        Page  {(page <= (primaryInfo.editor_page_count)) ? page : (primaryInfo.editor_page_count)}
                        of  {primaryInfo.editor_page_count} Allocated</div>
                    <div id="pagination__dis">
                        <div className="pagination-editor">

                            <button onClick={prevPage} className="btn-btn-preR">
                                <i className="fa-solid fa-angle-left"></i> Previous
                            </button>
                            <li id="pagination_count" className="btn-btn-midR">
                                {(page < (primaryInfo.editor_page_count)) ? page : (primaryInfo.editor_page_count)} of 60
                            </li>
                            <button onClick={() => nextPage(primaryInfo.editor_page_count)} className="btn-btn-nextR">
                                Next <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </div>

                    <div className={editor ? "save-submitt-pdf" : "save-submitt"}>

                        <div className="date-section"><p>{stamp}</p></div>
                        <div>
                            <button onClick={save} className="sub11">
                                Save
                            </button>
                        </div>
                        <div>
                            <button onClick={submit} className="sub12">
                                Submit
                            </button>
                        </div>





                    </div>
                </div>


            </div>








        </div >

    );
};

export default React.memo(DefaultView);