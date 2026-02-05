# 后端开发笔记

## Node.js 基础

### Express 框架

```javascript
const express = require("express");
const app = express();

// 中间件
app.use(express.json());

// 路由
app.get("/api/users", (req, res) => {
  res.json({ users: [] });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  // 处理创建用户逻辑
  res.status(201).json({ id: 1, name, email });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 数据库

### MySQL 常用语句

```sql
-- 查询
SELECT * FROM users WHERE age > 18;

-- 插入
INSERT INTO users (name, email) VALUES ('张三', 'zhang@example.com');

-- 更新
UPDATE users SET name = '李四' WHERE id = 1;

-- 删除
DELETE FROM users WHERE id = 1;

-- 连接查询
SELECT u.name, o.order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

### MongoDB 基本操作

```javascript
// 查询
db.users.find({ age: { $gt: 18 } });

// 插入
db.users.insertOne({ name: "张三", email: "zhang@example.com" });

// 更新
db.users.updateOne({ _id: ObjectId("...") }, { $set: { name: "李四" } });

// 删除
db.users.deleteOne({ _id: ObjectId("...") });
```

---

## RESTful API 设计

### HTTP 方法

| 方法   | 用途             | 示例                |
| ------ | ---------------- | ------------------- |
| GET    | 获取资源         | GET /api/users      |
| POST   | 创建资源         | POST /api/users     |
| PUT    | 更新资源（完整） | PUT /api/users/1    |
| PATCH  | 更新资源（部分） | PATCH /api/users/1  |
| DELETE | 删除资源         | DELETE /api/users/1 |

### 状态码

| 状态码 | 含义       |
| ------ | ---------- |
| 200    | 成功       |
| 201    | 创建成功   |
| 400    | 请求错误   |
| 401    | 未授权     |
| 404    | 未找到     |
| 500    | 服务器错误 |

---

## 认证与授权

### JWT 认证

```javascript
const jwt = require("jsonwebtoken");

// 生成 token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "24h" },
);

// 验证 token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

> 💡 **安全提示**: 敏感数据不要放在 JWT 的 payload 中，因为它只是 Base64 编码，不是加密。
