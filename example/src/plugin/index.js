const path = {};
const BaseURL = "http://localhost:";
const middlewareName = "__open-in-editor";
function generateTime() {
  const date = /* @__PURE__ */ new Date();
  const hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
  return `${hour}:${minutes}:${seconds}`;
}
function generateLogTitle() {
  return `"%c[CONSOLE-LINE - ${generateTime()}]:`;
}
function generateLogTitleStyle() {
  return `"color:#3A6F28;padding:2px 5px;font-weight:700;"`;
}
function generateFileLocation(location) {
  return `%cFile: ${location}  `;
}
function generateFileLocationStyle() {
  return `"color: #00A29B;"`;
}
function generateLine(lineCount) {
  return `%cLine: ${lineCount}\\n`;
}
function generateLineStyle() {
  return `"color: #9E6BB5;"`;
}
function generateAddress(port, filePath) {
  return `%cJump to: ${BaseURL + port}/${middlewareName}?file=${filePath}\\n`;
}
function generateAddressStyle() {
  return `"color: #6664C2;"`;
}
function generateNewLine() {
  return '%c\\n"';
}
function generateNewLineStyle() {
  return `"color: inherit"`;
}
function composeConsoleLog(components) {
  const { prefix, suffix, fileRelativePath, fileAbsolutePath, lineCount, endCloumn, port, jump } = components;
  return `${prefix + generateLogTitle() + generateFileLocation(fileRelativePath) + generateLine(lineCount) + (jump ? generateAddress(port, encodeURIComponent(`${fileAbsolutePath}:${lineCount}:${endCloumn}`)) : "") + `${generateNewLine()},${generateLogTitleStyle()},${generateFileLocationStyle()},${generateLineStyle()},` + (jump ? `${generateAddressStyle()},` : "") + `${generateNewLineStyle()},` + suffix}`;
}
function consoleLine(options) {
  return {
    name: "vite-plugin-console-line",
    transform(code, id) {
      const { exclude, port } = options;
      const projectDir = path.join(process.cwd());
      if (exclude.length) {
        for (let i = 0; i < exclude.length; i += 1) {
          const fileDir = path.join(projectDir, exclude[i]).replace(/\\/g, "/");
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
        let resultCode = "";
        codeList.forEach((token) => {
          if (token.search(consoleReg) >= 0) {
            const fileRelativePath = id.replace(projectDir.replace(/\\/g, "/"), "");
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
              port,
              jump: !!port
            });
            resultCode += `${ret}
`;
          } else {
            resultCode += `${token}
`;
          }
          lineCount += 1;
        });
        return { code: resultCode };
      }
      return { code };
    }
  };
}
export {
  consoleLine as default
};
