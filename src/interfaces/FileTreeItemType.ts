// name, ext, type, path, children
export interface FileTreeItemType {
    name: string;
    ext?: string;
    type?: 'directory' | 'file';
    children?: FileTreeItemType[];
    path?: string;
    status?: 'pending' | 'generating' | 'generated'; 
    code?: string;
}
  