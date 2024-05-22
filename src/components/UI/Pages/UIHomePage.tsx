import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://Cassette-Lab.com/">
          CassetteLab
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


function Homepage() {

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
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                </p>
            
            </Box>
            <Box>
            </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />     
      </Container>
    );
}


export default Homepage
