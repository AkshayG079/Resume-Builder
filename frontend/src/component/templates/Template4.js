import React from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  ListItemText,
  Grid,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';

// Styled components
const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center'
}));

const Template4 = ({ education, workExperience, information, projects, customFields, summary, skills, height = 'auto', width = '80%', isEdit = false, resumeDataId, resumeId, onDelete }) => {

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
            <Box mb={3} textAlign='center'>
              <Typography variant="h4" component="h1" gutterBottom >
                {information?.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {information?.jobTitle}
              </Typography>
              <Typography variant="body2" sx={{
                backgroundColor: 'grey.300',
                padding: 0.5
              }}>
                {`${information?.address} | ${information?.email} | ${information?.phone}`}
              </Typography>
            </Box>


            <Section>
              <SectionTitle variant="h6">PROFESSIONAL SUMMARY</SectionTitle>
              <Divider sx={{
                backgroundColor: 'grey.300',
                padding: 0.15,
                mb: 2
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
              <SectionTitle variant="h6">WORK EXPERIENCE</SectionTitle>
              <Divider sx={{
                backgroundColor: 'grey.300',
                padding: 0.15,
                mb: 2
              }} />
              {
                workExperience?.map((data, index) => (
                  <Box key={`wrok-${index}`} mb={2}>
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
                backgroundColor: 'grey.300',
                padding: 0.15,
                mb: 2
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
                backgroundColor: 'grey.300',
                padding: 0.15,
                mb: 2
              }} />

              {
                <Grid container spacing={1}>
                  {skills?.map((data, index) => (
                    <Grid item xs={12} key={`skill-${index}`}>
                      <Typography variant="body2">{data.title}</Typography>
                    </Grid>
                  ))}
                </Grid>
              }
            </Section>

            <Section>
              <SectionTitle variant="h6">EDUCATION</SectionTitle>
              <Divider sx={{
                backgroundColor: 'grey.300',
                padding: 0.15,
                mb: 2
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
                    <SectionTitle variant="h6">{data.heading}</SectionTitle>
                    {
                      (data.heading !== "" && data.description !== "" && data.title !== "") &&
                      <Divider sx={{
                        backgroundColor: '#D3D3D3',
                        padding: 0.1
                      }} />
                    }
                    <Box my={1} key={`cust-${index}`}>
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
              <Button variant="contained" onClick={() => navigate(`/preview/template?template=4&id=${resumeDataId}&resume=${resumeId}`)}>Edit</Button>
              <Button variant="contained" onClick={() => deleteResumeTemplate()}>Delete</Button>
            </Stack>
          )
        }
      </Box>
    </>
  )
}

export default Template4





