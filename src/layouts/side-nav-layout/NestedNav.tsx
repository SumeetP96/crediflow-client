import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
  ListSubheader,
} from '@mui/material';
import { produce } from 'immer';
import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { INavLink } from '../constants/nav-links';

export interface INavList {
  onClick: () => void;
  listProps?: ListProps;
  subHeader?: string;
  navLinks?: INavLink[];
  isNested?: boolean;
}

function NestedNav({ onClick, navLinks = [], isNested = false, listProps, subHeader }: INavList) {
  const location = useLocation();

  const navigate = useNavigate();

  const isLinkActive = (link: string): boolean => {
    return location.pathname.startsWith(link);
  };

  const [openIds, setOpenIds] = useState<string[]>([]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <List
        {...(listProps || {})}
        component="nav"
        sx={{
          width: '220px',
        }}
      >
        {subHeader ? <ListSubheader>{subHeader}</ListSubheader> : null}

        {navLinks.map((link) => {
          const hasChildren = link.children && link.children.length > 0;
          const isOpen = openIds.includes(link.id);
          const isActive = isLinkActive(String(link.to));
          const toggleCollapse = () => {
            setOpenIds(
              produce((draft) => {
                if (isOpen) {
                  draft = openIds.filter((id) => id !== link.id);
                } else {
                  draft = openIds.concat(link.id);
                }
                return draft;
              }),
            );
          };

          return (
            <Fragment key={link.label}>
              <ListItemButton
                selected={isActive}
                sx={{
                  mt: 0.5,
                  pl: isNested ? 4 : 'auto',
                  py: 0.75,
                  borderRadius: '8px',
                }}
                onClick={() => {
                  toggleCollapse();
                  if (link.to) {
                    navigate(link.to);
                  }
                  onClick();
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  {isActive ? link.activeIcon || link.icon : link.icon}
                </ListItemIcon>

                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 500 : 'inherit',
                    fontSize: '0.95rem',
                  }}
                />

                {hasChildren ? <>{isOpen ? <ExpandLess /> : <ExpandMore />}</> : null}
              </ListItemButton>

              {hasChildren ? (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <NestedNav
                    isNested
                    navLinks={link.children}
                    onClick={onClick}
                    listProps={{
                      component: 'div',
                      disablePadding: true,
                    }}
                  />
                </Collapse>
              ) : null}
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
}

export default NestedNav;
