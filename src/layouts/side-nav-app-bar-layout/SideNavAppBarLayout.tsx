import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
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
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import UserAvatar from '../../assets/avatar-1.jpg';
import { navLinks } from '../common/constants/nav-links';
import { profileMenuItems } from '../common/constants/profile-menu-items';

export interface ISideNavAppBarLayout {
  children: React.ReactNode;
}

const drawerWidth = 240;

function SideNavAppBarLayout({ children }: ISideNavAppBarLayout) {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const navigate = useNavigate();

  const location = useLocation();

  const isLinkActive = (link: string): boolean => {
    return location.pathname.startsWith(link);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

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

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(menuAnchorEl);

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
            >
              Permanent drawer
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
                {profileMenuItems.map((item) => (
                  <Fragment key={item.label}>
                    {item.hasDivider ? <Divider /> : null}
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                  </Fragment>
                ))}
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
                RTC Customers
              </NavLink>
            </Typography>
          </Toolbar>

          <Divider />

          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  selected={isLinkActive(link.to)}
                  onClick={() => {
                    navigate(link.to);
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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
