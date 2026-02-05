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
      {
        id: "n2",
        title: "N2 文法会話",
        dataType: "json",
        dataSource: "n2",
      },
    ],
  },
  {
    id: "it",
    title: "💻 IT",
    children: [
      {
        id: "frontend-group",
        title: "前端",
        children: [
          {
            id: "frontend",
            title: "前端笔记",
            dataType: "markdown",
            path: "/notes/it/frontend/frontend.md",
          },
          {
            id: "collections",
            title: "知识集合",
            dataType: "markdown",
            path: "/notes/it/frontend/collections.md",
          },
          {
            id: "event-emitter",
            title: "EventEmitter",
            dataType: "markdown",
            path: "/notes/it/frontend/eventEmitter.md",
          },
          {
            id: "flow",
            title: "面试流程",
            dataType: "markdown",
            path: "/notes/it/frontend/flow.md",
          },
        ],
      },
      {
        id: "backend-group",
        title: "后端",
        children: [
          {
            id: "backend",
            title: "后端笔记",
            dataType: "markdown",
            path: "/notes/it/backend/backend.md",
          },
        ],
      },
      {
        id: "algorithm-group",
        title: "算法",
        children: [
          {
            id: "eratosthenes",
            title: "埃氏筛法",
            dataType: "markdown",
            path: "/notes/it/algorithm/eratosthenes.md",
          },
        ],
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
