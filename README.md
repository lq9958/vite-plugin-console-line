# vite-plugin-console-line

English [中文](./README_ZH.md)

> A vite plugin,that show your **console.log(xx)** file location and line number.

# Usage

```javascript
import consoleLine from "vite-plugin-console-line";

const viteConfig = defineConfig({
  // ...
  plugins: [consoleLine({ exclude: ["node_modules"], port: 9528 })],
  // ...
});
```

# Params

- **exclude** : the paths that you dont want to transform.

- **port** :
  If you want to navigate from the browser's console to the editor, you should set this field, and the field value should be the port of your proxy server.

When debugging in your code, you can view the file location and line numbers for **console.log()** statements in the browser's console. Clicking on the link will take you back to the editor and navigate to the location of the current **console.log()**.

![consolo.log()](./assets/image.png)

Sometimes you may only need to display the file location and line number for **console.log()**. In that case, you can omit the **port** field when passing the parameters.
![consolo.log()](./assets/image-simple.png)

# About **Open In Editor**

`open in editor` feature is depends on [launch-editor](https://github.com/yyx990803/launch-editor).
