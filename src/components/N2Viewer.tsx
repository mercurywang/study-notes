import { type FC, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Link,
  List,
  ListItemButton,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HeadphonesIcon from "@mui/icons-material/Headphones";

export interface N2Item {
  id: number;
  schedule: string;
  day: string;
  content: string;
  explanation: string;
  pdf_page?: number;
  audio_main?: string;
  audio_word?: string;
  youtube_url?: string[];
}

interface N2ViewerProps {
  data: N2Item[];
}

const PDF_PATH = "/assets/N2/N2文法会話テキスト.pdf";

const N2Viewer: FC<N2ViewerProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0: PDF, 1: Detail
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Breakpoint at Large for split view

  const activeItem = data[selectedIndex];

  // Logic to determine PDF Page
  // The PDF likely has an offset. Usually p1 in text is p1 in PDF, but cover pages exist.
  // Assuming a cover page offset of +2 (Cover + Table of Contents usually)
  // Or the user can fine tune. Let's start with direct mapping.
  const pageNumber = activeItem?.pdf_page || 1;
  const pdfUrl = `${PDF_PATH}#page=${pageNumber + 2}`; // Adding arbitrary offset +2 for covers

  useEffect(() => {
    // When selection changes on mobile, switch to detail tab?
    // Maybe keep user context.
  }, [selectedIndex]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const SidebarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box p={2} borderBottom="1px solid #f0f0f0" bgcolor="#fafafa">
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          N2 文法会話
        </Typography>
        <Typography variant="caption" color="text.secondary">
          全 {data.length} 课 | 结合教材学习
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
        {data.map((item, idx) => (
          <ListItemButton
            key={item.id}
            selected={selectedIndex === idx}
            onClick={() => {
              setSelectedIndex(idx);
              setMobileOpen(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              borderLeft:
                selectedIndex === idx
                  ? "4px solid #1976d2"
                  : "4px solid transparent",
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={selectedIndex === idx ? "bold" : "regular"}
                color={selectedIndex === idx ? "primary" : "textPrimary"}
              >
                {item.schedule}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                noWrap
              >
                p.{item.pdf_page}
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const LessonDetail = (
    <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
        {activeItem.schedule}
      </Typography>

      {/* Audio Players */}
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 3, bgcolor: "#f5f5f5", borderRadius: 3 }}
      >
        <Typography
          variant="subtitle2"
          gutterBottom
          display="flex"
          alignItems="center"
          gap={1}
        >
          <HeadphonesIcon fontSize="small" /> 音频资料
        </Typography>

        {activeItem.audio_main ? (
          <Box mb={2}>
            <Typography variant="caption" color="text.secondary">
              课文对话
            </Typography>
            <audio
              controls
              src={activeItem.audio_main}
              style={{ width: "100%", height: "40px" }}
            />
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 1 }}>
            暂无课文音频
          </Alert>
        )}

        {activeItem.audio_word && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              单词领读
            </Typography>
            <audio
              controls
              src={activeItem.audio_word}
              style={{ width: "100%", height: "40px" }}
            />
          </Box>
        )}
      </Paper>

      {/* Overview */}
      <Box mb={3}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ borderBottom: "2px solid #eee", pb: 1 }}
        >
          本课重点
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: activeItem.content }}
          sx={{
            "& strong": { color: "#1976d2" },
            lineHeight: 1.8,
          }}
        />
      </Box>

      {/* Explanation */}
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ borderBottom: "2px solid #eee", pb: 1 }}
        >
          详细解说
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: activeItem.explanation }}
          sx={{
            lineHeight: 1.8,
            "& strong": {
              color: "#333",
              display: "block",
              mt: 2,
              mb: 1,
              fontWeight: "bold",
            },
          }}
        />
      </Box>

      {activeItem.youtube_url && activeItem.youtube_url.length > 0 && (
        <Box mt={4}>
          <Link
            href={activeItem.youtube_url[0]}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#ffebee",
              color: "#d32f2f",
              px: 2,
              py: 1,
              borderRadius: 4,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <PlayCircleOutlineIcon /> 观看视频讲解
          </Link>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 100px)",
        overflow: "hidden",
        bgcolor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
      }}
    >
      {/* Sidebar Drawer for Mobile */}
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
          width: 220,
          borderRight: "1px solid #e0e0e0",
          display: { xs: "none", md: "block" },
          flexShrink: 0,
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
          minWidth: 0,
        }}
      >
        {/* Mobile Header */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            p: 1,
            borderBottom: "1px solid #eee",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <MenuOpenIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {activeItem.schedule}
          </Typography>
        </Box>

        {/* Layout: Split vs Tabs */}
        {isMobile ? (
          <>
            <Tabs
              value={tabValue}
              onChange={(_, v) => setTabValue(v)}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab icon={<PictureAsPdfIcon />} label="教材 (PDF)" />
              <Tab icon={<HeadphonesIcon />} label="讲解 & 音频" />
            </Tabs>
            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
              {tabValue === 0 && (
                <iframe
                  key={pdfUrl} // Key forces reload on url change to ensure jump
                  src={pdfUrl}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                />
              )}
              {tabValue === 1 && LessonDetail}
            </Box>
          </>
        ) : (
          <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
            {/* PDF Area - Takes 60% */}
            <Box
              sx={{
                flex: 6,
                borderRight: "1px solid #e0e0e0",
                position: "relative",
              }}
            >
              <iframe
                key={pdfUrl}
                src={pdfUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Textbook PDF"
              />
              {/* Floating Page Indicator */}
              <Chip
                label={`Using Browser PDF Viewer - Jumping to p.${pageNumber}`}
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  opacity: 0.7,
                }}
              />
            </Box>

            {/* Lesson Detail Right Panel - Takes 40% */}
            <Box sx={{ flex: 2, height: "100%", overflow: "hidden" }}>
              {LessonDetail}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default N2Viewer;
