# 机器学习笔记

## 基本概念

### 什么是机器学习？

机器学习是人工智能的一个子领域，它让计算机能够从数据中学习，而不需要显式编程。

### 机器学习的类型

| 类型       | 描述             | 例子               |
| ---------- | ---------------- | ------------------ |
| 监督学习   | 有标签的训练数据 | 分类、回归         |
| 无监督学习 | 无标签的训练数据 | 聚类、降维         |
| 强化学习   | 通过奖励反馈学习 | 游戏AI、机器人控制 |

---

## 常用算法

### 线性回归

```python
from sklearn.linear_model import LinearRegression

# 创建模型
model = LinearRegression()

# 训练模型
model.fit(X_train, y_train)

# 预测
predictions = model.predict(X_test)
```

### 决策树

```python
from sklearn.tree import DecisionTreeClassifier

# 创建模型
clf = DecisionTreeClassifier(max_depth=5)

# 训练
clf.fit(X_train, y_train)

# 预测
predictions = clf.predict(X_test)
```

---

## 模型评估

### 分类指标

- **准确率 (Accuracy)**: 正确预测的比例
- **精确率 (Precision)**: 预测为正的样本中实际为正的比例
- **召回率 (Recall)**: 实际为正的样本中被正确预测的比例
- **F1 Score**: 精确率和召回率的调和平均数

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)
```

---

## 深度学习框架

### PyTorch 基础

```python
import torch
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleNN()
```

> 💡 **学习建议**: 理论与实践结合，多动手做项目是学习机器学习的最佳方式。
