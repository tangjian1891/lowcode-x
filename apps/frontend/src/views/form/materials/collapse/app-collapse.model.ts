import { nanoid } from "nanoid";
import { MaterialType } from "../types";

export class AppCollapse {
  id = nanoid();
  type = MaterialType.AppCollapse;
  label = "折叠面板";
  icon = "Memo";

  fieldProps = {
    activeNames: ["1"],
    accordion: false,
  };

  // Collapse is often a container, but for now we keep it simple
  children = [];

  constructor() {
    this.id = nanoid();
  }
}
