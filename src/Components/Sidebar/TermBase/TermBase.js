import React, { useState } from 'react'
import './TermBase.css'
import axios from 'axios';
import AuthHeader from "../../../Services/AuthHeader";
import { Spinner } from 'react-bootstrap';
import { useCallback } from 'react';
import { memo } from 'react';

const TermBase = ({ sidebar4, passedId, existing }) => {


  const [searchInput, setSearchInput] = useState("");
  const [engData, setEngData] = useState([]);
  const [arData, setArData] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [error,setError]=useState("")
  const [errorFlag,setErrorFlag]=useState(false);
  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  }

  const API_URL = process.env.REACT_APP_API_URL


  const onSearchTM = useCallback(() => {
    setLoading(true);
    if(searchInput.length===0){
      setErrorFlag(true);
      setError("Please Enter a value")
    }
    else{
      axios.get(`${API_URL}api/v1/tm-search/?search=${searchInput}`, { headers: AuthHeader() }).then(
        response => {
          setErrorFlag(false);
          setEngData(response.data.data.english);
          setArData(response.data.data.arabic);
          setLoading(false);
          console.log("English Data", engData);
          console.log("Arabic Data", arData);
  
        })
    }
  })

  const fillData = (dataset) => {
    var curPos =
      document.getElementById(passedId).selectionStart;
    console.log(curPos);
    document.getElementById(passedId).innerText = existing + " " + dataset;
  }

  

  const onKeyDownHandler = e => {
    if (e.key === "Enter") {
      onSearchTM();
    }
  };

  return (
    <>


      <div className={sidebar4 ? "TermBase-Container" : "TermBase-Container sidebar"}>
        <div className={sidebar4 ? "TermBase-inner-Container" : "TermBase-inner--Container sidebar"}>
          <h3 id="TermBase-Heading">Term Base</h3>
        </div>


        <div className="search_box">

          <input placeholder="Search..." className="input" onChange={(e) => onSearchChange(e)}
            onKeyDown={onKeyDownHandler} />
          <a className="btn_common" onClick={() => onSearchTM()}><i className="fa-solid fa-magnifying-glass"></i></a>

        </div>


        {
          (!errorFlag)?
          (
            isLoading ? (
              <>
                Searching
                <Spinner animation="grow" size="sm">
                </Spinner>
  
                <Spinner animation="grow" size="sm">
                </Spinner>
  
              </>
            ) :
              (
  
  
                <div className='termbase-container' id='termbase-text'>
                  {
                    arData.length === 0 ?
                      <div className="ar12"><p id="ar13" className="ar13">AR</p>
                        <p id="ar1" className="ar1">No Results Found</p>
                      </div> :
                      arData.map((ar, index) =>
                      (
                        <div key={index} className="ar12">
                          <p id="ar13" className="ar13">AR</p>
                          <p id="ar1" className="ar1" onDoubleClick={() => fillData(ar)}>{ar}</p>
  
                        </div>))
                  }
  
                  {
                    engData.length === 0 ?
                      <div className="ar12"><p id="ar13" className="ar13">EN</p>
                        <p id="ar1" className="ar1">No Results Found</p>
                      </div> :
                      engData.map((en, index) =>
                      (
                        <div key={index} className="ar12">
                          <p id="ar13" className="ar13">EN</p>
                          <p id="ar1" className="ar1" onDoubleClick={() => fillData(en)}>{en}</p>
  
                        </div>))
                  }
                </div>)
          ):(<div>
            {error}
          </div>)
        }
      </div>
    </>
  )
}

export default memo(TermBase)