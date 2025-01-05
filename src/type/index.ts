import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { Klass, LexicalNode } from "lexical"


export const playgroundNodes: Array<Klass<LexicalNode>> = [
    HeadingNode,
    // ListNode,
    // ListItemNode,
    QuoteNode,
    // AutoLinkNode,
    // LinkNode
]


export const EDITOR_ID = "EDITOR_LEXICAL"

