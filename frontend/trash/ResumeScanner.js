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
    const [loading, setLoading] = useState(false)

    // const handleScanResume = () => {
    //     if (!resume) {
    //         alert('Please upload a resume');
    //         return;
    //     }
    //     if (!jobRole) {
    //         alert('Please provide job role details');
    //         return;
    //     }
    //     pdfToText(resume)
    //         .then(text => text === '' && analyzeResume(text))
    //         .catch(error => console.error("Failed to extract text from pdf"))
    // };


    const handleScanResume = () => {
        if (!resume) {
            alert('Please upload a resume');
            return;
        }
        if (!jobRole) {
            alert('Please provide job role details');
            return;
        }

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
        console.log(text);

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
                Job Role: ${jobRole}

                `;

            setLoading(true)
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAqsjaquO5X0JTDKeiv3jHzXj5mklT5n9o`,
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
                            <TextField
                                label="Job Role"
                                fullWidth
                                variant="outlined"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                            />

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



// Resume Data: "John Doe
// 📍 Address: 123 Main Street, Springfield, USA
// 📞 Phone: (123) 456-7890
// 📧 Email: john.doe@email.com
// 🔗 LinkedIn: linkedin.com/in/johndoe
// 🌐 Portfolio: johndoeprojects.com

// Professional Summary
// Results-driven Project Manager with over 8 years of experience leading cross-functional teams to deliver complex projects on time and within budget. Expertise in Agile methodologies, stakeholder communication, and resource allocation. Proven track record in process improvement and achieving measurable business outcomes.

// Key Skills
// Project Management Tools: Jira, Trello, MS Project
// Methodologies: Agile, Scrum, Waterfall
// Budget Management: Cost Control, Forecasting
// Leadership: Team Building, Conflict Resolution
// Communication: Stakeholder Engagement, Presentation Skills
// Certifications: PMP, Certified Scrum Master
// Professional Experience
// Senior Project Manager
// XYZ Corporation, Springfield, USA
// (Jan 2018 – Present)

// Successfully managed 15+ large-scale projects with budgets up to $5M, achieving 98% on-time delivery.
// Implemented Agile practices, reducing project completion time by 20%.
// Increased team productivity by 30% through effective resource management and training initiatives.
// Collaborated with stakeholders to define clear project objectives, improving satisfaction scores by 25%.
// Project Manager
// ABC Solutions, Springfield, USA
// (Jun 2015 – Dec 2017)

// Directed a team of 10 in delivering e-commerce platform enhancements, boosting client sales by 15%.
// Conducted weekly risk assessments, reducing project delays by 10%.
// Streamlined project documentation processes, improving team efficiency by 20 hours per month.
// Education
// Bachelor of Science in Business Administration
// University of Springfield, USA
// (Graduated: 2014)

// Certifications
// Project Management Professional (PMP) – PMI (2017)
// Certified Scrum Master (CSM) – Scrum Alliance (2018)
// Additional Information
// Languages: Fluent in English, Spanish
// Volunteer Work: Mentorship Program Lead, Springfield Nonprofits"

// if (storeRef) {
//     html2canvas(storeRef, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const width = pdf.internal.pageSize.getWidth();
//         const height = pdf.internal.pageSize.getHeight();
//         pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//         pdf.save('resume.pdf');
//     }).catch((error) => {
//         alert("Some Error Occured while generating the pdf file")
//         console.error('Error generating PDF:', error);
//     });
// }


const pdf = new jsPDF();
console.log('this is resume data: ', ResumeData);

// Title Section
pdf.setFont("Helvetica", "bold");
pdf.setFontSize(18);
pdf.setTextColor(40, 40, 40);
pdf.text(ResumeData.information.name, 10, 20);

// Contact Info Section
pdf.setFont("Helvetica", "normal");
pdf.setFontSize(12);
pdf.text(ResumeData.information.jobTitle, 10, 27);
const contactInfo = `${ResumeData.information.address} | ${ResumeData.information.email} | ${ResumeData.information.phone}`;
pdf.text(contactInfo, 10, 34);

pdf.setDrawColor(0, 0, 0); // Set the draw color to black
pdf.setLineWidth(0.75); // Optional: Set the thickness of the line
pdf.line(10, 38, 200, 38); // Horizontal line below the contact info

// Summary Section
pdf.setFont("Helvetica", "bold");
pdf.setFontSize(14);
pdf.setTextColor(40, 40, 40);
pdf.text("Summary", 10, 48);

pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
pdf.line(10, 52, 200, 52); // Horizontal line under the "Summary" title

// Summary Content
pdf.setFont("Helvetica", "normal");
pdf.setFontSize(12);
pdf.setTextColor(40, 40, 40);

const summaryArray = ResumeData.summary || ['-'];
let y = 58; // Starting position for text

summaryArray.forEach((line) => {
    pdf.text(line.title, 10, y);
    y += 10; // Adjust line spacing

    // Check if we need to add a new page
    if (y > 270) { // If y exceeds a certain limit, add a new page
        pdf.addPage();
        y = 20; // Reset y position for the new page
    }
});

// Work Experience Section
pdf.setFont("Helvetica", "bold");
pdf.setFontSize(14);
pdf.setTextColor(40, 40, 40);
pdf.text("Work Experience", 10, y);
y += 7; // Spacing after the title

pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
pdf.line(10, y - 4, 200, y - 4);

const workExperienceArray = ResumeData.workExperience || [];
workExperienceArray.forEach((work) => {
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`${work.title}`, 10, y + 2);
    pdf.text(work.description, 13, y + 9);
    y += 17; // Adjust line spacing

    // Check if we need to add a new page
    if (y > 270) {
        pdf.addPage();
        y = 20;
    }
});

// Projects Section
pdf.setFont("Helvetica", "bold");
pdf.setFontSize(14);
pdf.setTextColor(40, 40, 40);
pdf.text("Projects", 10, y - 1);
y += 7; // Spacing after the title

pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
pdf.line(10, y - 4, 200, y - 4);

const projectsArray = ResumeData.projects || [];
projectsArray.forEach((project) => {
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(project.title, 10, y + 2);
    pdf.text(project.description, 13, y + 9);
    y += 14; // Adjust line spacing

    // Check if we need to add a new page
    if (y > 270) {
        pdf.addPage();
        y = 20;
    }
});

// Skills Section
pdf.setFont("Helvetica", "bold");
pdf.setFontSize(14);
pdf.setTextColor(40, 40, 40);
pdf.text("Skills", 10, y + 4);
y += 7; // Spacing after the title

pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
pdf.line(10, y, 200, y);

pdf.setFont("Helvetica", "normal");
pdf.setFontSize(12);
pdf.setTextColor(40, 40, 40);

const skillsArray = ResumeData.skills || [];
skillsArray.forEach((skill) => {
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(skill.title, 13, y + 8);
    y += 7; // Adjust line spacing

    // Check if we need to add a new page
    if (y > 270) {
        pdf.addPage();
        y = 20;
    }
});

// Education Section (Reordered to appear after Skills)
pdf.setFont("Helvetica", "bold");
pdf.setFontSize(14);
pdf.setTextColor(40, 40, 40);
pdf.text("Education", 10, y + 10);
y += 7; // Spacing after the title

pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
pdf.line(10, y + 6, 200, y + 6);

const educationArray = ResumeData.education || [];
educationArray.forEach((edu) => {
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`${edu.courseName}`, 10, y + 12);
    pdf.text(`${edu.collegeName}`, 10, y + 18);
    pdf.setTextColor(140, 140, 140);
    pdf.text(`${edu.startDate} - ${edu.endDate}`, 10, y + 25);
    pdf.setTextColor(40, 40, 40);
    pdf.text(`${edu.description}`, 13, y + 32);
    y += 29; // Adjust line spacing

    // Check if we need to add a new page
    if (y > 270) {
        pdf.addPage();
        y = 20;
    }
});

// Custom Fields Section
const customFieldsArray = ResumeData.customFields || [];
customFieldsArray.forEach((field) => {
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(`${field.heading}`, 10, y + 12);

    pdf.setDrawColor(128, 128, 128); // Set the draw color to gray
    pdf.setLineWidth(0.55); // Optional: Set the thickness of the line
    pdf.line(10, y + 16, 200, y + 16);

    pdf.text(` ${field.title}`, 10, y + 22);
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(` ${field.description}`, 13, y + 28);
    y += 26; // Adjust line spacing

    // Check if we need to add a new page
    if (y > 270) {
        pdf.addPage();
        y = 20;
    }
});

// Save the PDF
pdf.save("resume.pdf");
