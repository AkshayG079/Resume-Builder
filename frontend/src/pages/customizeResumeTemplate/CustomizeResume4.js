import { useEffect, useState } from 'react'
import { Button, TextField, Grid, Typography, Box, Stack } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DataState } from '../../context/Contextprovider';

const CustomizeResume4 = () => {

  const { ResumeData, setResumeData } = DataState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateNumber = parseInt(searchParams.get('template'));
  const resumeDataId = searchParams.get('id')
  const resumeId = searchParams.get('resume')

  const [information, setInformation] = useState(() => ResumeData?.information || { name: '', address: '', phone: '', email: '' });
  const [education, setEducation] = useState(() => ResumeData?.education || [{ collegeName: '', startDate: '', endDate: '', courseName: '', description: '' }]);
  const [workExperience, setWorkExperience] = useState(() => ResumeData?.workExperience || [{ title: '', description: '' }]);
  const [projects, setProjects] = useState(() => ResumeData?.projects || [{ title: '', description: '' }]);
  const [skills, setSkills] = useState(() => ResumeData?.skills || [{ title: '' }]);
  const [customFields, setCustomFields] = useState(() => ResumeData?.customFields || []);
  const [summary, setSummary] = useState(() => ResumeData?.summary || [{ title: '' }]);

  useEffect(() => {
    const resumeDetails = {
      information,
      education,
      workExperience,
      projects,
      customFields,
      skills,
      summary,
    };
    setResumeData(resumeDetails);
  }, [information, education, workExperience, projects, customFields, skills, summary, setResumeData]);

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;

    switch (field) {
      case 'Information':
        setInformation((prev) => ({ ...prev, [name]: value }));
        break;
      case 'Summary':
        setSummary((prev) => {
          const updatedSummary = [...prev];
          updatedSummary[index] = { ...updatedSummary[index], [name]: value };
          return updatedSummary;
        });
        break;
      case 'Education':
        setEducation((prev) => {
          const updatedEducation = [...prev];
          updatedEducation[index] = { ...updatedEducation[index], [name]: value };
          return updatedEducation;
        });
        break;
      case 'Project':
        setProjects((prev) => {
          const updatedProjects = [...prev];
          updatedProjects[index] = { ...updatedProjects[index], [name]: value };
          return updatedProjects;
        });
        break;
      case 'Skills':
        setSkills((prev) => {
          const updatedSkills = [...prev];
          updatedSkills[index] = { ...updatedSkills[index], [name]: value };
          return updatedSkills;
        });
        break;
      case 'WorkExperience':
        setWorkExperience((prev) => {
          const updatedWorkExperience = [...prev];
          updatedWorkExperience[index] = { ...updatedWorkExperience[index], [name]: value };
          return updatedWorkExperience;
        });
        break;
      case 'CustomFields':
        setCustomFields((prev) => {
          const updatedFields = [...prev];
          updatedFields[index] = { ...updatedFields[index], [e.target.name]: value };
          return updatedFields;
        });
        break;

      default:
        console.error('Unknown field type');
        break;
    }
  };

  const addColumn = (section, setSection, field) => {
    switch (field) {
      case 'Education':
        setSection([...section, { collegeName: '', startDate: '', endDate: '', description: '' }]);
        break;
      case 'Summary':
        setSection([...section, { title: '' }]);
        break;
      case 'Skills':
        setSection([...section, { title: '' }]);
        break;
      case 'WorkExperience':
        setSection([...section, { title: '', description: '' }]);
        break;
      case 'Projects':
        setSection([...section, { title: '', description: '' }]);
        break;
      case 'CustomFeild':
        if (customFields?.length === 0) {
          setSection([{ title: '', description: '', heading: '' }]);
        } else {
          setSection([...section, { title: '', description: '', heading: '' }]);
        }
        break;
      default:
        console.error('Unknown field:', field);
    }
  };

  const deleteColumn = (index, section, setSection) => {
    const updatedSection = section.filter((_, i) => i !== index);
    setSection(updatedSection);
  };

  const handleNextPage = () => {
    setResumeData((prev) => ({ ...prev, template: templateNumber }))
    if (resumeDataId) {
      navigate(`/preview/template?template=4&id=${resumeDataId}&resume=${resumeId}&editable=true`);
    } else {
      navigate(`/preview/template?template=4`);
    }
  };

  return (
    <>
      <form>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">Add Personal Information</Typography>
          <Stack direction='row' spacing={2}>
            <Grid container spacing={2} sx={{ mt: 2 }} flexBasis='70%'>
              <Grid item xs={12} sm={10}>
                <TextField fullWidth multiline label="Full Name" variant="outlined" value={information.name || ''} name="name" required onChange={(e) => handleInputChange(e, '', "Information")} />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField fullWidth multiline label="Phone" variant="outlined" value={information.phone || ''} name="phone" required type="tel" onChange={(e) => handleInputChange(e, '', "Information")} />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField fullWidth multiline label="Email" variant="outlined" value={information.email || ''} name="email" required type="email" onChange={(e) => handleInputChange(e, '', "Information")} />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField fullWidth multiline label="Address" variant="outlined" value={information.address || ''} name="address" required onChange={(e) => handleInputChange(e, '', "Information")} />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField fullWidth multiline label="job Role" variant="outlined" value={information.jobTitle || ''} name="jobTitle" required onChange={(e) => handleInputChange(e, '', "Information")} />
              </Grid>
            </Grid>
          </Stack>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">Education</Typography>
          {education.map((edu, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth multiline name='collegeName' value={'' || edu.collegeName} label="College Name" onChange={(e) => handleInputChange(e, index, "Education")} variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth multiline name='startDate' value={'' || edu.startDate} label="Start Date" onChange={(e) => handleInputChange(e, index, "Education")} variant="outlined" type="month" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth multiline name='endDate' value={'' || edu.endDate} label="End Date" onChange={(e) => handleInputChange(e, index, "Education")} variant="outlined" type="month" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth multiline name='courseName' value={'' || edu.courseName} label="Course" onChange={(e) => handleInputChange(e, index, "Education")} variant="outlined" type="text" />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField fullWidth multiline name='description' value={'' || edu.description} label="Description" onChange={(e) => handleInputChange(e, index, "Education")} variant="outlined" type="text" />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  index !== 0 &&
                  <Button variant="outlined" color="error" onClick={() => deleteColumn(index, education, setEducation)}>
                    Delete
                  </Button>
                }
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={() => addColumn(education, setEducation, 'Education')} sx={{ mt: 2 }}>Add Column</Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">Summary</Typography>
          {summary.map((item, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={10}>
                <TextField
                  fullWidth
                  multiline
                  label='Summary'
                  variant="outlined"
                  name='title'
                  value={item.title}
                  onChange={(e) => handleInputChange(e, index, "Summary")}
                />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  index !== 0 &&
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteColumn(index, summary, setSummary)}
                  >
                    Delete
                  </Button>
                }
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            onClick={() => addColumn(summary, setSummary, 'Summary')}
            sx={{ mt: 2 }}
          >
            Add Column
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">Work Experience</Typography>
          {workExperience.map((work, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth multiline label="Title" variant="outlined" name="title" value={work.title || ''} onChange={(e) => handleInputChange(e, index, "WorkExperience")} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth multiline label="Description" variant="outlined" name="description" value={work.description || ''} onChange={(e) => handleInputChange(e, index, "WorkExperience")} />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  index !== 0 &&
                  <Button variant="outlined" color="error" onClick={() => deleteColumn(index, workExperience, setWorkExperience)}>
                    Delete
                  </Button>
                }
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={() => addColumn(workExperience, setWorkExperience, 'WorkExperience')} sx={{ mt: 2 }}>Add Column</Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">Projects</Typography>
          {projects.map((project, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth multiline label="Title" variant="outlined" name="title" value={project.title || ''} onChange={(e) => handleInputChange(e, index, "Project")} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth multiline label="Description" variant="outlined" name="description" value={project.description || ''} onChange={(e) => handleInputChange(e, index, "Project")} />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  index !== 0 &&
                  <Button variant="outlined" color="error" onClick={() => deleteColumn(index, projects, setProjects)}>
                    Delete
                  </Button>
                }
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={() => addColumn(projects, setProjects, 'Projects')} sx={{ mt: 2 }}>Add Column</Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">Skills</Typography>
          {skills.map((skill, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={8}>
                <TextField fullWidth multiline label="Title" variant="outlined" name="title" value={skill.title || ''} onChange={(e) => handleInputChange(e, index, "Skills")} />
              </Grid>
              <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  index !== 0 &&
                  <Button variant="outlined" color="error" onClick={() => deleteColumn(index, skills, setSkills)}>
                    Delete
                  </Button>
                }
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={() => addColumn(skills, setSkills, 'Skills')} sx={{ mt: 2 }}>Add Column</Button>
        </Box>


        {customFields.map((field, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                multiline
                label="Heading"
                variant="outlined"
                name='heading'
                value={field.heading}
                onChange={(e) => handleInputChange(e, index, "CustomFields")}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                multiline
                label="Title"
                name='title'
                variant="outlined"
                value={field.title}
                onChange={(e) => handleInputChange(e, index, "CustomFields")}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                multiline
                label="Description"
                variant="outlined"
                name='description'
                value={field.description}
                onChange={(e) => handleInputChange(e, index, "CustomFields")}
              />
            </Grid>
            <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteColumn(index, customFields, setCustomFields)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}

        <Button variant="outlined" onClick={() => addColumn(customFields, setCustomFields, 'CustomFeild')} sx={{ mb: 4 }}>
          Add Custom Field
        </Button>

        <Button fullWidth variant="contained" size="large" onClick={handleNextPage}>Next</Button>
      </form>
    </>
  )
}

export default CustomizeResume4