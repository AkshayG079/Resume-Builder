import { Box, Stack, Typography, Button, Avatar } from '@mui/material';
import Header from '../component/Header';
import Footer from '../component/Footer';
import template1 from '../asset/templates/template1.png';
import template2 from '../asset/templates/template2.png';
import template3 from '../asset/templates/template3.png';
import laptop from '../asset/laptop.jpeg';
import score from '../asset/score.png';
import banner from '../asset/banner_icon.png';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Box px={4} py={3} backgroundColor='#F0F8FF'>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems='center'
                    width='100%'
                    my={10}
                >
                    <Box flexBasis='60%' marginLeft={8}>
                        <Typography variant="h1" fontWeight="bold" gutterBottom>
                            Free Online<br />Resume Builder
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ paddingX: 10, paddingY: 1, fontSize: '1.25rem' }} onClick={() => navigate('/templates')}>
                            Create My Resume
                        </Button>
                    </Box>
                    <Box flexBasis='40%'>
                        <img
                            src={laptop}
                            alt="Laptop with resume"
                            width='400px'
                            height='350px'
                        />
                    </Box>
                </Stack>

                <Stack direction='row' alignItems='center' justifyContent='center' spacing={4} width='80%' margin='auto'>
                    <img
                        src={template1}
                        alt="Laptop with resume"
                        width='320px'
                        height='500px'
                    />
                    <img
                        src={template2}
                        alt="Laptop with resume"
                        width='320px'
                        height='500px'
                    />
                    <img
                        src={template3}
                        alt="Laptop with resume"
                        width='320px'
                        height='500px'
                    />
                </Stack>

                <Stack
                    sx={{
                        margin: '5rem 0'
                    }}
                    direction='row'
                    justifyContent='space-between'
                    spacing={2}
                    alignItems="center"
                    width='100%'
                >
                    <Box flexBasis='50%' margin='auto'>
                        <img
                            src={banner}
                            alt="Resume samples"
                            width='100%'
                            height='100%'
                        />
                    </Box>
                    <Stack spacing={1} flexBasis='35%'>
                        <Typography variant="h2" fontWeight={500}>
                            Just three<br />simple steps
                        </Typography>
                        <Stack spacing={2}>
                            <Stack direction='row' alignItems='center' spacing={3}>
                                <Avatar sx={{ width: 40, height: 40 }}>1</Avatar>
                                <Typography variant="h6"><b>Select</b> a template from our library of professional designs</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' spacing={3}>
                                <Avatar sx={{ width: 40, height: 40 }}>2</Avatar>
                                <Typography variant="h6"><b>Build</b> your resume with our industry-specific bullet points</Typography>
                            </Stack>
                            <Stack direction='row' alignItems='center' spacing={3}>
                                <Avatar sx={{ width: 40, height: 40 }}>3</Avatar>
                                <Typography variant="h6"><b>Download</b> your resume, print it out, and get it ready to send!</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={2}
                    alignItems="center"
                    margin={10}
                >
                    <Box flexBasis='60%' >
                        <Typography variant="h1" fontWeight="bold">
                            Is your resume<br />good enough?
                        </Typography>

                        <Button variant="contained" color="primary" sx={{ marginTop: 2, padding: "0.55rem 2rem", fontSize: '1.25rem' }} onClick={() => navigate('/resumeScan')}>
                            Scan your resume
                        </Button>
                    </Box>
                    <Box flexBasis='40%'>
                        <img
                            src={score}
                            alt="Resume scanner"
                            width='100%'
                            height='100%'
                        />
                    </Box>
                </Stack>
            </Box >
            <Footer />

        </>
    )
}

export default Home