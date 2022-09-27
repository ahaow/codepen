interface IArrayItem {
    id: number
    name: string
    parentId: number
}

interface ITreeNode {
    id: number
    name: string
    children?: ITreeNode[]
}

function arrayToTree(arr: IArrayItem[]): ITreeNode | null {
    // 用于id 和 treeNode 的映射
    const idToTreeNode: Map<number, ITreeNode> = new Map()

    let root:any = null
    arr.forEach((item: IArrayItem) => {
        const { id, name, parentId } = item
        // 定义treeNode , 并加入map
        const treeNode: ITreeNode = { id, name }
        idToTreeNode.set(id, treeNode)

        // 找到 parentId 并加入到它的children
        const parentNode = idToTreeNode.get(parentId)
        if (parentNode) {
            if (parentNode.children == null) parentNode.children = []
            parentNode.children.push(treeNode)
        }
        // 找到根节点
        if (parentId === 0) {
            root = treeNode
        }
    })
    return root
}

const arr = [
    { id: 1, name: '部门A', parentId: 0 },
    { id: 2, name: '部门B', parentId: 1 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 2 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
]

function treeToArray(root: ITreeNode): IArrayItem[] {
    // Map映射
    const nodeToParent: Map<ITreeNode, ITreeNode> = new Map()

    const arr: IArrayItem[] = []

    // 广度优先遍历 queue
    const queue: ITreeNode[] = []
    queue.unshift(root) // 根节点入队

    while (queue.length > 0) {
        const currentNode = queue.pop() // 出队
        if (currentNode == null) break

        const {id, name, children = []} = currentNode

        // 创建数组item, 并push
        const parentNode = nodeToParent.get(currentNode)
        const parentId = parentNode?.id || 0
        const item = { id, name, parentId }
        arr.push(item)

        // 子节点入队继续遍历
        children.forEach((child) => {
            // 映射parent
            nodeToParent.set(child, currentNode)

            // 入队
            queue.unshift(child)
        })
    }

    return arr
}

const obj = {
    id: 1,
    name: '部门A',
    children: [
        {
            id: 2,
            name: '部门B',
            children: [
                { id: 4, name: '部门D' },
                { id: 5, name: '部门E' },
            ]
        },
        {
            id: 3,
            name: '部门C',
            children: [
                { id: 6, name: '部门F' }
            ]
        }
    ]
}
