import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserAvatar from '../../assets/avatar-1.jpg';
import { navLinks } from '../constants/nav-links';
import { profileMenuItems } from '../constants/profile-menu-items';
import NestedNav from './NestedNav';

export interface ISideNavAppBarLayout {
  children: React.ReactNode;
  appBarHeader: string;
}

const drawerWidth = 240;

function SideNavAppBarLayout({ children, appBarHeader }: ISideNavAppBarLayout) {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(menuAnchorEl);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleProfileClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          elevation={0}
          position="fixed"
          sx={{
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            ml: `${drawerWidth}px`,
            backgroundColor: 'transparent',
            color: 'black',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { lg: 'none' },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
              color="text.secondary"
            >
              {appBarHeader}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleProfileClick}>
                  <Avatar alt="User" src={UserAvatar} />
                </IconButton>
              </Tooltip>

              <Menu
                id="profile-menu"
                anchorEl={menuAnchorEl}
                open={isMenuOpen}
                onClick={handleMenuClose}
                onClose={handleMenuClose}
                keepMounted
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {profileMenuItems.map((item) => {
                  const components = [
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.label}</ListItemText>
                    </MenuItem>,
                  ];
                  if (item.hasDivider) {
                    components.unshift(<Divider />);
                  }
                  return components;
                })}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          anchor="left"
          variant={isDesktop ? 'permanent' : 'temporary'}
          open={isDesktop ? true : mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: !isDesktop,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              <NavLink
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {import.meta.env.VITE_APP_NAME}
              </NavLink>
            </Typography>
          </Toolbar>

          <Divider />

          <NestedNav navLinks={navLinks} onClick={() => handleDrawerClose()} />
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default SideNavAppBarLayout;
