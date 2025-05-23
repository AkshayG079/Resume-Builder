import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  ListItem,
  ListItemText,
  Button,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';

const SectionHeader = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(5),
  marginBottom: theme.spacing(1),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Template5 = ({ education, workExperience, information, interests, skills, customFields, height = 'auto', width = '80%', isEdit = false, resumeDataId, resumeId, onDelete, summary }) => {

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
          <Paper elevation={3} sx={{ py: 4, mt: 4 }}>
            <Box mb={3} pl={5}>
              <Typography variant="h4" component="h1" gutterBottom>
                {information?.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`${information?.address} | ${information?.email} | ${information?.phone}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {information?.jobTitle}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {information?.jobDesc}
              </Typography>
            </Box>

            <Section>
              <SectionHeader variant="h6">SUMMARY</SectionHeader>
              {
                summary?.map((data, index) => (
                  <Box mb={1} pl={5} key={`work-${index}`}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </Section>
            <Section>
              <SectionHeader variant="h6">WORK EXPERIENCE</SectionHeader>
              {
                workExperience?.map((data, index) => (
                  <Box mb={2} pl={5} key={`work-${index}`}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionHeader variant="h6">SKILLS</SectionHeader>
              {
                skills?.map((data, index) => (
                  <Box mb={2} pl={5} key={`skill-${index}`}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionHeader variant="h6">EDUCATION</SectionHeader>
              {
                education?.map((data, index) => (
                  <Box mb={1} pl={5} key={`edu-${index}`}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data?.courseName}
                    </Typography>
                    <Typography variant="body2">
                      {data.collegeName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`${data.startDate} - ${data.endDate}`}
                    </Typography>
                    <ListItem>
                      <ListItemText primary={`${data.description}`} />
                    </ListItem>
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionHeader variant="h6">INTERESTS</SectionHeader>
              {
                interests?.map((data, index) => (
                  <Box mb={1} pl={5} key={`interest-${index}`}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </Section>
            <Section>
              {
                customFields?.map((data, index) => (
                  <>
                    <SectionHeader variant="h6">{data.heading}</SectionHeader>
                    <Box mb={1} pl={5} key={`cust-${index}`}>
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
              <Button variant="contained" onClick={() => navigate(`/preview/template?template=5&id=${resumeDataId}&resume=${resumeId}`)}>Edit</Button>
              <Button variant="contained" onClick={() => deleteResumeTemplate()}>Delete</Button>
            </Stack>
          )
        }
      </Box>
    </>
  )
}

export default Template5
