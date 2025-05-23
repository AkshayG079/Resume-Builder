import { Box, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import jsPDF from 'jspdf';

import Template1 from '../component/templates/Template1';
import Template2 from '../component/templates/Template2';
import Template3 from '../component/templates/Template3';
import Template4 from '../component/templates/Template4';
import Template5 from '../component/templates/Template5';
import Template6 from '../component/templates/Template6';

import generateResume1 from "./generateResumeTemplate/generateResume1";
import generateResume2 from "./generateResumeTemplate/generateResume2";
import generateResume3 from "./generateResumeTemplate/generateResume3";
import generateResume4 from "./generateResumeTemplate/generateResume4";
import generateResume5 from "./generateResumeTemplate/generateResume5";
import generateResume6 from "./generateResumeTemplate/generateResume6";

import { DataState } from '../context/Contextprovider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header';

const Preview = () => {

    const { ResumeData, loggedUser, config, setResumeData } = DataState();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const templateNumber = parseInt(searchParams.get('template'));
    const resumeDataId = searchParams.get('id')
    const resumeId = searchParams.get('resume')
    const editable = searchParams.get('editable')

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const { data, status } = await axios.get(`http://localhost:4455/resume/${loggedUser._id}`, config);
                if (status === 200) {
                    data.resume.forEach((resData) => {
                        if (resData._id === resumeDataId) {
                            setResumeData(resData.resumeData);
                        }
                    })
                }
            } catch (error) {
                error?.response?.status === 400 ? alert(error.response.data.message) : alert('Internal Server Issue');
            }
        }
        if (loggedUser?._id && resumeDataId) {
            if (Boolean(!editable)) {
                fetchResumes();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const previousPage = () => {
        if (resumeDataId) {
            navigate(`/addResumeDetails/template?template=${templateNumber}&id=${resumeDataId}&resume=${resumeId}&editable=true`);
        } else {
            navigate(`/addResumeDetails/template?template=${templateNumber}`);
        }
    }

    const handleSaveChanges = async () => {
        if (Boolean(!editable) && resumeDataId) {
            return false
        }
        try {
            if (resumeDataId) {
                const { status } = await axios.put(
                    `http://localhost:4455/resume/Update`,
                    {
                        userId: loggedUser._id,
                        resumeDataId: resumeDataId,
                        resumeData: ResumeData,
                        resumeId
                    },
                    config
                );
                if (status === 200) {
                    alert("Successfully Updated");
                    return;
                }
            } else {
                const { status } = await axios.post(
                    `http://localhost:4455/resume/create`,
                    {
                        userId: loggedUser._id,
                        resume: [{ resumeData: ResumeData }],
                    },
                    config
                );
                if (status === 200) {
                    alert("Successfully Added");
                }
            }
        } catch (error) {
            error.response.status === 400 ? alert(error.response.data.message) : alert('Internal Server Issue');
        }
    };

    const handleDownload = () => {

        const pdf = new jsPDF();

        if (ResumeData.template === 1) {
            console.log(ResumeData.information.pic.startsWith('data:image/webp;base64'))
            if (ResumeData.information.pic && (ResumeData.information.pic.startsWith('data:image/webp;base64') || ResumeData.information.pic.startsWith('data:image/png;base64'))) {
                generateResume1(pdf, ResumeData);
            } else {
                return alert("Upload profile picture to download.")
            }
        } else if (ResumeData.template === 2) {
            generateResume2(pdf, ResumeData);
        } else if (ResumeData.template === 3) {
            generateResume3(pdf, ResumeData);
        } else if (ResumeData.template === 4) {
            generateResume4(pdf, ResumeData);
        } else if (ResumeData.template === 5) {
            generateResume5(pdf, ResumeData);
        } else if (ResumeData.template === 6) {
            generateResume6(pdf, ResumeData);
        } else {
            alert("The selected resume template is unavailable.");
        }

        // Save the PDF
        pdf.save("resume.pdf");
    };


    const displayResumeComponent = () => {
        if (templateNumber === 1) {
            return <Template1 {...ResumeData} />;
        } else if (templateNumber === 2) {
            return <Template2 {...ResumeData} />;
        } else if (templateNumber === 3) {
            return <Template3 {...ResumeData} />;
        } else if (templateNumber === 4) {
            return <Template4 {...ResumeData} />;
        } else if (templateNumber === 5) {
            return <Template5 {...ResumeData} />;
        } else if (templateNumber === 6) {
            return <Template6 {...ResumeData} />;
        } else {
            return <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                No resume
            </Box>;
        }
    };

    return (
        <>
            <Box backgroundColor='#F0F8FF' sx={{ minHeight: '100vh' }}>
                <Header />
                <Stack spacing={2} direction='row' justifyContent='center' padding={2}>
                    <Button variant="outlined" size="medium" onClick={previousPage}>Edit</Button>
                    <Button variant="outlined" size="medium" onClick={handleSaveChanges}> Save</Button>
                    <Button variant="outlined" size="medium" onClick={handleDownload}>Download</Button>
                </Stack>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {displayResumeComponent()}
                </Box>
            </Box >
        </>
    );
};

export default Preview;



