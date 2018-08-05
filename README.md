# Konvas

自定义画布

## 模块

* Dragger
* Guide Line

## Node

### 属性

* x
* y
* width
* height
* scale
* rotate

## 初始化

```
const konvas = new Konvas('#konvas')
konvas.addNode({
  x, y, width, height, text
})
```

## 基础组件

提供基础功能

* drag
* scale
* resize
* rotate

组件不关注展现。其他组件应该挂载到基础组件中。

node.wrap()

# todo list

-  [ ] node resize
-  [x] node rotate
-  [x] node locked


konvas.on('node.change', (layout) => {})
