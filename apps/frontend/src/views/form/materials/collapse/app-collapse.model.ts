import { nanoid } from "nanoid";
import { MaterialEnum } from "../input/app-input.model";

export class AppCollapse {
  id = nanoid();
  type = MaterialEnum.AppCollapse;
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
