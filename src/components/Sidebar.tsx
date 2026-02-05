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
}

const Sidebar: FC<SidebarProps> = ({
  drawerWidth,
  onSelectNote,
  selectedId,
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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        },
      }}
    >
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
      <Box sx={{ overflow: "auto", py: 1 }}>
        <List component="nav">
          {menuConfig.map((item) => renderMenuItem(item))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
