import { HelpOutlineOutlined, Menu as MenuIcon, SettingsOutlined } from '@mui/icons-material';
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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { MouseEvent, ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { axiosPost } from '../../api/request';
import { ApiRoutes } from '../../api/routes';
import UserAvatar from '../../assets/avatar-1.jpg';
import bankImage from '../../assets/bank.png';
import { AppRoute } from '../../router/helpers';
import { mainMenuLinks } from '../constants/nav-links';
import { profileMenuItems } from '../constants/profile-menu-items';
import useNavigateTo from '../hooks/use-navigate-to';
import NestedNav from './NestedNav';

export interface ISideNavAppBarLayout {
  children: ReactNode;
  appBarHeaderComponent: ReactNode;
}

const drawerWidth = 240;

const appName = import.meta.env.VITE_APP_NAME;

function SideNavAppBarLayout({ children, appBarHeaderComponent }: ISideNavAppBarLayout) {
  const { navigateTo } = useNavigateTo();

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(menuAnchorEl);

  const logoutQuery = useMutation({
    mutationKey: ['user-logout'],
    mutationFn: () => axiosPost(ApiRoutes.AUTH_LOGOUT),
    onSuccess: () => {
      window.location.reload();
    },
  });

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
            background: 'text.primary',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Toolbar>
            <IconButton
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

            <Box component="div" sx={{ flexGrow: 1 }}>
              {appBarHeaderComponent}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton size="small" sx={{ ml: 1, display: { xs: 'none', md: 'inline-flex' } }}>
                <HelpOutlineOutlined />
              </IconButton>

              <IconButton
                size="small"
                sx={{ ml: 1, display: { xs: 'none', md: 'inline-flex' } }}
                onClick={() => navigateTo(AppRoute('SETTINGS'))}
              >
                <SettingsOutlined />
              </IconButton>

              <IconButton onClick={handleProfileClick} sx={{ padding: 1, ml: 2 }}>
                <Avatar alt="User" src={UserAvatar} />
              </IconButton>

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
                    <MenuItem
                      key={item.id}
                      onClick={() => {
                        if (item.to) {
                          navigateTo(item.to);
                        }
                        handleMenuClose();
                        if (item.id === 'logout') {
                          logoutQuery.mutate();
                        }
                      }}
                    >
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
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={bankImage}
                  alt="brand-logo"
                  width={25}
                  style={{ marginRight: '0.675rem' }}
                />
                {appName}
              </NavLink>
            </Typography>
          </Toolbar>

          <NestedNav navLinks={mainMenuLinks} onClick={() => handleDrawerClose()} />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 2,
            pb: 3,
            px: { xs: 2, sm: 3, md: 4 },
            width: '100%',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default SideNavAppBarLayout;
