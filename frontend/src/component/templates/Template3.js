import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  ListItemText,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SectionHeader = styled(Typography)(({ theme }) => ({
  color: '#8e44ad',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
const Template3 = ({ education, workExperience, information, projects, customFields, summary, skills, height = 'auto', width = '80%', isEdit = false, resumeDataId, resumeId, onDelete }) => {

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
        <Container >
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Box mb={3} textAlign="center">
              <Typography variant="h4" component="h1" sx={{ color: '#8e44ad', fontWeight: 'bold' }} gutterBottom>
                {information?.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {information?.address} • {information?.email} • {information?.phone}`
              </Typography>
            </Box>

            <Section>
              <Divider sx={{
                backgroundColor: '#D3D3D3',
                padding: 0.1
              }} />
              <SectionHeader variant="h5">SUMMARY</SectionHeader>
              {
                summary?.map((summary, index) => (
                  <Typography key={`summ-${index}`} variant="body2">
                    {summary.title}
                  </Typography>
                ))
              }
            </Section>



            <Section>
              <Divider sx={{
                backgroundColor: '#D3D3D3',
                padding: 0.1
              }} />
              <SectionHeader variant="h5">WORK EXPERIENCE</SectionHeader>
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
              <Divider sx={{
                backgroundColor: '#D3D3D3',
                padding: 0.1
              }} />
              <SectionHeader variant="h5">EDUCATION</SectionHeader>
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
              <Divider sx={{
                backgroundColor: '#D3D3D3',
                padding: 0.1
              }} />
              <SectionHeader variant="h6">PROJECTS</SectionHeader>
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
              <Divider sx={{
                backgroundColor: '#D3D3D3',
                padding: 0.1
              }} />
              <SectionHeader variant="h6">SKILLS</SectionHeader>
              {
                skills?.map((data, index) => (
                  <Box key={`skill-${index}`} mb={2}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <Divider sx={{
                backgroundColor: '#D3D3D3',
                padding: 0.1

              }} />

              {
                customFields?.map((data, index) => (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {data.heading}
                    </Typography>
                    <Divider sx={{
                      backgroundColor: '#D3D3D3',
                      padding: 0.1
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
              <Button variant="contained" onClick={() => navigate(`/preview/template?template=3&id=${resumeDataId}&resume=${resumeId}`)}>Edit</Button>
              <Button variant="contained" onClick={() => deleteResumeTemplate()}>Delete</Button>
            </Stack>
          )
        }
      </Box>
    </>
  )
}

export default Template3