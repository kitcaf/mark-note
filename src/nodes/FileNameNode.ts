import { TextNode, NodeKey, SerializedTextNode, $getRoot, EditorConfig } from 'lexical';
import { useFileStore } from '../stores/file';

export type SerializedFileNameNode = SerializedTextNode;

export class FileNameNode extends TextNode {
    static getType(): string {
        return 'file-name';
    }

    static clone(node: FileNameNode): FileNameNode {
        return new FileNameNode(node.__text, node.__key);
    }

    constructor(text: string, key?: NodeKey) {
        super(text, key);
        // 监听文本变化
        this.setTextContent(text);
    }
    // 重写 setTextContent 方法来同步更新文件名
    setTextContent(text: string): this {
        const result = super.setTextContent(text);
        // 更新 store 中的文件名
        const fileStore = useFileStore();

        fileStore.setCurrentFile({
            fileName: text,
            isSaved: false
        });
        return result;
    }

    createDOM(config: EditorConfig): HTMLElement {
        const dom = super.createDOM(config);
        dom.style.fontSize = '1.5em';
        dom.style.margin = '0';
        dom.style.padding = '0';
        dom.style.borderBottom = '1px solid #ccc';
        dom.style.cursor = 'text';
        return dom;
    }

    static importJSON(serializedNode: SerializedFileNameNode): FileNameNode {
        const node = $createFileNameNode(serializedNode.text);
        return node;
    }

    exportJSON(): SerializedFileNameNode {
        return {
            ...super.exportJSON(),
            type: 'file-name',
            version: 1,
        };
    }
}

export function $createFileNameNode(text: string): FileNameNode {
    return new FileNameNode(text);
}

export function $isFileNameNode(node: TextNode): node is FileNameNode {
    return node instanceof FileNameNode;
} 