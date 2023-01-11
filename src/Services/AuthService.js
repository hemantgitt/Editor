import axios from "axios";
import AuthHeader from "../Services/AuthHeader";

const API_URL = process.env.REACT_APP_API_URL


const url=API_URL + "api/v1/";
const Signin = (user) => {
    return axios
        .post(url+"token", user)
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const SpellingGrammar = (assId) => {
    return axios.get(url+`diagnostic/spelling-grammar/?assignment_id=${assId}`, { headers: AuthHeader() })

};

const Inconsistency = (assId) => {
    return axios.get(url+`diagnostic/inconsistency/?assignment_id=${assId}`, { headers: AuthHeader() })

};

const Untranslated = (assId) => {
    return axios.get(url+`diagnostic/untranslated/?assignment_id=${assId}`, { headers: AuthHeader() })

};


const Progress_Bar = (assId) => {
    return axios.get(url+`progress-bar/?assignment_id=${assId}`, { headers: AuthHeader() })
}




export {
    Signin,
    SpellingGrammar,
    Inconsistency,
    Untranslated,
    Progress_Bar
    
}