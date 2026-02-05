// 菜单配置文件
export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  children?: MenuItem[];
  path?: string; // markdown 文件路径
  dataType?: "markdown" | "json"; // 数据类型
  dataSource?: string; // JSON 数据源标识
}

export const menuConfig: MenuItem[] = [
  {
    id: "japanese",
    title: "🇯🇵 日语",
    children: [
      {
        id: "n4",
        title: "N4 语法",
        dataType: "json",
        dataSource: "n4",
      },
      {
        id: "n3",
        title: "N3 语法",
        dataType: "json",
        dataSource: "n3",
      },
    ],
  },
  {
    id: "it",
    title: "💻 IT",
    children: [
      {
        id: "frontend",
        title: "前端笔记",
        dataType: "markdown",
        path: "/notes/it/frontend.md",
      },
      {
        id: "backend",
        title: "后端笔记",
        dataType: "markdown",
        path: "/notes/it/backend.md",
      },
    ],
  },
  {
    id: "ai",
    title: "🤖 AI",
    children: [
      {
        id: "machine-learning",
        title: "机器学习",
        dataType: "markdown",
        path: "/notes/ai/machine-learning.md",
      },
      {
        id: "llm",
        title: "大语言模型",
        dataType: "markdown",
        path: "/notes/ai/llm.md",
      },
    ],
  },
];
