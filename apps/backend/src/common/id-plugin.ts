import * as mongoose from "mongoose";

// 为所有 Schema 添加虚拟 id 属性的插件
export function idPlugin(schema: mongoose.Schema) {
  // 设置 toJSON 转换器，将 _id 转换为 id
  schema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      //   delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  // 设置 toObject 转换器，确保在 toObject() 时也能正确转换
  schema.set("toObject", {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      //   delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  // 添加虚拟 id 属性
  schema.virtual("id").get(function () {
    return this._id;
  });
}

// 全局应用插件
mongoose.plugin(idPlugin);
