import { FC, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Drawer,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { menuConfig } from "../config/menuConfig";

export interface SelectedNote {
  id: string;
  title: string;
  path?: string;
  dataType: "markdown" | "json";
  dataSource?: string;
}

interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  children?: MenuItem[];
  path?: string;
  dataType?: "markdown" | "json";
  dataSource?: string;
}

interface SidebarProps {
  drawerWidth: number;
  onSelectNote: (note: SelectedNote) => void;
  selectedId: string;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isDesktopOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({
  drawerWidth,
  onSelectNote,
  selectedId,
  mobileOpen,
  handleDrawerToggle,
  isDesktopOpen,
}) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    japanese: true,
    it: true,
    ai: true,
  });

  const handleToggle = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.id];
    const isSelected = item.id === selectedId;

    return (
      <Box key={item.id}>
        <ListItemButton
          onClick={() => {
            if (hasChildren) {
              handleToggle(item.id);
            } else {
              onSelectNote({
                id: item.id,
                title: item.title,
                path: item.path,
                dataType: item.dataType || "markdown",
                dataSource: item.dataSource,
              });
              // Close mobile drawer on selection
              if (mobileOpen) {
                handleDrawerToggle();
              }
            }
          }}
          sx={{
            pl: 2 + level * 2,
            backgroundColor: isSelected ? "action.selected" : "transparent",
            "&:hover": {
              backgroundColor: isSelected ? "action.selected" : "action.hover",
            },
          }}
        >
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontWeight: hasChildren ? 600 : 400,
              fontSize: hasChildren ? "0.95rem" : "0.9rem",
            }}
          />
          {hasChildren ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const drawerContent = (
    <div>
      <Toolbar
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Typography variant="h6" noWrap component="div" fontWeight={600}>
          📚 学习笔记
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto", py: 1 }}>
        <List component="nav">
          {menuConfig.map((item) => renderMenuItem(item))}
        </List>
      </Box>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: isDesktopOpen ? drawerWidth : 0 },
        flexShrink: { sm: 0 },
        transition: "width 0.2s ease-out",
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fafafa",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="persistent"
        open={isDesktopOpen}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fafafa",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
