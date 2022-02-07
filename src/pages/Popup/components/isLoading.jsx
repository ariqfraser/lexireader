import React, { useEffect } from 'react';
import { useState } from 'react'
import { styled } from '@mui/system';
import Logo from '../../../assets/logo'
import { grey } from '@mui/material/colors';

const isLoading = () => {
    const LoadingContainer = styled(div)({
        flex: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'center',
        backgroundColor: '#212121',
        '& p': {
            fontSize: '24px',
            color: grey[300],
        }
    })

    const [loadingState, setLoadingState] = useState()

    useEffect({
        // API check
        // change loadingState to match status
        // redirect to Popup

        // note: this could probably be done in background script on launch
    }, [])

    return <LoadingContainer>
        <Logo width="128px" />
        <p>{loadingState}</p>
    </LoadingContainer>;
};

export default isLoading;

