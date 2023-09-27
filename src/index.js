import path from 'path';
import { composeConsoleLog } from './utils'

/**
 * if you want to jump to the console line, you need to set the port
 * 
 * @param {object} options 
 * @param {string[]} options.exclude - exclude file path
 * @param {number|string} options.port - server port
 * @returns {object}
 */
function consoleLine(options) {
  return {
    name: 'vite-plugin-console-line',
    transform(code, id) {
      const { exclude, port } = options;
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
            const fileRelativePath = id.replace(projectDir.replace(/\\/g, '/'), '');
            const prefix = token.slice(
              token.search(consoleReg),
              12 + token.search(consoleReg)
            );
            const suffix = token.slice(12 + token.search(consoleReg));
            const ret = composeConsoleLog({
              prefix,
              suffix,
              fileRelativePath,
              fileAbsolutePath: id,
              lineCount,
              endCloumn: token.length + 1,
              port: port,
              jump: !!port,
            });
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

export default consoleLine
