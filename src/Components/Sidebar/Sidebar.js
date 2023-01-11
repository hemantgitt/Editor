import React from 'react';
import FileInfo  from './FileInformation/FileInformation';
import Spelling from './Spelling/Spelling'
import TermBase from './TermBase/TermBase';
import SuggestedTranslation from './SuggestedTranslation/SuggestedTranslation'
import { memo } from 'react';


const Sidebar = ({ sidebar1, sidebar2, sidebar3, sidebar4, sidebar5,  rowSuggestion, sentenceId, 
        enterTarget,assId, passedId, existing, senIdFromSpelling, senFromSpelling}) => {
    return (
        <>
            <FileInfo  sidebar1={sidebar1} assId={assId} />
            <Spelling assId={assId}   sidebar2={sidebar2} senIdFromSpelling={senIdFromSpelling} senFromSpelling={senFromSpelling} />
            <TermBase assId={assId} sidebar4={sidebar4} passedId={passedId} existing={existing}/>      
            <SuggestedTranslation assId={assId} sidebar3={sidebar3} rowSuggestion={rowSuggestion} sentenceId={sentenceId} enterTarget={enterTarget} />
        </>
    )
}

export default memo(Sidebar)