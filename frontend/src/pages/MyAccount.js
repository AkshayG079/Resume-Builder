import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Template1 from '../component/templates/Template1'
import Template2 from '../component/templates/Template2'
import Template3 from '../component/templates/Template3'
import Template4 from '../component/templates/Template4'
import Template5 from '../component/templates/Template5'
import Template6 from '../component/templates/Template6'
import { Box, Stack } from '@mui/material'
import { DataState } from '../context/Contextprovider'
import axios from 'axios'

const MyAccount = () => {

    const { loggedUser, config } = DataState();
    const [resumeCollection, setResumeCollection] = useState([]);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const { data, status } = await axios.get(`http://localhost:4455/resume/${loggedUser._id}`, config);
                if (status === 200) {
                    setResumeCollection(data)
                }
            } catch (error) {
                error?.response?.status === 400 ? alert(error.response.data.message) : alert('Internal Server Issue');
            }
        }
        if (loggedUser?._id) fetchResumes();
    }, [loggedUser])

    const handleResumeDelete = async (resumeId, resumeDataId) => {
        try {
            const { data, status } = await axios.put('http://localhost:4455/resume/Delete', {
                resumeId,
                resumeDataId
            }, config);
            if (status === 200) {
                setResumeCollection(data);
            }
        } catch (error) {
            error.response.status === 400 ? alert(error.response.data.message) : alert('Internal Server Issue');
        }
    }

    const displayResumeComponent = () => {
        if (!Array.isArray(resumeCollection.resume) || resumeCollection.resume.length === 0) {
            return (
                <Box
                    sx={{
                        paddingTop: 5, textAlign: 'center', color: 'grey.500',
                    }}
                >
                    No resume templates available
                </Box>
            );
        }

        return resumeCollection.resume.map((data, index) => {
            switch (data.resumeData.template) {
                case 1:
                    return <Template1 key={index} {...data.resumeData} resumeDataId={data._id} resumeId={resumeCollection._id} width="45%" isEdit={true} onDelete={handleResumeDelete} />;
                case 2:
                    return <Template2 key={index} {...data.resumeData} resumeDataId={data._id} resumeId={resumeCollection._id} width="45%" isEdit={true} onDelete={handleResumeDelete} />;
                case 3:
                    return <Template3 key={index} {...data.resumeData} resumeDataId={data._id} resumeId={resumeCollection._id} width="45%" isEdit={true} onDelete={handleResumeDelete} />;
                case 4:
                    return <Template4 key={index} {...data.resumeData} resumeDataId={data._id} resumeId={resumeCollection._id} width="45%" isEdit={true} onDelete={handleResumeDelete} />;
                case 5:
                    return <Template5 key={index} {...data.resumeData} resumeDataId={data._id} resumeId={resumeCollection._id} width="45%" isEdit={true} onDelete={handleResumeDelete} />;
                case 6:
                    return <Template6 key={index} {...data.resumeData} resumeDataId={data._id} resumeId={resumeCollection._id} width="45%" isEdit={true} onDelete={handleResumeDelete} />;
                default:
                    return (
                        <Box
                            key={index}
                            sx={{
                                height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.200', color: 'grey.500',
                            }}
                        >
                            No resume
                        </Box>
                    );
            }
        });
    }

    return (
        <>
            <Header />
            <Stack  minHeight='calc(100vh - 12vh)' backgroundColor='#F0F8FF' spacing={1} direction='row' flexWrap='wrap' justifyContent='center'>
                {displayResumeComponent()}
            </Stack>
        </>
    )
}

export default MyAccount