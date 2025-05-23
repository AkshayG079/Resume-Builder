import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, styled, Stack, CircularProgress, } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Header from '../component/Header';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import AtsReport from './AtsReport';
import { LoadingButton } from '@mui/lab';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.primary.main,
    '& .MuiCircularProgress-circle': {
        stroke: theme.palette.secondary,
        strokeWidth: 4,
    },
}));

const ResumeScanner = () => {
    const [resume, setResume] = useState(null);
    const [jobRole, setJobRole] = useState('');
    const [atsData, setAtsData] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleScanResume = () => {
        if (!resume) {
            alert('Please upload a resume');
            return;
        }
        // if (!jobRole) {
        //     alert('Please provide job role details');
        //     return;
        // }

        if (!resume.type || !resume.type.includes('pdf')) {
            alert('Please upload a valid PDF file');
            return;
        }

        pdfToText(resume)
            .then(text => {
                if (text.trim() === '') {
                    alert('Failed to extract text from the resume. Please upload a valid PDF.');
                    return;
                }
                analyzeResume(text);
            })
            .catch(error => {
                console.error("Failed to extract text from PDF:", error);
                alert('An error occurred while processing the resume. Please try again.');
            });
    };

    const handleClearFeild = () => {
        setResume("");
        setJobRole("");
        setAtsData("");
        // window.location.reload();
    };

    const getAtsStrength = (atsScore) => {
        if (atsScore >= 90) {
            return 'Excellent';
        } else if (atsScore >= 75) {
            return 'Good';
        } else if (atsScore >= 60) {
            return 'Fair';
        } else if (atsScore >= 40) {
            return 'Below Average';
        } else if (atsScore >= 20) {
            return 'Poor';
        } else {
            return 'Very Poor';
        }
    };

    const analyzeResume = async (text) => {
        setAtsData("")
        try {
            const prompt = `
                Evaluate the following resume for ATS (Applicant Tracking System) compatibility. Provide an exact ATS score between 0 and 100, considering the following weighted criteria:
                - **Keyword Relevance (40%)**: Match between resume keywords and the provided job role.
                - **Content Quality (30%)**: Relevance, clarity, and conciseness of the resume content.
                - **Formatting (20%)**: ATS-friendly formatting, such as standard fonts, appropriate headings, and absence of images or tables that can disrupt parsing.
                - **Soft Skills and Achievements (10%)**: Effectiveness in highlighting relevant soft skills and quantifiable achievements.

                For each criterion, assign a sub-score and include it in the output.

                Use the following JSON format for the response:
                {
                    "atsScore": number, // Final score calculated as a weighted average of all criteria.
                    "subScores": {
                    "keywordRelevance": number, // 0-40
                    "contentQuality": number, // 0-30
                    "formatting": number, // 0-20
                    "softSkillsAndAchievements": number // 0-10
                    },
                    "strengths": [
                    { "title": "string", "description": "string" }
                    ],
                    "weaknesses": [
                    { "title": "string", "description": "string" }
                    ],
                    "improvements": {
                    "keywordOptimization": [ "string" ],
                    "formatting": [ "string" ],
                    "content": [ "string" ]
                    },
                    "overallRecommendations": [ "string" ],
                    "additionalTips": [ "string" ],
                    "conclusion": "string"
                }
                Resume Data:${text}
                `;
                // Job Role: ${jobRole}

            setLoading(true)
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=[Your Api Key]`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    contents: [
                        { parts: [{ text: prompt }] }
                    ]
                }
            });
            let cleanedText = response.data.candidates[0].content.parts[0].text
                .replace(/`/g, "")
                .replace(/json/g, "");
            setAtsData(JSON.parse(cleanedText))
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Box backgroundColor='#F0F8FF' sx={{ minHeight: '100vh' }}>
                <Header />
                <Container sx={{ mt: 4 }} >
                    <Paper elevation={3} sx={{ p: 3, my: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Resume Scanner
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" gutterBottom>
                                Upload your resume:
                            </Typography>
                            <Stack direction='row' alignItems='center' spacing={2}>
                                <Button
                                    sx={{ marginTop: 2 }}
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Resume
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(event) => setResume(event.target.files[0])}
                                    />
                                </Button>
                                <Typography variant="subtitle1">  {resume?.name} </Typography>
                            </Stack>
                        </Box>

                        <Stack spacing={3} sx={{ mt: 4 }}>
                            {/* <TextField
                                label="Job Role"
                                fullWidth
                                variant="outlined"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                            /> */}

                            <Stack direction='row' alignItems='center' spacing={2} justifyContent='center'>
                                <LoadingButton
                                    variant="contained"
                                    loading={loading}
                                    color="primary"
                                    onClick={handleScanResume}
                                >
                                    Scan Resume
                                </LoadingButton>
                                <LoadingButton
                                    variant="contained"
                                    loading={loading}
                                    color="primary"
                                    onClick={handleClearFeild}
                                >
                                    Clear
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Paper>
                    {
                        atsData &&
                        <Stack direction='row' spacing={2} >
                            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', flex: '1 1 45%' }}>
                                <Typography variant="h6" gutterBottom>
                                    Your Resume Check Score
                                </Typography>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <StyledCircularProgress variant="determinate" value={atsData.atsScore} size={100} thickness={4} />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="h4" component="div" color="text.secondary">
                                            {atsData.atsScore}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="h6" sx={{ mt: 2, color: 'success' }}>
                                    {getAtsStrength(atsData.atsScore)}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: 'success' }}>
                                    RESUME STRENGTH
                                </Typography>
                                <AtsReport {...atsData} />
                            </Paper>
                        </Stack>
                    }
                </Container>
            </Box>
        </>
    )
}

export default ResumeScanner


