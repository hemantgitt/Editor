import { React, useState , memo} from 'react'
import "../../../Style/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../DefaultView/DefaultView.css";
import Table from "react-bootstrap/Table";
import './SuggestedTranslation.css';
import { useCallback } from 'react';

 
const SuggestedTranslation = ({ sidebar3, rowSuggestion, sentenceId, enterTarget }) => {


    const [infoTextSource, setInfoTextSource] = useState("");
    const [infoTextMatch, setInfoTextMatch] = useState("");
    const [infoTextTarget, setInfoTextTarget] = useState("");

    const onRowClick=useCallback((sug) => {
        setInfoTextSource(sug.source_language)
        console.log(infoTextSource)
        setInfoTextMatch(sug.source_match)
        console.log(infoTextMatch)
        setInfoTextTarget(sug.target_language)
        console.log(infoTextTarget)
        return false;
    })

    return (


        <>

            <div className={sidebar3 ? " Suggested-Container " : "Suggested-Container sidebar "}>

                   <div>
                    <h2 className={sidebar3 ? "Suggested-inner-Conatiner" : "Suggested-inner-Conatiner sidebar "}>


                        <div>
                           <span id="Suggested-Heading">Suggested Translations</span> 
                        </div>
                    </h2>
                    <div>
                        <div className="Suggest-accordion">

                        <div className="Suggest-innerEntire_Width">
                        <Table>
                                <thead className="thead">
                                    <tr>
                                        <td className="English-Section" id="English-source" >English</td>
                                        <td className="Match-Section" id="Match-source">Match</td>
                                        <td className="Arabic-Section" id="Arabic-source">Arabic</td>
                                    </tr>
                                </thead>

                                <tbody >
                                {
                                    rowSuggestion.map((suggest,index) => (
                                    <tr key={index} onClick={() => onRowClick(suggest)}>
                                    <td className="Row-Style" id='left' >{suggest.source_match.slice(0,16)}</td>
                                    <td className="Row-Style" id='centre' >{suggest.score}%</td>
                                    <td className="Row-Style" id='right' >{suggest.target_language.slice(0,16)}</td>
                            </tr>
                        ))
                    }
                                </tbody>
                            </Table>

                        </div>
                             

                          
                        </div>
                        <div className="Test">
                                <h5>
                                    <strong id="Source-Text_font">Source Text</strong>
                                   
                                  

                                    <p id="Info-Source_Text">
                                        {infoTextSource}
                                    </p>

                                </h5>
                            </div>
                            
                    </div>
                    <div className="Test ">
                                <h5>
                                    <strong id="Source-Match_font">Source Match</strong>
                                   
                                
                                    <p id="Info-Text_font"> {infoTextMatch}</p>
                                </h5>
                            </div>
                            <div className="Test">
                                <h5 onDoubleClick={() => enterTarget(infoTextTarget, sentenceId)}>
                                    <strong id="match-translation_font">Match Translation</strong>
                                 
                                   

                                    <p id="Info_Text-Target_font" >{infoTextTarget}</p>
                                </h5>

                            </div>




                    </div>
                
         




             </div>

        </>
    )
}

export default memo(SuggestedTranslation)