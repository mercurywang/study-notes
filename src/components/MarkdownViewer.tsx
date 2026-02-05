import { FC, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

interface MarkdownViewerProps {
  filePath: string;
}

const MarkdownViewer: FC<MarkdownViewerProps> = ({ filePath }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error("文件加载失败");
        }
        const text = await response.text();
        // 简单去除 Frontmatter
        const contentWithoutFrontmatter = text.replace(
          /^---\n[\s\S]*?\n---\n/,
          "",
        );
        setContent(contentWithoutFrontmatter);
      } catch (err) {
        setError(err instanceof Error ? err.message : "未知错误");
        setContent("");
      } finally {
        setLoading(false);
      }
    };

    if (filePath) {
      loadMarkdown();
    }
  }, [filePath]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          backgroundColor: "#fff3e0",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="warning.main">
          ⚠️ {error}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          请检查文件路径: {filePath}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  );
};

export default MarkdownViewer;
