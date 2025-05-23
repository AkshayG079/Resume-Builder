// import React, { useState } from 'react';
// import axios from 'axios';
// import pdfToText from 'react-pdftotext'
// import { Box, List, ListItem, ListItemText, styled, Button, CircularProgress,  ListItemIcon ,   AppBar,
//   Toolbar,  Typography,  Container, Grid,  Paper,  Link,} from '@mui/material';
// import AtsReport from './AtsReport';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
//   color: theme.palette.primary.main, // Color of the progress
//   '& .MuiCircularProgress-circle': {
//     stroke: theme.palette.secondary, // Border color
//     strokeWidth: 4, // Border thickness
//   },
// }));


// const ExtractDataFromFile = () => {

//   const [atsData, setAtsData] = useState(null)

//   const handleSend = async (text) => {
//     try {


//       const prompt = `
//       Evaluate the following resume for ATS compatibility by providing an ATS score from 0 to 100,
//       analyzing strengths and weaknesses in terms of content, format, and relevance to industry job descriptions,
//       suggesting improvements for keyword optimization, assessing formatting effectiveness, evaluating clarity and conciseness,
//       determining alignment with typical job roles in the specific industry, reviewing the work experience section for relevance,
//       examining the highlighting of soft skills, analyzing the presentation of achievements for quantifiability and impact,
//       and offering overall recommendations for improvement in content, format, and ATS optimization.

//       Resume Data: ${text}

//       Please return the output in the following JSON format:
//       {
//         "atsScore": number,
//         "strengths": [
//           { "title": "string", "description": "string" }
//         ],
//         "weaknesses": [
//           { "title": "string", "description": "string" }
//         ],
//         "improvements": {
//           "keywordOptimization": [ "string" ],
//           "formatting": [ "string" ],
//           "content": [ "string" ]
//         },
//         "overallRecommendations": [ "string" ],
//         "additionalTips": [ "string" ],
//         "conclusion": "string"
//       }
//     `;

//       const response = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAqsjaquO5X0JTDKeiv3jHzXj5mklT5n9o`,
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },

//         data: {
//           contents: [
//             { parts: [{ text: prompt }] }
//           ]
//         }
//       });



//       let cleanedText = response.data.candidates[0].content.parts[0].text
//         .replace(/`/g, "")
//         .replace(/json/g, "");
//       setAtsData(JSON.parse(cleanedText))
//       console.log("result ::", JSON.parse(cleanedText))

//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   function handleFileChange(event) {
//     const file = event.target.files[0]
//     pdfToText(file)
//       .then(text => handleSend(text))
//       .catch(error => console.error("Failed to extract text from pdf"))
//   }

//   const score = 50;


//   return (
// <Box sx={{ flexGrow: 1 }}>
//   <AppBar position="static" color="default" elevation={0}>
//     <Toolbar>
//       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//         Resume Builder
//       </Typography>
//       <Button color="inherit" variant="outlined">Logout</Button>
//     </Toolbar>
//   </AppBar>
//   <Container maxWidth="lg" sx={{ mt: 4 }}>
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
//           <Typography variant="h6" gutterBottom>
//             Your Resume Check Score
//           </Typography>
//           <Box sx={{ position: 'relative', display: 'inline-flex' }}>
//             <StyledCircularProgress variant="determinate" value={score} size={100} thickness={4} />
//             <Box
//               sx={{
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 right: 0,
//                 position: 'absolute',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <Typography variant="h4" component="div" color="text.secondary">
//                 {score}
//               </Typography>
//             </Box>
//           </Box>
//           <Typography variant="h6" sx={{ mt: 2, color: 'success' }}>
//            FAIR
//       </Typography>
//        <Typography variant="subtitle1" sx={{ color: 'success' }}>
//           RESUME STRENGTH
// </Typography>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//         {
//         atsData &&
//         <AtsReport {...atsData} />
//       }
//         </Paper>
//       </Grid>
//     </Grid>
//   </Container>
// </Box>

// //     <div>
// //       <Button onClick={handleSend}>Send</Button>
// //       <Button
// //         sx={{ marginTop: 2 }}
// //         component="label"
// //         role={undefined}
// //         variant="contained"
// //         tabIndex={-1}
// //         startIcon={<CloudUploadIcon />}
// //       >
// //         Upload CV
// //         <VisuallyHiddenInput
// //           type="file"
// //           accept="application/pdf"
// //           onChange={(event) => handleFileChange(event)}
// //         />
// //       </Button>
// //       <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center', pt: 4 }}>
// //         <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'navy' }}>
// //           Your Resume Check Score
// //         </Typography>

// //         <Box sx={{ position: 'relative', display: 'inline-flex' }}>
// //           <StyledCircularProgress variant="determinate" value={score} size={120} thickness={4} />
// //           <Box
// //             sx={{
// //               top: 0,
// //               left: 0,
// //               bottom: 0,
// //               right: 0,
// //               position: 'absolute',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //             }}
// //           >
// //             <Typography variant="h4" component="div" color="text.secondary">
// //               {score}
// //             </Typography>
// //           </Box>
// //         </Box>

// //         <Typography variant="h6" sx={{ mt: 2, color: 'success.main' }}>
// //           FAIR
// //         </Typography>
// //         <Typography variant="subtitle1" sx={{ color: 'success.main' }}>
// //           RESUME STRENGTH
// //         </Typography>

// //         <Typography variant="body1" align="left" gutterBottom>
// //           Review our suggestions to see what you can fix.
// //         </Typography>

// //         <List>
// //           {improvements.map((item, index) => (
// //             <ListItem key={index} disablePadding>
// //               <ListItemIcon>
// //                 <ErrorOutlineIcon color="error" />
// //               </ListItemIcon>
// //               <ListItemText primary={item} />
// //             </ListItem>
// //           ))}
// //         </List>
// //       </Box>



// //       
    
//   );
// };


// export default ExtractDataFromFile;



// // import React from 'react';
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Button,
// //   Container,
// //   Grid,
// //   Paper,
// //   CircularProgress,
// //   Box,
// //   Link, styled
// // } from '@mui/material';

// // const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
// //   color: theme.palette.success,
// // }));

// // const PlaceholderBox = styled(Box)(({ theme }) => ({
// //   height: '20px',
// //   backgroundColor: theme.palette.grey[300],
// //   marginBottom: theme.spacing(1),
// // }));

// // export default function ResumeBuilder() {
// //   const score = 63;

// //   return (
    
// //   );
// // }



// // // // const promptData = {
// // // //   prompt: `Evaluate the following resume for ATS compatibility by providing an ATS score from 0 to 100, analyzing strengths and weaknesses in terms of content, format, and relevance to industry job descriptions, suggesting improvements for keyword optimization, assessing formatting effectiveness, evaluating clarity and conciseness, determining alignment with typical job roles in the specific industry industry, reviewing the work experience section for relevance, examining the highlighting of soft skills, analyzing the presentation of achievements for quantifiability and impact, and offering overall recommendations for improvement in content, format, and ATS optimization.
// // // //   Resume Data: ${text}`,
// // // //   output: {
// // // //     atsScore: 0,
// // // //     weakPoints: "",
// // // //     strongPoints: "",
// // // //     keywordSuggestions: [],
// // // //     formattingIssues: "",
// // // //     claritySuggestions: "",
// // // //     industryAlignment: "",
// // // //     experienceRelevance: "",
// // // //     softSkillsAssessment: "",
// // // //     achievementSuggestions: "",
// // // //     overallRecommendations: ""
// // // //   }
// // // // };

// // // // const prompt = `Evaluate the following resume for ATS compatibility by providing an ATS score from 0 to 100, analyzing strengths and weaknesses in terms of content, and relevance to industry job descriptions, suggesting improvements for keyword optimization, assessing formatting effectiveness, evaluating clarity and conciseness, determining alignment with typical job roles in the specific industry, reviewing the work experience section for relevance, examining the highlighting of soft skills, analyzing the presentation of achievements for quantifiability and impact, and offering overall recommendations for improvement in content, format, and ATS optimization.
// // // // Resume Data: ${text}`;












// --------------------------------------- ///

// Login Behind the sub column add

import React, { useState } from 'react';
import { Grid, Button, TextField, Typography } from '@mui/material';

// const CustomizeResume1 = () => {
//   const [customFields, setCustomFields] = useState([
//     { 
//       heading: 'Default Heading', 
//       title: 'Default Title', 
//       description: 'Default Description', 
//       subColumns: [] // Initialize sub-columns array
//     }
//   ]);

//   // Handle input change for custom fields
//   const handleInputChange = (e, index, type) => {
//     const { name, value } = e.target;
//     const updatedFields = [...customFields];
//     updatedFields[index][name] = value;
//     setCustomFields(updatedFields);
//   };

//   // Add a new custom field
//   const addColumn = () => {
//     setCustomFields([
//       ...customFields, 
//       { heading: '', title: '', description: '', subColumns: [] }
//     ]);
//   };

//   // Delete a custom field
//   const deleteColumn = (index) => {
//     const updatedFields = customFields.filter((_, i) => i !== index);
//     setCustomFields(updatedFields);
//   };

//   // Add a sub-column to a specific custom field
//   const addSubColumn = (fieldIndex) => {
//     const updatedFields = [...customFields];
//     updatedFields[fieldIndex].subColumns.push({ subHeading: '', subDescription: '' });
//     setCustomFields(updatedFields);
//   };

//   // Handle input change for sub-columns
//   const handleSubColumnChange = (e, fieldIndex, subIndex) => {
//     const { name, value } = e.target;
//     const updatedFields = [...customFields];
//     updatedFields[fieldIndex].subColumns[subIndex][name] = value;
//     setCustomFields(updatedFields);
//   };

//   return (
//     <>
//       <Typography variant="h5" fontWeight="bold">Custom Fields</Typography>

//       {customFields.map((field, fieldIndex) => (
//         <Grid container spacing={2} key={`field-${fieldIndex}`} sx={{ mb: 2, mt: 1 }}>
//           <Grid item xs={12} sm={8}>
//             <TextField
//               fullWidth
//               label="Heading"
//               variant="outlined"
//               name="heading"
//               value={field.heading}
//               onChange={(e) => handleInputChange(e, fieldIndex, "CustomFields")}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="Title"
//               name="title"
//               variant="outlined"
//               value={field.title}
//               onChange={(e) => handleInputChange(e, fieldIndex, "CustomFields")}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="Description"
//               variant="outlined"
//               name="description"
//               value={field.description}
//               onChange={(e) => handleInputChange(e, fieldIndex, "CustomFields")}
//             />
//           </Grid>
//           <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <Button 
//               variant="outlined" 
//               onClick={() => addSubColumn(fieldIndex)} 
//               sx={{ mb: 1 }}
//             >
//               Add Sub-Column
//             </Button>
//             {fieldIndex !== 0 && (
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={() => deleteColumn(fieldIndex)}
//               >
//                 Delete
//               </Button>
//             )}
//           </Grid>

//           {/* Render Sub-Columns */}
//           {field.subColumns.map((sub, subIndex) => (
//             <Grid container spacing={2} key={`sub-${subIndex}`} sx={{ ml: 2, mt: 1 }}>
//               <Grid item xs={12} sm={5}>
//                 <TextField
//                   fullWidth
//                   label="Sub Heading"
//                   name="subHeading"
//                   value={sub.subHeading}
//                   onChange={(e) => handleSubColumnChange(e, fieldIndex, subIndex)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={5}>
//                 <TextField
//                   fullWidth
//                   label="Sub Description"
//                   name="subDescription"
//                   value={sub.subDescription}
//                   onChange={(e) => handleSubColumnChange(e, fieldIndex, subIndex)}
//                 />
//               </Grid>
//             </Grid>
//           ))}
//         </Grid>
//       ))}

//       <Button variant="outlined" onClick={addColumn} sx={{ mb: 4 }}>
//         Add Custom Field
//       </Button>
//     </>
//   );
// };

// export default CustomizeResume1;


// import React, { useState } from 'react';
// import { Grid, Button, TextField, Typography } from '@mui/material';

// const CustomFieldManager = () => {
//   const [customFields, setCustomFields] = useState([
//     { 
//       heading: 'Default Heading', 
//       title: 'Default Title', 
//       description: 'Default Description', 
//       subColumns: [] // Initialize sub-columns array
//     }
//   ]);

//   // Handle input change for custom fields
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedFields = [...customFields];
//     updatedFields[index][name] = value;
//     setCustomFields(updatedFields);
//   };

//   // Add a new custom field
//   const addColumn = () => {
//     setCustomFields([
//       ...customFields, 
//       { heading: '', title: '', description: '', subColumns: [] }
//     ]);
//   };

//   // Delete a custom field
//   const deleteColumn = (index) => {
//     const updatedFields = customFields.filter((_, i) => i !== index);
//     setCustomFields(updatedFields);
//   };

//   // Add a sub-column to a specific custom field
//   const addSubColumn = (fieldIndex) => {
//     const updatedFields = [...customFields];
//     updatedFields[fieldIndex].subColumns.push({ subHeading: '', subDescription: '' });
//     setCustomFields(updatedFields);
//   };

//   // Handle input change for sub-columns
//   const handleSubColumnChange = (e, fieldIndex, subIndex) => {
//     const { name, value } = e.target;
//     const updatedFields = [...customFields];
//     updatedFields[fieldIndex].subColumns[subIndex][name] = value;
//     setCustomFields(updatedFields);
//   };

//   // Handle form submission to get all data
//   const handleSubmit = () => {
//     console.log("All Custom Fields Data:", customFields);

//     // Example: You can send this data to an API
//     // axios.post('/api/customFields', customFields)
//     //   .then(response => console.log("Data saved:", response.data))
//     //   .catch(error => console.error("Error saving data:", error));
//   };

//   return (
//     <>
//       <Typography variant="h5" fontWeight="bold">Custom Fields</Typography>

//       {customFields.map((field, fieldIndex) => (
//         <Grid container spacing={2} key={`field-${fieldIndex}`} sx={{ mb: 2, mt: 1 }}>
//           <Grid item xs={12} sm={8}>
//             <TextField
//               fullWidth
//               label="Heading"
//               variant="outlined"
//               name="heading"
//               value={field.heading}
//               onChange={(e) => handleInputChange(e, fieldIndex)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="Title"
//               name="title"
//               variant="outlined"
//               value={field.title}
//               onChange={(e) => handleInputChange(e, fieldIndex)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               variant="outlined"
//               value={field.description}
//               onChange={(e) => handleInputChange(e, fieldIndex)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <Button 
//               variant="outlined" 
//               onClick={() => addSubColumn(fieldIndex)} 
//               sx={{ mb: 1 }}
//             >
//               Add Sub-Column
//             </Button>
//             {fieldIndex !== 0 && (
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={() => deleteColumn(fieldIndex)}
//               >
//                 Delete
//               </Button>
//             )}
//           </Grid>

//           {/* Render Sub-Columns */}
//           {field.subColumns.map((sub, subIndex) => (
//             <Grid container spacing={2} key={`sub-${subIndex}`} sx={{ ml: 2, mt: 1 }}>
//               <Grid item xs={12} sm={5}>
//                 <TextField
//                   fullWidth
//                   label="Sub Heading"
//                   name="subHeading"
//                   value={sub.subHeading}
//                   onChange={(e) => handleSubColumnChange(e, fieldIndex, subIndex)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={5}>
//                 <TextField
//                   fullWidth
//                   label="Sub Description"
//                   name="subDescription"
//                   value={sub.subDescription}
//                   onChange={(e) => handleSubColumnChange(e, fieldIndex, subIndex)}
//                 />
//               </Grid>
//             </Grid>
//           ))}
//         </Grid>
//       ))}

//       <Button variant="outlined" onClick={addColumn} sx={{ mb: 4 }}>
//         Add Custom Field
//       </Button>

//       <Button 
//         variant="contained" 
//         color="primary" 
//         onClick={handleSubmit} 
//         sx={{ mb: 2 }}
//       >
//         Submit Data
//       </Button>
//     </>
//   );
// };

// export default CustomFieldManager;



// const handleSaveChanges = async () => {
//     try {
//         if (resumeDataId && resumeId) {
//             const { status } = await axios.put(`http://localhost:4455/resume/Update`, {
//                 userId: loggedUser._id,
//                 resumeDataId: resumeDataId,
//                 resumeData: ResumeData,
//                 resumeId: resumeId
//             }, config);
//             if (status === 200) {
//                 alert("Successfully Updated");
//             }
//         }
//         const { status } = await axios.post(`http://localhost:4455/resume/create`, {
//             userId: loggedUser._id,
//             resume: [{ resumeData: ResumeData }],
//         }, config);
//         if (status === 200) {
//             alert("Successfully Added");
//         }

//     } catch (error) {
//         error.response.status === 400 ? alert(error.response.data.message) : alert('Internal Server Issue');
//     }
// };



// const mongoose = require('mongoose')

// const resumeSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Resume'
//     },
//     resumeData: {
//         type: [],
//         required: true,
//     }
// })

// const Resume = new mongoose.model('Resume',resumeSchema);

// module.exports = Resume;







// app.get('/chat', async (req, res) => {

//     const { text } = req.body

//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAqsjaquO5X0JTDKeiv3jHzXj5mklT5n9o`;

//     // const data = {
//     //     contents: [
//     //         { parts: [{ text: "what is youtube in 5 lines" }] }
//     //     ]
//     // };

//     const promptData = {
//         prompt: `Evaluate the following resume for ATS compatibility by providing an ATS score from 0 to 100, analyzing strengths and weaknesses in terms of content, format, and relevance to industry job descriptions, suggesting improvements for keyword optimization, assessing formatting effectiveness, evaluating clarity and conciseness, determining alignment with typical job roles in the specific industry industry, reviewing the work experience section for relevance, examining the highlighting of soft skills, analyzing the presentation of achievements for quantifiability and impact, and offering overall recommendations for improvement in content, format, and ATS optimization.
//         Resume Data: ${text}`,
//         output: {
//             atsScore: 0,
//             weakPoints: "",
//             strongPoints: "",
//             keywordSuggestions: [],
//             formattingIssues: "",
//             claritySuggestions: "",
//             industryAlignment: "",
//             experienceRelevance: "",
//             softSkillsAssessment: "",
//             achievementSuggestions: "",
//             overallRecommendations: ""
//         }
//     };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(promptData),
//         });

//         const result = await response.json();
//         res.send(result);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })


// const updateResume = asyncHandler(async (req, res) => {
//     const { resumeData, userId, resumeId, resumeDataId } = req.body;

//     const isUserExist = await User.findOne({ _id: userId })
//     if (!isUserExist) {
//         return res.status(400).send({ message: "User does not exist." })
//     }

//     const isResumeExist = await Resume.findOne({ _id: resumeId })
//     if (!isResumeExist) {
//         return res.status(400).send({ message: "Resume does not exist." })
//     }



//     const filteredResumeData = isResumeExist.resume.filter((data, index) => {
//         return data._id.toString() !== resumeDataId
//     })

//     console.log(filteredResumeData);
//     const updatedData = [...filteredResumeData, resumeData];
//     console.log(updatedData);


//     const resumeDocument = await Resume.findOne({ userId });

//     if (!resumeDocument) {
//         return { message: "Resume not found for the specified user." };
//     }

//     // Find the index of the resumeData to update
//     const resumeDataIndex = resumeDocument.resume.findIndex(resume => resume._id.toString() === resumeId);

//     if (resumeDataIndex === -1) {
//         return { message: "ResumeData not found." };
//     }

//     // Update the specific resumeData
//     resumeDocument.resume[resumeDataIndex].resumeData = { ...resumeDocument.resume[resumeDataIndex].resumeData, ...updatedResumeData };

//     // Save the updated document
//     await resumeDocument.save();

//     // res.status(200).send(updateResumeDetails)
//     res.status(200).send(updatedData)
// })