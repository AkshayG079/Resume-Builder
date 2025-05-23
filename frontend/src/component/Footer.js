import { Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <>
            <Stack direction='row' justifyContent="space-between" color="text.secondary" backgroundColor='#F0F8FF'>
                <Typography variant="subtitle1">ResumeBuilder</Typography>
                <Typography variant="subtitle1">Akshay</Typography>
            </Stack>
        </>
    )
}

export default Footer