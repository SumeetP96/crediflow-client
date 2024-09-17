import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { INavLink } from '../constants/nav-links';

export interface INavList {
  onClick: () => void;
  listProps?: ListProps;
  navLinks?: INavLink[];
  isNested?: boolean;
}

function NestedNav({ onClick, listProps, navLinks = [], isNested = false }: INavList) {
  const location = useLocation();

  const navigate = useNavigate();

  const isLinkActive = (link: string): boolean => {
    return location.pathname.startsWith(link);
  };

  const [openIds, setOpenIds] = useState<string[]>([]);

  return (
    <List component="nav" {...(listProps || {})}>
      {navLinks.map((link) => {
        const hasChildren = link.children && link.children.length > 0;
        const isOpen =
          openIds.includes(link.id) ||
          (isLinkActive(String(link.to)) && location.pathname !== link.to);
        const isActive = isLinkActive(String(link.to)) || isOpen;

        return (
          <Fragment key={link.label}>
            <ListItemButton
              selected={isActive}
              onClick={() => {
                if (hasChildren) {
                  if (isOpen) {
                    setOpenIds((prev) => prev.filter((id) => id !== link.id));
                  } else {
                    setOpenIds((prev) => [...prev, link.id]);
                  }
                }

                if (link.to) {
                  navigate(link.to);
                }

                onClick();
              }}
              sx={{
                pl: isNested ? 4 : 'auto',
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
              {hasChildren ? <>{isOpen ? <ExpandLess /> : <ExpandMore />}</> : null}
            </ListItemButton>

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
          </Fragment>
        );
      })}
    </List>
  );
}

export default NestedNav;
