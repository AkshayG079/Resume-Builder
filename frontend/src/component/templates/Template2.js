import React from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  ListItemText,
  Paper,
  Button,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const Template2 = ({ education, workExperience, information, projects, skills, customFields, summary, height = 'auto', width = '80%', isEdit = false, resumeDataId, resumeId, onDelete }) => {

  const navigate = useNavigate();
  const deleteResumeTemplate = () => {
    onDelete(resumeId, resumeDataId)
  }


  return (
    <>
      <Box
        sx={{
          width: width,
          height: height,
          overflow: 'auto', // Ensure scrolling if content exceeds the container height
          padding: '16px',
          boxSizing: 'border-box'
        }}
      >
        <Container>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Box mb={1}>
              <Typography variant="h4" component="h1" >
                {information?.name}
              </Typography>
              <Typography variant="h6" component="h1" gutterBottom>
                {information?.jobTitle}
              </Typography>
              <Typography variant="body2">
                {`${information?.address} | ${information?.email} | ${information?.phone}`}
              </Typography>
            </Box>

            <Divider sx={{
              padding: 0.15,
              backgroundColor: 'black'
            }} />

            <Section mt={2}>
              <SectionTitle variant="h6">SUMMARY</SectionTitle>
              <Divider sx={{
                mt: -1,
                mb: 1,
                padding: 0.1,
                backgroundColor: 'lightgrey'
              }} />
              {
                summary?.map((summary, index) => (
                  <Typography key={`summ-${index}`} variant="body2">
                    {summary.title}
                  </Typography>
                ))
              }
            </Section>

            <Section>
              <SectionTitle variant="h6">PROFESSIONAL EXPERIENCE</SectionTitle>
              <Divider sx={{
                mt: -1,
                mb: 1,
                padding: 0.1,
                backgroundColor: 'lightgrey'
              }} />
              {
                workExperience?.map((data, index) => (
                  <Box key={`work-${index}`} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }

            </Section>

            <Section>
              <SectionTitle variant="h6">PROJECTS</SectionTitle>
              <Divider sx={{
                mt: -1,
                mb: 1,
                padding: 0.1,
                backgroundColor: 'lightgrey'
              }} />
              {
                projects?.map((data, index) => (
                  <Box key={`project-${index}`} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionTitle variant="h6">SKILLS</SectionTitle>
              <Divider sx={{
                mt: -1,
                padding: 0.1,
                backgroundColor: 'lightgrey'
              }} />
              {
                skills?.map((data, index) => (
                  <Box key={`skill-${index}`} mb={2}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionTitle variant="h6">EDUCATION</SectionTitle>
              <Divider sx={{
                mt: -1,
                mb: 1,
                padding: 0.1,
                backgroundColor: 'lightgrey'
              }} />
              {
                education?.map((data, index) => (
                  <Box key={`edu-${index}`} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.courseName}
                    </Typography>
                    <Typography variant="body2">
                      {data.collegeName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`${data.startDate} - ${data.endDate}`}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              {
                customFields?.map((data, index) => (
                  <>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {data.heading}
                    </Typography>
                    <Divider sx={{
                      mt: -1,
                      mb: 1,
                      padding: 0.1,
                      backgroundColor: 'lightgrey'
                    }} />
                    <Box key={`cust-${index}`} mb={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {data.title}
                      </Typography>
                      <ListItemText primary={`${data.description}`} />
                    </Box>
                  </>
                ))
              }
            </Section>
          </Paper>
        </Container>
        {
          isEdit && (
            <Stack direction='row' justifyContent='center' mt={2} spacing={1}>
              <Button variant="contained" onClick={() => navigate(`/preview/template?template=2&id=${resumeDataId}&resume=${resumeId}`)}>Edit</Button>
              <Button variant="contained" onClick={() => deleteResumeTemplate()}>Delete</Button>
            </Stack>
          )
        }
      </Box>
    </>
  )
}

export default Template2