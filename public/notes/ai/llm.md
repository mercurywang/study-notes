# 大语言模型 (LLM) 笔记

## 什么是大语言模型？

大语言模型 (Large Language Model, LLM) 是一种基于深度学习的自然语言处理模型，通过在海量文本数据上进行预训练，学习语言的统计规律和语义知识。

---

## 主要模型

| 模型     | 公司      | 特点               |
| -------- | --------- | ------------------ |
| GPT-4    | OpenAI    | 多模态，推理能力强 |
| Claude   | Anthropic | 安全、有帮助、诚实 |
| Gemini   | Google    | 原生多模态         |
| LLaMA    | Meta      | 开源，可本地部署   |
| 文心一言 | 百度      | 中文能力强         |
| 通义千问 | 阿里      | 开源，多语言       |

---

## Transformer 架构

### 核心组件

1. **Self-Attention (自注意力机制)**
   - 计算序列中每个位置与其他位置的关联度
2. **Multi-Head Attention (多头注意力)**
   - 并行计算多组注意力，捕获不同维度的信息

3. **Feed-Forward Network (前馈网络)**
   - 对每个位置独立进行非线性变换

4. **Layer Normalization (层归一化)**
   - 稳定训练过程

### 注意力计算公式

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

---

## Prompt 工程

### 基本技巧

1. **明确指令**: 清晰描述你想要的输出
2. **提供示例**: Few-shot learning
3. **分步思考**: Chain-of-Thought (CoT)
4. **角色设定**: 让模型扮演特定角色

### 示例

```
你是一位经验丰富的Python开发者。请帮我审查以下代码，
指出潜在的问题并提供改进建议。

代码:
[粘贴代码]

请按以下格式回答：
1. 问题描述
2. 改进建议
3. 优化后的代码
```

---

## API 调用示例

### OpenAI API

```python
from openai import OpenAI

client = OpenAI(api_key="your-api-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "什么是机器学习？"}
    ],
    temperature=0.7,
    max_tokens=1000
)

print(response.choices[0].message.content)
```

---

## 应用场景

- 📝 **文本生成**: 文章、邮件、代码
- 🔍 **信息检索**: 问答系统、知识库
- 🌐 **翻译**: 多语言翻译
- 📊 **数据分析**: 文本分类、情感分析
- 🤖 **智能助手**: 客服、个人助理

> 💡 **发展趋势**: LLM 正在向多模态、长上下文、更强推理能力的方向发展。
