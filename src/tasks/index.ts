export default function runTasks() {
  const currentDir = require.context(".");
  const taskPathList = currentDir.keys();

  taskPathList.forEach((taskPath) => {
    const taskName = taskPath.replace(/^\.\//, "");
    if (taskName.endsWith(".ts") && taskName !== "index.ts") {
      const task = currentDir(taskPath).default as Function;
      task();
    }
  });
}
