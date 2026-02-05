---
title: eratosthenes
date: 2024-02-09 11:57:06
permalink: /pages/518814/
categories:
  - algorithm
tags:
  -
author:
  name: mercurywang
  link: https://github.com/mercurywang
---

```js
const eratosthenes = function (n: number) {
  // Eratosthenes algorithm to find all primes under n
  const array = [],
    upperLimit = Math.sqrt(n),
    output = [];

  // Make an array from 2 to (n - 1)
  for (let i = 0; i < n; i++) {
    array.push(true);
  }

  // Remove multiples of primes starting from 2, 3, 5,...
  for (let i = 2; i <= upperLimit; i++) {
    if (array[i]) {
      for (let j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }

  // All array[i] set to true are primes
  for (let i = 2; i < n; i++) {
    if (array[i]) {
      output.push(i);
    }
  }

  return output;
};
```

来自 [sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number](https://stackoverflow.com/questions/15471291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number)
