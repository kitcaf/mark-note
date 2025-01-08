import { $getRoot } from 'lexical';
import { useLexicalComposer } from './useLexicalComposer';
import { v4 as uuidv4 } from 'uuid'; // 确保安装了 uuid 库

export const createNewFile = () => {
    console.log('createNewFile');
    const editor = useLexicalComposer();
    //新建文件夹之前的文件是否保存的判断


    // 清空 editor 的状态
    editor.update(() => {
        const root = $getRoot();
        root.clear(); // 清空内容
    });

    // 生成新的文件名
    const fileName = `${uuidv4()}_未命名.kc`; // 使用 UUID 生成唯一文件名

    return fileName; // 返回新文件名
};
