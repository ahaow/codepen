## 树结构

```html
<div id="box">
  <p>hello <b>world</b></p>
  <img src="https://ali.oss.sh.ysclass.net//upload/158/f443b606cf8c4409ac83ee212818eacc.png" />
  <!-- 注释 -->
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>
```

## 显示信息

```js
function visitNode(node) {
    if (node instanceof Comment) {
        // 注释
        console.info('Comment node ---', node.textContent)
    }
    if (node instanceof Text) {
        // 文本
        const t = node.textContent?.trim()
        if (t) {
            console.info('Text node ---', node.textContent?.trim())
        }
    }
    if (node instanceof HTMLElement) {
        // element
        console.info('Element node ---', `<${node.tagName.toLowerCase()}>`)
    }
}
```

## 深度优先遍历

[![vkPHiT.png](https://s1.ax1x.com/2022/07/31/vkPHiT.png)](https://imgtu.com/i/vkPHiT)

```js
// 深度优先遍历
function depthFirstTraverse(curNode) {
    visitNode(curNode)

    const childNodes = curNode.childNodes
    if (childNodes.length) {
        childNodes.forEach(child => {
            depthFirstTraverse(child) // 递归
        })
    }
}

const box = document.getElementById("box")
if (box) {
    depthFirstTraverse(box)
}
```

## 广度优先遍历

```js
// 广度优先遍历
function breadthFirstTraverse(node) {
    const queue = []

    // 根节点入队列
    queue.unshift(node)

    while (queue.length > 0) {
        const curNode = queue.pop()
        if (curNode == null) break

        visitNode(curNode)

        // 子节点入队列
        const childNodes = curNode.childNodes
        if (childNodes.length) {
            childNodes.forEach(child => queue.unshift(child))
        }

    }
}
```

## 深度优先遍历不用递归

```js
function depthFirstTraverse2(root) {
    const stack = []
    // 根节点压栈
    stack.push(root)

    while (stack.length > 0) {
        const curNode = stack.pop() // 出栈
        if (curNode == null) break
        visitNode(curNode)

        // 子节点压栈
        const childNodes = curNode.childNodes
        if (childNodes.length > 0) {
            // 反顺序压栈
            Array.from(childNodes).reverse().forEach(child => stack.push(child))
        }
    }
}
```
