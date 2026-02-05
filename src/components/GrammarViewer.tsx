import { type FC, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Link,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

export interface GrammarItem {
  course_name: never;
  id: number;
  schedule: string;
  day: string;
  content: string;
  explanation: string;
  youtube_url?: string[];
}

interface GrammarViewerProps {
  data: GrammarItem[];
  title: string;
}

const GrammarViewer: FC<GrammarViewerProps> = ({ data, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const activeItem = data[selectedIndex];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const SidebarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box p={2} borderBottom="1px solid #f0f0f0">
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          共 {data.length} 课
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
        {data.map((item, idx) => (
          <ListItemButton
            key={item.id}
            selected={selectedIndex === idx}
            onClick={() => {
              setSelectedIndex(idx);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                borderLeft: "4px solid #1976d2",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.12)",
                },
              },
            }}
          >
            <ListItemText
              primary={item.schedule}
              secondary={item.day ? item.day.split(" ")[0] : ""}
              primaryTypographyProps={{
                fontWeight: selectedIndex === idx ? "bold" : "medium",
                color: selectedIndex === idx ? "primary.main" : "text.primary",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 140px)", // Adapt to parent container
        gap: 0,
        backgroundColor: "#f5f7fa",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {SidebarContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 280,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        {SidebarContent}
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* Header Toolbar */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <Box display="flex" alignItems="center">
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuOpenIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {activeItem?.schedule || "Select a lesson"}
            </Typography>
            {activeItem?.course_name && (
              <Chip
                label="课程"
                size="small"
                sx={{ ml: 2, backgroundColor: "#e3f2fd", color: "#1976d2" }}
              />
            )}
          </Box>

          {activeItem?.youtube_url && activeItem.youtube_url.length > 0 && (
            <Link
              href={activeItem.youtube_url[0]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                color: "#d32f2f",
                fontWeight: 600,
                border: "1px solid #ffebee",
                padding: "4px 12px",
                borderRadius: "16px",
                "&:hover": { backgroundColor: "#ffebee" },
              }}
            >
              <PlayCircleOutlineIcon fontSize="small" />
              观看视频
            </Link>
          )}
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 4,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "#bdbdbd",
              borderRadius: "3px",
            },
          }}
        >
          {activeItem ? (
            <Box maxWidth="800px" margin="0 auto">
              {/* Summary Section */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  borderRadius: 2,
                  "& strong": { color: "#1565c0" },
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  本课概览
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: activeItem.content }} />
              </Paper>

              {/* Detail Section */}
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    pb: 1,
                    borderBottom: "2px solid #f0f0f0",
                  }}
                >
                  详细讲解
                </Typography>

                <Box
                  className="grammar-explanation-content"
                  sx={{
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    color: "#333",
                    // Typography optimizations
                    "& strong": {
                      color: "#1976d2",
                      display: "block",
                      marginTop: "24px",
                      marginBottom: "12px",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      borderLeft: "4px solid #1976d2",
                      paddingLeft: "12px",
                      background:
                        "linear-gradient(90deg, rgba(25,118,210,0.05) 0%, rgba(255,255,255,0) 100%)",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    },
                    "& ruby": {
                      rubyPosition: "over",
                    },
                    "& rt": {
                      fontSize: "0.6em",
                      color: "#757575",
                      userSelect: "none",
                    },
                    "& audio": {
                      display: "block",
                      margin: "16px 0",
                      width: "100%",
                      height: "40px",
                      borderRadius: "20px",
                    },
                    // Collapse redundant breaks
                    "& br + br": {
                      display: "none",
                    },
                    // Add subtle list styling for bullet points (・)
                    // Note: This relies on text structure, might be fragile, but generally helpful
                  }}
                  dangerouslySetInnerHTML={{ __html: activeItem.explanation }}
                />
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              请选择一课进行学习
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GrammarViewer;
