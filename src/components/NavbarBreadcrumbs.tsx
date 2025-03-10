import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { MenuItem } from './common/menu';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    // to avoid handling theme provider for tests separately.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    color: (theme as any).vars?.palette.action.disabled || theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

interface NavbarBreadcrumbsProps {
  menuItems :  MenuItem | undefined
}

const NavbarBreadcrumbs = (props:  NavbarBreadcrumbsProps) => {

  const {menuItems} = props
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {menuItems?.text}
      </Typography>
    </StyledBreadcrumbs>
  )
}
export default NavbarBreadcrumbs