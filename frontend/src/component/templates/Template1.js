import { Box, Typography, ListItemText, Divider, Paper, Container, Button, Stack } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import profile from '../../asset/profile.png';

const Template1 = ({
  education, workExperience, information, projects, certificates, skills, customFields, summary, height = 'auto', width = '80%', isEdit = false, resumeDataId, resumeId, onDelete }) => {

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
          boxSizing: 'border-box',
        }}
      >
        <Container >
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <header style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
              <img
                src={information?.pic || profile}
                alt="Benjamin Shah"
                width={150}
                height={150}
                style={{ borderRadius: '8px', marginRight: '24px' }}
              />
              <div>
                <Typography variant="h4" component="h1" gutterBottom color="primary">
                  {information?.name}
                </Typography>
                <Typography variant="body1"><strong>Email:</strong>{information?.email}</Typography>
                <Typography variant="body1"><strong>Phone:</strong>{information?.phone}</Typography>
                <Typography variant="body1"><strong>Address:</strong>{information?.address}</Typography>
              </div>
            </header>

            <section style={{ marginBottom: '24px' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                SUMMARY
              </Typography>
              <Divider sx={{
                backgroundColor: '#1976d2',
                padding: 0.1
              }} />
              {
                summary?.map((summary, index) => (
                  <Typography key={`summary-${index}`} variant="body1">
                    {summary.title}
                  </Typography>
                ))
              }

            </section>

            <section style={{ marginBottom: '24px' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                WORK EXPERIENCE
              </Typography>
              <Divider sx={{
                backgroundColor: '#1976d2',
                padding: 0.1
              }} />
              {
                workExperience?.map((data, index) => (
                  <Box key={`work-${index}`} mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                EDUCATION
              </Typography>
              <Divider sx={{
                backgroundColor: '#1976d2',
                padding: 0.1
              }} />
              {
                education?.map((data, index) => (
                  <Box key={`edu-${index}`} mb={1}>
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
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                PROJECT
              </Typography>
              <Divider sx={{
                backgroundColor: '#1976d2',
                padding: 0.1
              }} />
              {
                projects?.map((data, index) => (
                  <Box key={`proj-${index}`} mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                SKILL
              </Typography>
              <Divider sx={{
                backgroundColor: '#1976d2',
                padding: 0.1
              }} />
              {
                skills?.map((data, index) => (
                  <Box key={`skill-${index}`} mb={1} pl={1}>
                    <ListItemText primary={`${data.title}`} />
                  </Box>
                ))
              }
            </section>
            <section style={{ marginBottom: '24px' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                CERTIFICATES
              </Typography>
              <Divider sx={{
                backgroundColor: '#1976d2',
                padding: 0.1
              }} />
              {
                certificates?.map((data, index) => (
                  <Box key={`cert-${index}`} mb={1}>
                   <Typography variant="subtitle1" fontWeight="bold">
                      {data.title}
                    </Typography>
                    <ListItemText primary={`${data.description}`} />
                  </Box>
                ))
              }
            </section>
            <section style={{ marginBottom: '24px' }}>
              {
                customFields?.map((data, index) => (
                  <>
                    <Typography key={index + 1} variant="h6" color="primary" gutterBottom>
                      {data.heading}
                    </Typography>
                    <Divider key={index + 2} sx={{
                      backgroundColor: '#1976d2',
                      padding: 0.1
                    }} />
                    <Box key={index + 3} mb={1}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {data.title}
                      </Typography>
                      <ListItemText primary={`${data.description}`} />
                    </Box>
                  </>
                ))
              }
            </section>
          </Paper>
        </Container>

        {
          isEdit && (
            <Stack direction='row' justifyContent='center' mt={2} spacing={1}>
              <Button variant="contained" onClick={() => navigate(`/preview/template?template=1&id=${resumeDataId}&resume=${resumeId}`)}>Edit</Button>
              <Button variant="contained" onClick={() => deleteResumeTemplate()}>Delete</Button>
            </Stack>
          )
        }
      </Box>
    </>
  )
}

export default Template1