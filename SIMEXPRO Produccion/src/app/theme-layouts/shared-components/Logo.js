import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <img className="logo-icon w-40 h-40" src="https://i.ibb.co/s2Zmg1j/logo.png" alt="logo" />

      <div
        className="badge flex items-center py-4 px-8 mx-8 rounded "
        style={{ backgroundColor: '#111827', color: '#61DAFB', marginLeft: '40px'}}
      >
        <img   
          className="react-badge"

        style={{marginTop: '5px', marginLeft:'-15px'}}
          src='https://i.ibb.co/HgdBM0r/slogan.png'
          alt="react"
          width="130"
        />
      </div>
    </Root>
  );  
}

export default Logo;