import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function logMessage() {
    return (
        console.log("session started")

    )
}
logMessage()

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
            
                
            
            </Box>
            <Box>
            </Box>
         </Container>

)};