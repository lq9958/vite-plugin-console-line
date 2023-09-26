import path from 'path';
import {
  generateLogTitle,
  generateLogTitleStyle,
  generateFileLocation,
  generateFileLocationStyle,
  generateLine,
  generateLineStyle,
  generateNewLine,
  generateNewLineStyle
} from './utils'

export default function consoleLine(options) {
  return {
    name: 'vite-plugin-console-line',
    transform(code, id) {
      const { exclude } = options;
      const projectDir = path.join(process.cwd());
      if (exclude.length) {
        for (let i = 0; i < exclude.length; i += 1) {
          const fileDir = path.join(projectDir, exclude[i]).replace(/\\/g, '/');
          if (id.startsWith(fileDir)) {
            return { code };
          }
        }
      }
      const fileSuffixReg = /.*\.(js|jsx|ts|tsx|vue)$/;
      if (fileSuffixReg.test(id)) {
        const codeList = code.split(/\r?\n/);
        const consoleReg = /console\.log\(/;
        let lineCount = 1;
        let resultCode = '';
        codeList.forEach((token) => {
          if (token.search(consoleReg) >= 0) {
            const fileDir = id.replace(projectDir.replace(/\\/g, '/'), '');
            const prefix = token.slice(
              token.search(consoleReg),
              12 + token.search(consoleReg)
            );
            const suffix = token.slice(12 + token.search(consoleReg));
            const ret = `${prefix
              + generateLogTitle()
              + generateFileLocation(fileDir)
              + generateLine(lineCount)
              + generateNewLine()
              + ','
              + generateLogTitleStyle()
              + ','
              + generateFileLocationStyle()
              + ','
              + generateLineStyle()
              + ','
              + generateNewLineStyle()
              + ','
              + suffix}`;
            resultCode += `${ret}\n`;
          } else {
            resultCode += `${token}\n`;
          }
          lineCount += 1;
        });
        return { code: resultCode };
      }
      return { code };
    }
  };
}
