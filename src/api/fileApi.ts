import { api } from './apiHelper';
import { TaskResponse } from './interfaces/Task';
import { FileTreeItemType } from '../interfaces/FileTreeItemType';

export const fileApi = {
  getFilePath: async (projectId: string, fileName: string): Promise<string> => {
    try {
      const response = await api.get(`/files/path/${projectId}/${fileName}`);
      return response.data.filePath;
    } catch (error) {
      console.error('Error retrieving file path:', error);
      throw error;
    }
  },
  
  getDirectoryStructure: async (
    rootPath: string
  ): Promise<FileTreeItemType[]> => {
    try {
      const response = await api.get(`/files/directory/${rootPath}`);
      return response.data.fileStructure;
    } catch (error) {
      console.error('Error getting directory structure:', error);
      throw error;
    }
  },

  getProjectFileTree: async (projectId: string): Promise<TaskResponse> => {
    try {
      const response = await api.get(`/files/tree/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting project file tree:', error);
      throw error;
    }
  },

  getFileContent: async (
    projectId: string,
    filePath: string
  ): Promise<TaskResponse> => {
    try {
      const response = await api.get(
        `/files/${projectId}/${encodeURIComponent(filePath)}`
      );
      return response.data;
    } catch (error) {
      console.error('Error getting file content:', error);
      throw error;
    }
  },

  createFile: async (
    projectId: string,
    filePath: string,
    content: string
  ): Promise<TaskResponse> => {
    try {
      const response = await api.post(
        `/files/${projectId}/${encodeURIComponent(filePath)}`,
        { content }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating file:', error);
      throw error;
    }
  },

  updateFile: async (
    projectId: string,
    filePath: string,
    content: string
  ): Promise<TaskResponse> => {
    try {
      const response = await api.put(
        `/files/update/${projectId}/${filePath}`,
        { content }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  },

  deleteFile: async (
    projectId: string,
    filePath: string
  ): Promise<TaskResponse> => {
    try {
      const response = await api.delete(
        `/files/${projectId}/${encodeURIComponent(filePath)}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },

  deleteDirectory: async (
    rootPath: string
  ): Promise<TaskResponse> => {
    try {
      const response = await api.delete(
       `/files/${encodeURIComponent(rootPath)}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting directory:', error);
      throw error;
    }
  },

  checkTaskStatus: async (taskId: string) => {
    try {
      const response = await api.get(`/tasks/${taskId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error checking task status:', error);
      throw error;
    }
  },

  renameDirectory: async (
    rootPath: string,
    newDirName: string
  ): Promise<TaskResponse> => {
    try {
      console.log('calling rename directory');
      const response = await api.post(`/files/rename-directory`, {rootPath, newDirName});
      return response.data;
    } catch (error) {
      console.error('Error renaming directory:', error);
      throw error;
    }
  },

  formatFiles: async (fileContents: string[]): Promise<TaskResponse> => {
    try {
      const response = await api.post('/files/format-code', { fileContents });
      return response.data;
    } catch (error) {
      console.error('Error formatting files:', error);
      throw error;
    }
  },
};
