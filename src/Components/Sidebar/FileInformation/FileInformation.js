import React, { useEffect, useState } from 'react';
import "../../../Style/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../FileInformation/FileInformation.css";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import "../../DefaultView/DefaultView.css";
import axios from 'axios';
import AuthHeader from "../../../Services/AuthHeader";
import { memo } from 'react';

const FileInfo = ({ sidebar1,assId }) => {

    const [fileInfo, setFileInfo] = useState({});
    const [collaborators, setCollaborators] = useState({});
    const [taskInfo, setTaskInfo] = useState({});

    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        setTimeout(() => {
            const url =
                `${API_URL}api/v1/file-information?assignment_id=${assId}`;
            axios.get(url, { headers: AuthHeader() }).then((response) => {
                setFileInfo(response.data.file_information);
                setCollaborators(response.data.collaborators);
                setTaskInfo(response.data.task_information);
                console.log("File info", response.data);
            });
        }, 200);

    }, []);


    return (

        <>

            <div className={sidebar1 ? "File-Information-Container" :
                "File-Information-Container sidebar"}>



                <h2 className={sidebar1 ? "File-Information-Accordiaon" : "File-Information-Accordiaon sidebar "}>


                    <div>
                     <span id="File-Heading"> File Information</span>

                    </div>
                </h2>

                <div
                
                >

                    <div className="FileInfo-accordian-body">

                        <div className="inner-tab">

                            <div className="SampleFile">
                                <div className="file__icon"><FileCopyIcon /></div>
                                <div id="pptx">Sample File Name.pptx</div>

                                
                            </div>

                            <div className="row">

                                <div className="c-1">
                                    <p id="Word-count">Word Count</p>
                                    <p id="repeat-words">Repeated words</p>
                                    <p id="sentence-count">Sentence Count</p>
                                    <p id="slid-count">Slide Count</p>
                                </div>
                                <div className="c-2">
                                    <p id="word-countID">{fileInfo.word_count} Words</p>
                                    <p id="word-repeatID">{fileInfo.repeated_words} Words</p>
                                    <p id="word-sentenceID">{fileInfo.sentence_count} Sentences</p>
                                    <p id="word-pageCountID">{fileInfo.page_count} </p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>






                <div>

                    <h2 className={sidebar1 ? "Task-Information-Accordiaon" : "Task-Information-Accordiaon sidebar"}  >

                        <div>
                            <span id="Task-Heading">Task Information</span>
                        </div>
                    </h2>
                    <div id="collapseTwo">

                        <div className="TaskInfo-Container">


                            <div className="TaskInfo-inner-Container">


                                <div className="TaskInfo-inner-flex">


                                    <div className="col-innertask">

                                        <li id="Task-Assigned">Assigned for</li>
                                        <li id="Task-wrod-translate">Total Words to be Translated</li>
                                        <li id="Task-translation">Match in Translation Memory</li>
                                        <li id="Task-Allocated-work">Words Allocated to you</li>
                                    </div>

                                    <div className="col-ht">
                                        <li id="Assigned-ID">{taskInfo.assigned_for}</li>
                                        <li id="Word-TranslateID">{taskInfo.total_words_translated} Words</li>
                                        <li id="Word-MatchID">{taskInfo.words_match_tm} Words</li>
                                        <li id="Word-AllocatedID">{taskInfo.words_allocated} Words</li>
                                    </div>



                                </div>

                            </div>

                        </div>
                    </div>
                </div>






                <div>

                    <h2 className={sidebar1 ? "Collaborator-Information-Accordiaon" : "Collaborator-Information-Accordiaon sidebar "}  >

                        <div>
                            <span id="Collaborator-Heading">Collaborators</span>
                        </div>
                    </h2>
                    <div id="collapseThree" >


                        <div className="Collaborator-Container">

                            <div className="Collaborator-innerinfo-container">

                                <div className="collab-row">

                                    <div className="column">
                                        <li id="Collab-translator-1">Translator (TR1)</li>
                                        <li id="Collab-translator-2">Translator (TR2)</li>
                                        <li id="Collab-proofReader">Proof-Reader(PR)</li>
                                        <li id="Collab-QualityAssurance">Quality Assurance(QA)</li>
                                    </div>

                                    <div className="column">
                                        <li id="collab-TR-ID">{collaborators.Translator_1}</li>
                                        <li id="Collab-NameID"></li>
                                        <li id="Collab-NameID-2">{collaborators.Translator_1}</li>
                                        <li id="Collab-QA-ID">{collaborators.Quality_Assurance_1}</li>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>

            </div>


        </>
    )
}

export default memo(FileInfo)