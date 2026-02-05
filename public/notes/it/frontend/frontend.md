# 前端开发笔记

## HTML 基础

### 常用标签

```html
<!-- 标题标签 -->
<h1>一级标题</h1>
<h2>二级标题</h2>

<!-- 段落和文本 -->
<p>这是一个段落</p>
<span>行内文本</span>

<!-- 链接和图片 -->
<a href="https://example.com">链接</a>
<img src="image.jpg" alt="图片描述" />
```

---

## CSS 布局

### Flexbox 布局

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
```

### Grid 布局

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

---

## JavaScript 基础

### ES6 常用语法

```javascript
// 箭头函数
const add = (a, b) => a + b;

// 解构赋值
const { name, age } = user;
const [first, second] = array;

// 展开运算符
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProp: value };
```

### Promise 和 async/await

```javascript
// Promise
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// async/await
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

---

## React 框架

### 函数组件

```tsx
import { useState, useEffect } from "react";

interface Props {
  name: string;
}

const MyComponent: React.FC<Props> = ({ name }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

export default MyComponent;
```

---

## 常用工具

| 工具       | 用途       | 官网               |
| ---------- | ---------- | ------------------ |
| Vite       | 构建工具   | vitejs.dev         |
| TypeScript | 类型检查   | typescriptlang.org |
| ESLint     | 代码检查   | eslint.org         |
| Prettier   | 代码格式化 | prettier.io        |

> 💡 **学习建议**: 前端技术更新快，建议关注官方文档和社区动态。
