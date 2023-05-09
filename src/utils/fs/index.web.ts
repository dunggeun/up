import { Logger } from 'src/modules/logger';
import type { SelectFile, WriteFile, ReadFile } from './types';

const TAG = 'utils.fs';

export const selectFile: SelectFile = (): Promise<File> => {
  Logger.debug(TAG, 'selectFile');

  return new Promise<File>((resolve, reject): void => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.style.display = 'none';
    inputElement.onchange = (event: Event): void => {
      const target = event.target;
      const file = (target as unknown as HTMLInputElement).files?.[0];
      if (file) {
        resolve(file);
      } else {
        reject(new Error('no file selected'));
      }
      document.body.removeChild(inputElement);
    };
    document.body.appendChild(inputElement);
    inputElement.click();
  });
};

export const writeFile: WriteFile = (
  data: string,
  filename: string,
): Promise<void> => {
  Logger.debug(TAG, `writeFile :: save file to ${filename}`);

  return new Promise<void>((resolve): void => {
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`;
    tempLink.setAttribute('download', filename);

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    setTimeout(() => {
      document.body.removeChild(tempLink);
      resolve();
    }, 200);
  });
};

export const readFile: ReadFile = (file: File | string): Promise<string> => {
  Logger.debug(TAG, `readFile :: read file from ${file.toString()}`);

  if (typeof file === 'string') {
    return Promise.reject(new Error('invalid payload'));
  }

  return new Promise<string>((resolve, reject): void => {
    const reader = new FileReader();
    reader.onload = (event): void => {
      const contents = event.target?.result;
      if (typeof contents === 'string') {
        resolve(contents);
      } else {
        reject(new Error('empty contents'));
      }
    };
    reader.readAsText(file);
  });
};
