import { MaterialEnum, FieldWidthEnum } from "@/enums";

export class TjUploadImage {
  id = nanoid();
  type = MaterialEnum.TjUploadImage;
  fieldProps = {
    autoCompress: false, // 是否自动压缩图片
  };
  valueProps = {
    type: ValueEnum.Default,
    value: [], // 默认值，已上传文件列表
  };
  authProps = {
    visible: true,
    enabled: true,
  };
  validateProps = {
    required: false,
    unique: false,
    maxSize: undefined, // 单文件最大大小（MB）
    maxCount: 10, // 最大上传数量
  };
  layoutProps = {
    type: FieldWidthEnum.FixedPercentage,
    value: 24,
  };
  formItemProps = {
    label: "文件上传",
    description: "", // 描述文本
  };
  enabledProps = {
    label: true,
    description: false,
  };
}

export class TjUploadFile extends TjUploadImage {
  type = MaterialEnum.TjUploadFile;
}
