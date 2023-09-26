export function generateTime() {
  const date = new Date();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return `${hour}:${minutes}:${seconds}`;
}

export function generateLogTitle() {
  return `"%c[CONSOLE-LINE - ${generateTime()}]: `;
}

export function generateLogTitleStyle() {
  return `"color:#3A6F28;padding:2px 5px;font-weight:700;"`
}

export function generateFileLocation(location) {
  return `%c---Location: ${location}  `;
}
export function generateFileLocationStyle() {
  return `"color: #00A29B;"`;
}

export function generateLine(lineCount) {
  return `%c---Line: ${lineCount}`
}

export function generateLineStyle() {
  return `"color: #9E6BB5;"`;
}

export function generateNewLine() {
  return '%c\\n"'
}
export function generateNewLineStyle() {
  return `"color: inherit"`;
}
