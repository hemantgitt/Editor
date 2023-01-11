import './Replace.css';
import "../../Style/css/all.css";
import SearchIcon from '@material-ui/icons//Search';
import FindReplaceIcon from '@material-ui/icons//FindReplace';
import { memo, useState } from 'react';
import Draggable from 'react-draggable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "@mui/material";
import AuthHeader from "../../Services/AuthHeader";
import axios from 'axios';


const Replace = ({assId, open, setFindOpen, setReplaceOpen }) => {

    const API_URL = process.env.REACT_APP_API_URL

    const initialState = {
        "assignment_id": "",
        "find_text": "",
        "replace_text": "",
        "replace_on": "",
        "replace_all": ""
    }

    const [triggerReplace, setTriggerReplace] = useState(initialState)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorFlag, setErrorFlag] = useState(false)


    const switchReplace = () => {
        setReplaceOpen(false)
        setFindOpen(true)
    }

    const range = (val) => {
        console.log(val);
        triggerReplace.replace_on = val;
    }

    const onChangeFind = (e) => {
        triggerReplace.find_text = e.target.value
       
    }



    const onChangeReplace = (e) => {
        triggerReplace.replace_text = e.target.value
       
    }

    const replaceAll = () => {
         
        triggerReplace.replace_all=true;   
        triggerReplace.assignment_id = assId 
        axios.post(`${API_URL}api/v1/find-replace/replace/`, triggerReplace, { headers: AuthHeader() })
            .then((res) => {
                setErrorFlag(false)
            },
                error => {
                    console.log("Please check the selected values");
                    setErrorFlag(true)
                    setErrorMessage("Please check the selected values")
                });
    }

    return (
        
        <Draggable>
            <Modal hideBackdrop={true} open={open}>

                <div className="Replace-Modal-Container">

                    <div className="Replace-Container-TopSection">

                        <div className="Replace-heading">
                            <button onClick={() => setReplaceOpen(false)} id="Modal-Close">
                                <i className="fa-solid fa-angle-left"></i></button>Replace</div>

                        <div>


                            <button onClick={switchReplace} id="Search-Switch" >
                                <SearchIcon />
                            </button>
                            <button className="toolbar-button" id="Replace-switch">
                                <FindReplaceIcon />
                            </button>
                        </div>



                    </div>

                    <div className="Replace-Container-secondSection">
                        <div className="Inner-box-replace">

                            <div className="Sub-inner-replace">
                                <div className="Replace-heading">Find through</div>

                                <div>
                                    <button type="button" id="Replace-document" data-bs-toggle="dropdown" aria-expanded="false">
                                        <select name="documents" id="Inner-doc" onChange={(e) => range(e.target.value)}>

                                            <option value="">Range</option>
                                            <option value="entire_document">Entire Document</option>
                                            <option value="page">This Page</option>
                                            <option value="part">Your Part</option>



                                        </select>
                                    </button>
                                </div>
                            </div>
                            <div className="Sub-inner-replace">
                                <div className="Replace-text">Looking for</div>

                                <div>
                                    <button type="button" id="Replace-document" data-bs-toggle="dropdown" aria-expanded="false">
                                        <select name="documents" id="Inner-doc2">


                                            <option value="doc">Target Text</option>




                                        </select>
                                    </button>
                                </div>
                            </div>


                        </div>

                        <div className="Replace-Container-thirdSection">
                            <div className="Rep-Wh">Find What</div>
                            <div> <input onChange={(e) => onChangeFind(e)} className="Input-rep" type="text"
                            /></div>

                        </div>

                        <div className="Replace-Container-fourthSection">
                            <div className="Replace-With">Replace With</div>
                            <div><input onChange={(e) => onChangeReplace(e)} className="Input-rep1" type="text"
                            /></div>

                        </div>

                    </div>





                    <div className="Pagination_Bodyy">

                        <button className="btn-btn-preR">
                            <i className="fa-solid fa-angle-left"></i> Previous
                        </button>
                        <li className="btn-btn-midR">
                            21 of 60
                        </li>
                        <button className="btn-btn-nextR">
                            Next <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                    {errorFlag ?
                        <div style={{ color: "red" }}>
                            {errorMessage}
                        </div> : ""}

                    <div className="wrappers">
                        <button onClick={replaceAll} className="Replace-All" >
                            <span id="item-11">Replace All</span>
                        </button>
                        <button className="Replace-Once" >
                            <span id="item-21">Replace Once</span>
                        </button>
                        <button className="Replace-Entire">
                            <span id="item-31">Replace all on this page</span>
                        </button>
                    </div>







                </div>


            </Modal>
        </Draggable>




    )
}



export default memo(Replace)