import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';

const AtsReport = ({  conclusion, strengths, weaknesses, improvements, overallRecommendations, additionalTips, }) => {
    return (
        <Box sx={{ padding: 2 }}>

            <Divider />
            <Typography variant="h5" my={1}>
                Strengths
            </Typography>

            {strengths?.length && (
                strengths.map((strength, index) => {
                    return (
                        <Stack key={index} textAlign='start' >
                            <Typography variant="subtitle1" mt={1}>
                                <strong>{strength.title}</strong>
                            </Typography>
                            <Typography variant="subtitle2" >
                                {strength.description}
                            </Typography>
                        </Stack>
                    );
                })
            )}

            <Divider sx={{ marginTop: 2 }} />
            <Typography variant="h5" my={1}>
                Weaknesses
            </Typography>

            {weaknesses?.length && (
                weaknesses.map((weakness, index) => {
                    return (
                        <Stack key={index} textAlign='start' >
                            <Typography variant="subtitle1" mt={1}>
                                <strong>{weakness.title}</strong>
                            </Typography>
                            <Typography variant="subtitle2" >
                                {weakness.description}
                            </Typography>
                        </Stack>

                    );
                })
            )}

            <Divider sx={{ marginTop: 2 }} />
            <Typography variant="h5" my={1}>
                Improvements
            </Typography>
            {['keywordOptimization', 'formatting', 'content'].map((category) => (
                <Box key={category} textAlign='start'>
                    <Typography variant="h6" my={1}>
                        {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                    </Typography>

                    {improvements[category]?.length && (
                        improvements[category].map((item, index) => (
                            <Box key={index}>
                                <Typography variant="body1" >
                                    {`${1 + index}. ${item}`}
                                </Typography>
                            </Box>
                        ))
                    )}

                </Box>
            ))}

            <Divider sx={{ marginTop: 2 }} />
            <Typography variant="h5" my={1}>
                Overall Recommendations
            </Typography>

            {overallRecommendations?.length && (
                overallRecommendations.map((item, index) => (
                    <Box key={index} textAlign='start'>
                        <Typography variant="body1" >
                            {`${1 + index}. ${item}`}
                        </Typography>
                    </Box>
                ))
            )}

            <Divider sx={{ marginTop: 2 }} />
            <Typography variant="h5" my={1}>
                Additional Tips
            </Typography>

            {additionalTips?.length && (
                additionalTips.map((item, index) => (
                    <Box key={index} textAlign='start'>
                        <Typography variant="body1" >
                            {`${1 + index}. ${item}`}
                        </Typography>
                    </Box>
                ))
            )}

            <Divider sx={{ marginTop: 2 }} />
            <Typography variant="h5" my={1}>
                Conclusion
            </Typography>
            <Typography variant="body1">
                {conclusion || "No conclusion available."}
            </Typography>
        </Box>
    );
};

export default AtsReport;
