import { useState } from "react";
import { Box, CssBaseline, Toolbar, Typography, Paper } from "@mui/material";
import Sidebar from "./components/Sidebar";
import MarkdownViewer from "./components/MarkdownViewer";
import GrammarViewer from "./components/GrammarViewer";
import n4Data from "./data/n4.json";
import n3Data from "./data/n3.json";
import "./App.css";

interface SelectedNote {
  id: string;
  title: string;
  path?: string;
  dataType: "markdown" | "json";
  dataSource?: string;
}

const DRAWER_WIDTH = 260;

// 数据映射
const jsonDataMap: Record<string, { data: typeof n4Data; title: string }> = {
  n4: { data: n4Data, title: "N4 日语语法" },
  n3: { data: n3Data, title: "N3 日语语法" },
};

function App() {
  const [selectedNote, setSelectedNote] = useState<SelectedNote | null>(null);

  const handleSelectNote = (note: SelectedNote) => {
    setSelectedNote(note);
  };

  const renderContent = () => {
    if (!selectedNote) {
      return (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "white",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            📚 欢迎使用学习笔记
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            请从左侧菜单选择一个笔记开始阅读
          </Typography>
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              📁 笔记分类
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🇯🇵 日语 - N4 语法、N3 语法
            </Typography>
            <Typography variant="body2" color="text.secondary">
              💻 IT - 前端笔记、后端笔记
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🤖 AI - 机器学习、大语言模型
            </Typography>
          </Box>
        </Paper>
      );
    }

    if (selectedNote.dataType === "json" && selectedNote.dataSource) {
      const jsonInfo = jsonDataMap[selectedNote.dataSource];
      if (jsonInfo) {
        return (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: "white",
              minHeight: "calc(100vh - 120px)",
            }}
          >
            <GrammarViewer data={jsonInfo.data} title={jsonInfo.title} />
          </Paper>
        );
      }
    }

    if (selectedNote.dataType === "markdown" && selectedNote.path) {
      return (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "white",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          <MarkdownViewer filePath={selectedNote.path} />
        </Paper>
      );
    }

    return null;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar
        drawerWidth={DRAWER_WIDTH}
        onSelectNote={handleSelectNote}
        selectedId={selectedNote?.id || ""}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;
