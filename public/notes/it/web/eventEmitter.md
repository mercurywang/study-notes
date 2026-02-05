---
title: eventEmitter
date: 2025-06-09 12:04:56
permalink: /pages/9c4238/
categories:
  - notes
tags:
  -
author:
  name: mercurywang
  link: https://github.com/mercurywang
---

```ts
interface Event {
  on: (name: string, cb: Function) => void;
  emit: (name: string, ...args: Array<any>) => void;
  off: (name: string, cb: Function) => void;
  once: (name: string, cb: Function) => void;
}
interface List {
  [key: string]: Array<Function>;
}

export class EventEmitter implements Event {
  list: List;
  constructor() {
    this.list = {};
  }
  on(name: string, cb: Function) {
    if (!this.list[name]) {
      this.list[name] = [];
    }
    this.list[name].push(cb);
  }
  emit(name: string, ...args: Array<any>) {
    if (this.list[name]) {
      this.list[name].forEach((cb) => {
        cb.apply(this, args);
      });
    }
  }
  off(name: string, cb: Function) {
    let events = this.list[name];
    if (events && cb) {
      let index = events.findIndex((event) => event === cb);
      index >= 0 && events.splice(index, 1);
    }
  }
  clean(name: string) {
    let events = this.list[name];
    if (events) {
      events.splice(0);
      delete this.list[name];
    }
  }
  once(name: string, cb: Function) {
    let onceEvent = (...args: Array<any>) => {
      cb.apply(this, args);
      this.off(name, onceEvent);
    };
    this.on(name, onceEvent);
  }
}

export const CollaborationEditorEditKey = "CollaborationEditKey";
export const CollaborationEditorActiveKey = "CollaborationEditorActiveKey";
export const CollaborationEditorSaveKey = "CollaborationSaveKey";

export default new EventEmitter();
```

```ts
// use
useEffect(() => {
  const onEdit = () => {};
  const onSave = () => {};
  const onActive = () => {};

  EventEmitter.on(CollaborationEditorEditKey, onEdit);
  EventEmitter.on(CollaborationEditorSaveKey, onSave);
  EventEmitter.on(CollaborationEditorActiveKey, onActive);

  return () => {
    EventEmitter.off(CollaborationEditorEditKey, onEdit);
    EventEmitter.off(CollaborationEditorSaveKey, onSave);
    EventEmitter.off(CollaborationEditorActiveKey, onActive);
  };
}, [binding]);

EventEmitter.emit(CollaborationEditorSaveKey);
```
