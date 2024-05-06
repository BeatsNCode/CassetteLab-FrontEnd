import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function AccountHomePage() {
    return (
        <Container>
            <Box
            height={200}
            width={600}
            display="flex"
            alignItems="center"
            margin="auto"
            gap={4}
            sx={{ border: '2px solid grey', marginTop:'100px' }}
            >
            
                <p style={{ paddingTop: "auto", margin: "auto", textAlign: "center" }}>
                This paragraph introduces the CassetteLab project
                and its purpose.<br/><br/>

                Add more info<br/><br/>

                Make it make sense.<br/><br/>

                Let's get it
                </p>
            
            </Box>
            <Box>
            </Box>
         </Container>

)};