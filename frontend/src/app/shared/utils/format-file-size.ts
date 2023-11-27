const fileSizeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

export function getFormattedFileSize(sizeInBytes: number) {
  const sizeInUnits = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const size = (sizeInBytes / Math.pow(1024, sizeInUnits)).toFixed(2);

  return `${size} ${fileSizeUnits[sizeInUnits]}`;
}
