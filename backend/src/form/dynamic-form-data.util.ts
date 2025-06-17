import * as mongoose from "mongoose";
import { Form } from "./form.schema";
import { Connection } from "mongoose";

// 获取表单配置，生成schema对象
export async function getFormDataModel(formId: string, connection: mongoose.Connection, formModel: mongoose.Model<Form>) {
  const modelName = `form_data_${formId}`;
  if (connection.models[modelName]) {
    return connection.models[modelName];
  }
  // 获取表单配置
  const form = await formModel.findById(formId).lean();
  if (!form || !Array.isArray(form.fields)) {
    throw new Error("表单配置不存在或无fields");
  }
  // 构建schema对象
  const schemaObject = form.fields.reduce((obj, field) => {
    obj[field.id] = { type: String };
    return obj;
  }, {});
  const schema = new mongoose.Schema(schemaObject, { timestamps: true });
  return connection.model(modelName, schema);
}
