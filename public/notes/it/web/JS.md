---
title: JavaScript
date: 2024-02-09 13:58:03
permalink: /pages/35ec49/
categories:
  - notes
tags:
  -
author:
  name: mercurywang
  link: https://github.com/mercurywang
---

## 1. 给 JavaScript 知识做一个顶层目录：

- 文法
  - 词法
  - 语法
- 语义
- 运行时
  - 类型
  - 执行过程

为什么这样分呢，**因为对于任何计算机语言来说，必定是“用规定的文法，去表达特定语义，最终操作运行时的”一个过程。**

程序 = 算法 + 数据结构，那么，对运行时来说，类型就是数据结构，执行过程就是算法。

![](/notes/images/js.jpg)

## 2. JavaScript 的类型

The ECMAScript language types are `Undefined`, `Null`, `Boolean`, `String`, `Symbol`, `Number`, `BigInt`, and `Object`. [Reference](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types)

### 2.1 Undefined, Null

| 区别        | `null`                   | `undefined`          |
| ----------- | ------------------------ | -------------------- |
| 定义方面    | 表示定义了但是为空       | 表示未定义           |
| 语法方面    | 是一个关键字，也是一个值 | 不是关键字，是一个值 |
| typeof      | `Object`,                | `undefined`          |
| 转成 number | 0                        | `NaN`                |

JavaScript 的代码 `undefined` 是一个变量，而并非是一个关键字，这是 JavaScript 语言公认的设计失误之一，所以，为了避免无意中被篡改，建议使用 `void 0` 来获取 `undefined` 值。

无意中篡改的例子：

```js
const test = () =>{ var undefined = 5; console.log(typeof undefined) //輸出 number }
```

### 2.2 Number

JavaScript 中的 Number 类型有 18437736874454810627(即 2^64-2^53+3) 个值。JavaScript 中的 Number 类型基本符合 IEEE 754-2008 规定的双精度浮点数规则。

JavaScript 中有 +0 和 -0，在加法类运算中它们没有区别，但是除法的场合则需要特别留意区分，“忘记检测除以 -0，而得到负无穷大”的情况经常会导致错误，而区分 +0 和 -0 的方式，正是检测 1/x 是 `Infinity` 还是 `-Infinity`。

**典型例题：为什么在 JavaScript 中，0.1+0.2 不能 =0.3：**

```js
console.log(0.1 + 0.2 == 0.3);
```

这里输出的结果是 false，说明两边不相等的。这是浮点运算的特点，浮点数运算的精度问题导致等式左右的结果并不是严格相等，而是相差了个微小的值。所以实际上，这里错误的不是结论，而是比较的方法，正确的比较方法是使用 JavaScript 提供的**最小精度值(Number.EPSILON)**：

```js
console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
```

### 2.3 Object

JavaScript 语言设计上试图模糊对象和基本类型之间的关系，我们日常代码可以把对象的方法在基本类型上使用。比如：

```js
console.log("abc".charAt(0)); //a
```

甚至我们在原型上添加方法，都可以应用于基本类型，比如以下代码，在 Symbol 原型上添加了 hello 方法，在任何 Symbol 类型变量都可以调用。

```js
Symbol.prototype.hello = () => console.log("hello");

var a = Symbol("a");
console.log(typeof a); //symbol，a并非对象
a.hello(); //hello，有效
```

**为什么给对象添加的方法能用在基本类型上？**

- `.` 运算符提供了装箱操作，它会根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法。

### 2.4 类型转换

![](/notes/images/parse.jpg)

- 装箱转换

每一种基本类型 `Number、String、Boolean、Symbol` 在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象，它是类型转换中一种相当重要的种类。

每一类装箱对象皆有私有的 Class 属性，这些属性可以用 Object.prototype.toString 获取：

```js
var symbolObject = Object(Symbol("a"));
console.log(Object.prototype.toString.call(symbolObject)); //[object Symbol]
```

在 `JavaScript` 中，没有任何方法可以更改私有的 Class 属性，因此 `Object.prototype.toString` 是可以准确识别对象对应的基本类型的方法，它比 `instanceof` 更加准确。

## 3. 面前对象

在《面向对象分析与设计》这本书中，Grady Booch 替我们做了总结，他认为，从人类的认知角度来说，对象应该是下列事物之一：

1. 一个可以触摸或者可以看见的东西；
2. 人的智力可以理解的东西；
3. 可以指导思考或行动（进行想象或施加动作）的东西。

### 3.1 JavaScript 对象的特征：

在我看来，不论我们使用什么样的编程语言，我们都先应该去理解对象的本质特征（参考 Grandy Booch《面向对象分析与设计》）。总结来看，对象有如下几个特点。

- 对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
- 对象有状态：对象具有状态，同一对象可能处于不同状态之下。
- 对象具有行为：即对象的状态，可能因为它的行为产生变迁。

### 3.2 JavaScript 对象分类

![](/notes/images/js-objects.jpg)
