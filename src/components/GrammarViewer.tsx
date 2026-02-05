import { FC } from "react";
import { Box, Paper, Typography, Chip, Link } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export interface GrammarItem {
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
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#1976d2",
          borderBottom: "2px solid #1976d2",
          paddingBottom: "12px",
          marginBottom: "24px",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          width: "100%",
        }}
      >
        {data.map((item, idx) => (
          <Paper
            key={`grammar-${idx}`}
            elevation={0}
            sx={{
              p: 3,
              height: "1200px", // 强制固定高度确保整齐
              display: "flex",
              flexDirection: "column",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              textAlign: "left",
              backgroundColor: "#fff",
              overflow: "hidden", // 防止外部溢出
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              pb={1}
              borderBottom="1px solid #f0f0f0"
              flexShrink={0} // 防止头部被压缩
            >
              <Chip
                label={item.schedule}
                color="primary"
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              />
              {item.youtube_url && item.youtube_url.length > 0 && (
                <Link
                  href={item.youtube_url[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    textDecoration: "none",
                    color: "#d32f2f",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <PlayCircleOutlineIcon fontSize="small" />
                  观看视频
                </Link>
              )}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto", // 内容过多时内部滚动
                pr: 1, // 给滚动条留点空间
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  "& strong": { color: "#2c3e50" },
                  fontSize: "1rem",
                }}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />

              <Box
                className="grammar-explanation"
                sx={{
                  pt: 2,
                  borderTop: "1px dashed #e0e0e0",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "#444",
                  "& strong": {
                    color: "#1976d2",
                    display: "block",
                    marginTop: "16px",
                    marginBottom: "8px",
                    fontSize: "1.05rem",
                  },
                  "& ruby": {
                    rubyPosition: "over",
                    backgroundColor: "rgba(25, 118, 210, 0.05)",
                    padding: "0 2px",
                    borderRadius: "2px",
                  },
                  "& rt": {
                    fontSize: "0.6em",
                    color: "#666",
                  },
                }}
                dangerouslySetInnerHTML={{ __html: item.explanation }}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default GrammarViewer;
