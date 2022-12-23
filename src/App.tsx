import './index.css';
import Menu from './components/menu';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '100vw', height: '100vh' }
}));

function App() {
  return (
    <Card
      sx={{
        backgroundColor: '#dffaff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Menu />
    </Card>
  );
}

export default App;
