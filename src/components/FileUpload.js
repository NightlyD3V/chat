import React from 'react';
import upload from '../images/upload.png'
import styled from 'styled-components';

const MasterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

function FileUpload() {
    return (
        <MasterContainer>
            <input 
                style={{ visibility: 'hidden' }}
                type="file"
                id="upload"
            >
            </input>
        </MasterContainer>
    )
}

export default FileUpload;