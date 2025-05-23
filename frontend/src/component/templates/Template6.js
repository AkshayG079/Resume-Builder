import { Container, Typography, Box, Paper, ListItemText, Divider, Button, Stack, } from '@mui/material';
import { styled } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';

const SectionHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  paddingLeft: theme.spacing(5),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Template6 = ({ education, workExperience, information, interests, skills, customFields, height = 'auto', width = '80%', isEdit = false, resumeDataId, resumeId, onDelete, summary }) => {

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
          <Paper elevation={3} sx={{ py: 4, mt: 4 }}>
            <Box mb={3} textAlign="center">
              <Typography variant="h4" component="h1" color='primary' >
                {information?.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`${information?.address} | ${information?.email} | ${information?.phone}`}
              </Typography>
            </Box>

            <Section>
              <SectionHeader variant="h5"> {information?.jobTitle}</SectionHeader>
              <Typography variant="body2" pl={5}>
                {information?.jobDesc}
              </Typography>
            </Section>
            <Section>
              <SectionHeader variant="h6">SUMMARY</SectionHeader>
              <Divider sx={{
                backgroundColor: 'grey.400',
                padding: 0.12
              }} />
              {
                summary?.map((data, index) => (
                  <Box mb={1} pl={5} key={`work-${index}`}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </Section>
            <Section>
              <SectionHeader variant="h5">WORK EXPERIENCE</SectionHeader>
              <Divider sx={{
                backgroundColor: 'grey.400',
                padding: 0.12
              }} />
              {
                workExperience?.map((data, index) => (
                  <Box mb={1} pl={5} key={`work-${index}`}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionHeader variant="h5">SKILLS</SectionHeader>
              <Divider sx={{
                backgroundColor: 'grey.400',
                padding: 0.12
              }} />
              {
                skills?.map((data, index) => (
                  <Box mb={1} pl={5} key={`skill-${index}`}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionHeader variant="h5">EDUCATION</SectionHeader>
              <Divider sx={{
                backgroundColor: 'grey.400',
                padding: 0.12
              }} />
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
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </Section>

            <Section>
              <SectionHeader variant="h5">INTERESTS</SectionHeader>
              <Divider sx={{
                backgroundColor: 'grey.400',
                padding: 0.12
              }} />
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
                    <Divider sx={{
                      backgroundColor: 'grey.400',
                      padding: 0.12
                    }} />
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
              <Button variant="contained" onClick={() => navigate(`/preview/template?template=6&id=${resumeDataId}&resume=${resumeId}`)}>Edit</Button>
              <Button variant="contained" onClick={() => deleteResumeTemplate()}>Delete</Button>
            </Stack>
          )
        }
      </Box>
    </>
  )
}

export default Template6