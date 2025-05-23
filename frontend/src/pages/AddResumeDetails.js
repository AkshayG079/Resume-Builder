import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom';
import CustomizeResume1 from './customizeResumeTemplate/CustomizeResume1';
import CustomizeResume2 from './customizeResumeTemplate/CustomizeResume2';
import CustomizeResume3 from './customizeResumeTemplate/CustomizeResume3';
import CustomizeResume4 from './customizeResumeTemplate/CustomizeResume4';
import CustomizeResume5 from './customizeResumeTemplate/CustomizeResume5';
import CustomizeResume6 from './customizeResumeTemplate/CustomizeResume6';
import Header from '../component/Header';

const AddResumeDetails = () => {
    const [searchParams] = useSearchParams();
    const templateNumber = parseInt(searchParams.get('template'))
    const renderResumeComponent = () => {
        if (templateNumber === 1) {
            return <CustomizeResume1 />
        } else if (templateNumber === 2) {
            return <CustomizeResume2 />
        } else if (templateNumber === 3) {
            return <CustomizeResume3 />
        } else if (templateNumber === 4) {
            return <CustomizeResume4 />
        } else if (templateNumber === 5) {
            return <CustomizeResume5 />
        } else if (templateNumber === 6) {
            return <CustomizeResume6 />
        } else {
            return null
        }
    }

    return (
        <>
            <Header />
            <Box backgroundColor='#F0F8FF' p={10}>
                <>
                    {renderResumeComponent()}
                </>
            </Box>
        </>
    )
}

export default AddResumeDetails


