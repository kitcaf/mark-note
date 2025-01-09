/**
 * 从文件路径中提取文件名（包含扩展名）
 * @param filePath 文件路径
 * @returns 文件名
 */
export function extractFileName(filePath: string): string {
    try {
        const pathParts = filePath.split(/[/\\]/); // 同时处理正斜杠和反斜杠
        return pathParts[pathParts.length - 1];
    } catch (error) {
        console.error('Error extracting filename:', error);
        return filePath;
    }
}

/**
 * 从文件名中提取不带扩展名的部分
 * @param fileName 文件名
 * @returns 不带扩展名的文件名
 */
export function removeExtension(fileName: string): string {
    try {
        return fileName.split('.')[0];
    } catch (error) {
        console.error('Error removing extension:', error);
        return fileName;
    }
}

/**
 * 从带有UUID前缀的文件名中提取显示名称
 * @param fileName 文件名（格式：uuid_name.ext）
 * @returns 显示名称
 */
export function extractDisplayName(fileName: string): string {
    try {
        return fileName.split('_')[1].split('.')[0];
    } catch (error) {
        console.error('Error extracting display name:', error);
        return fileName;
    }
}

/**
 * 获取文件扩展名
 * @param fileName 文件名
 * @returns 扩展名（带点号）
 */
export function getExtension(fileName: string): string {
    try {
        const parts = fileName.split('.');
        return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
    } catch (error) {
        console.error('Error getting extension:', error);
        return '';
    }
} 