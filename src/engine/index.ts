import { readFile } from "fs/promises";

const engine = {
  async render(templateName: string = "main", viewName: string) {
    let templateContent: string | undefined;
    let viewContent: string | undefined;

    await Promise.allSettled([
      (templateContent = await readFile(
        `views/layouts/${templateName}.html`,
        "utf-8"
      )),
      (viewContent = await readFile(`views/${viewName}.html`, "utf-8")),
    ]);

    if (!templateContent) throw new Error("No template");
    if (!viewContent) throw new Error("No view");

    return templateContent.replace("{{body}}", viewContent);
  },
};

export default engine;
