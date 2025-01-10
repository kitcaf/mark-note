import { TextNode, NodeKey, SerializedTextNode, $createTextNode, $createParagraphNode, ParagraphNode, RangeSelection, EditorConfig, LexicalEditor, LexicalNode, $createRangeSelection, $setSelection, $getSelection, $isRangeSelection, KEY_ENTER_COMMAND } from 'lexical';
import { useFileStore } from '../stores/file';

export type SerializedFileNameNode = SerializedTextNode;

export class FileNameNode extends TextNode implements LexicalNode {
    static getType(): string {
        return 'file-name';
    }

    static clone(node: FileNameNode): FileNameNode {
        return new FileNameNode(node.__text, node.__key);
    }

    constructor(text: string, key?: NodeKey) {
        super(text, key);
    }

    createDOM(config: EditorConfig, editor?: LexicalEditor): HTMLElement {
        const dom = super.createDOM(config);
        // 设置固定样式
        dom.style.fontSize = '2em';
        dom.style.fontWeight = 'bold';
        dom.style.margin = '0';
        dom.style.padding = '8px 0';
        dom.style.display = 'block';

        // 添加 placeholder 属性和类
        dom.setAttribute('data-placeholder', '未命名文件');
        dom.classList.add('filename-node');

        return dom;
    }

    // 重写 setTextContent 来同步更新文件名
    setTextContent(text: string): this {
        super.setTextContent(text);
        this.updateFileName();
        return this;
    }

    // 重写 updateDOM 来捕获所有文本变化
    updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
        const updated = super.updateDOM(prevNode, dom, config);
        this.updateFileName();
        return updated;
    }

    // 添加新方法来处理文件名更新
    private updateFileName(): void {
        const fileStore = useFileStore();
        const currentText = this.getTextContent();

        // 如果文本为空，不更新 store
        if (currentText === '') {
            fileStore.setCurrentFile({
                fileName: "未命名文件",
                isSaved: false
            });
            return;
        }

        if (currentText !== fileStore.currentFile.fileName) {
            fileStore.setCurrentFile({
                fileName: currentText,
                isSaved: false
            });
        }
    }

    // 处理回车键：创建新段落
    insertNewAfter(selection?: RangeSelection): ParagraphNode {
        const paragraph = $createParagraphNode();
        const textContent = this.getTextContent();
        console.log("输入回车键", textContent);

        // 如果文本为空，设置默认文本并将光标移到新段落
        if (textContent === '') {
            this.setTextContent('未命名文件');
            this.insertAfter(paragraph);
            // 强制选中新段落
            const range = $createRangeSelection();
            range.anchor.set(paragraph.getKey(), 0, 'element');
            range.focus.set(paragraph.getKey(), 0, 'element');
            $setSelection(range);
            return paragraph;
        }

        // 处理有选中文本的情况
        if (selection) {
            const anchorOffset = selection.anchor.offset;
            if (anchorOffset < textContent.length) {
                // 将光标后的文本移到新段落
                const afterText = textContent.slice(anchorOffset);
                const textNode = $createTextNode(afterText);
                paragraph.append(textNode);
                // 更新当前节点的文本
                this.setTextContent(textContent.slice(0, anchorOffset));
            }
        }

        this.insertAfter(paragraph);
        // 强制选中新段落
        const range = $createRangeSelection();
        range.anchor.set(paragraph.getKey(), 0, 'element');
        range.focus.set(paragraph.getKey(), 0, 'element');
        $setSelection(range);
        return paragraph;
    }

    // 阻止节点被删除
    remove(): boolean {
        const text = this.getTextContent();
        console.log("remove", text);
        this.updateFileName();
        if (!text) {
            return false; // 直接返回 false，不设置文本
        }
        return false;
    }

    // 确保节点不能被其他节点替换
    replace<N extends LexicalNode>(_replaceWith: N, _includeChildren?: boolean): N {
        return this as unknown as N;
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

    // 添加键盘事件处理
    onKeyDown(event: KeyboardEvent): boolean {
        if (event.key === 'Enter' && !event.shiftKey) {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                this.insertNewAfter(selection);
                event.preventDefault();
                return true;
            }
        }
        return false;
    }

    // // 选中当前节点的文本
    // selectNext(): void {
    //     const selection = $createRangeSelection();
    //     selection.anchor.set(this.getKey(), 0, 'text');
    //     selection.focus.set(this.getKey(), this.getTextContentSize(), 'text');
    //     $setSelection(selection);
    // }
}

export function $createFileNameNode(text: string): FileNameNode {
    return new FileNameNode(text);
}

export function $isFileNameNode(node: LexicalNode | null | undefined): node is FileNameNode {
    return node instanceof FileNameNode;
} 