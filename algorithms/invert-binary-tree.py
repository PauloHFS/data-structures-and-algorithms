from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left: 'Optional[TreeNode]' = None, right: 'Optional[TreeNode]' = None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    if not root:
        return None

    root.left, root.right = root.right, root.left

    invert_tree(root.left)
    invert_tree(root.right)

    return root

def tree_to_inorder_list(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    return tree_to_inorder_list(root.left) + [root.val] + tree_to_inorder_list(root.right)

original_root: TreeNode = TreeNode(4, 
                         TreeNode(2, TreeNode(1), TreeNode(3)), 
                         TreeNode(7, TreeNode(6), TreeNode(9)))

original_list: list[int] = tree_to_inorder_list(original_root)
assert original_list == [1, 2, 3, 4, 6, 7, 9], "A lista da árvore original não está correta. Esperado: [1, 2, 3, 4, 6, 7, 9], Obtido: {original_list}"

inverted_root: TreeNode | None = invert_tree(original_root)

inverted_list: list[int] = tree_to_inorder_list(inverted_root)

expected_inverted_list: list[int] = [9, 7, 6, 4, 3, 2, 1]
assert inverted_list == expected_inverted_list, f"A lista da árvore invertida não está correta. Esperado: {expected_inverted_list}, Obtido: {inverted_list}"

print("\nAssert OK: A árvore foi invertida corretamente.")
