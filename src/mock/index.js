import fs from "fs";
import path from "path";
const directoryPath = path.join(__dirname); // 指定要遍历的目录路径
function readDirectoryRecursively(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // console.log(`目录: ${fullPath}`);
      readDirectoryRecursively(fullPath); // 递归遍历子目录
    } else {
      // console.log(`文件: ${fullPath}`);
    }
  });
  return files;
}
export default readDirectoryRecursively(directoryPath);
