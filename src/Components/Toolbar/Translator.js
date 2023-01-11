import React from 'react'
import { memo } from 'react';
import axios from 'axios';
import AuthHeader from "../../Services/AuthHeader";
import './Translator.css'
import Draggable from 'react-draggable';
import { useState } from 'react';

const Translator = (props) => {
    
    const API_URL = process.env.REACT_APP_API_URL

    const initialState={
        assignment_id: props.assId,
        score_limit: 0,
        machine_translation:false,
        translation_memory: false,
        populate_on : "",
        editor_id : "0"
    }

    const [prePopulate,setPrePopulate]=useState(initialState)
    const [errorMessage, setErrorMessage]=useState("")
    const [errorFlag,setErrorFlag]=useState(false)

    const match=(val)=>{
        console.log(val);
        prePopulate.score_limit=parseInt(val)
    }
    const range=(val)=>{
        console.log(val);
        prePopulate.populate_on=val
    }

    const memory=(val)=>{
        console.log(val);  
        if(val=== "machine"){
            prePopulate.machine_translation=true
        }
        if(val=== "translation"){
            prePopulate.translation_memory=true
        }
    }

   const showValues=()=>{
    console.log(JSON.stringify(prePopulate))
    setPrePopulate(initialState)

    axios
        .post(
        `${API_URL}api/v1/pre-populate`,
        (prePopulate),
        { headers: AuthHeader() }
    )
    .then(
        (res) => {
            console.log(res.data);
            setErrorFlag(false)

        },
        (error) => {
            console.log("Please check the selected values");
            setErrorFlag(true)
            setErrorMessage("Please check the selected values")
        }
    );

//

   }

    return (props.trigger) ? (


        <Draggable>
        <div className="tran">

            <div className="trans-inner">

                <div className="cross">
                    <div className="find2">  <button id="Modal-Close" onClick={() => props.setTrigger(false)}>
                    <i className="fa-solid fa-angle-left"></i>
                    </button>Prepopulate Translation</div>
                    <div></div>
                </div>

                <div className="ON">
                    <div className="populateOn">
                        Populate On
                    </div>

                    <button style={{border:"none",background:"none"}}>
                        <select name="pop-on" id="doc" onChange={(e) => range(e.target.value)}>
                            <option value=" ">Range</option>
                            <option value="part">Part</option>
                            <option value="page">This Page</option>
                            <option value="entire document">Entire Document</option>
                        </select>
                    </button>

                </div>

                <div className="ON">

                    <div className="populateOns">Minimum match</div>

                    <button style={{border:"none",background:"none"}}>
                        <select  id="doc" onChange={(e) => match(e.target.value)}>

                            <option value=" ">Select Match</option>
                            <option value="90">90%</option>
                            <option value="80">80%</option>
                            <option value="70">70%</option>
                            <option value="60">60%</option>
                            <option value="50">50%</option>
                            <option value="40">40%</option>
                            <option value="30">30%</option>
                            <option value="20">20%</option>
                            <option value="10">10%</option>


                        </select>
                    </button>


                </div>


                <div className="wrappers1">
                    <div className="item-11"> Use</div>

                    <div className="machine-tran">
                        <input type="checkbox" id="Input__Box" name="memory" value="machine" 
                        onChange={(e) => memory(e.target.value)}/>
                        <label htmlFor="memory">Machine Translation</label>
                    </div>

                    <div className="memory-tran">
                        <input type="checkbox" id="Input__Box" name="memory" value="translation"
                        onChange={(e) => memory(e.target.value)}/> 
                        <label htmlFor="memory">Translation Memory</label>
                    </div>
               

                </div>

                {errorFlag?
                <div style={{color:"red"}}>
                {errorMessage}
                </div>:""}

                <button className="late" onClick={showValues}>
                   Populate
                </button>




                {props.children}


            </div>


        </div>

        </Draggable>


    ) : "";
}

export default memo(Translator)