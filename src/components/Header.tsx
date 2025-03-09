import { Stack } from "@mui/material"
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown"

const Header = () => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        justifyContent: "right",
        alignItems: { xs: 'flex-start', md: 'center' },
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      {/* <NavbarBreadcrumbs /> */}
      <Stack direction="row">
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  )
}
export default Header