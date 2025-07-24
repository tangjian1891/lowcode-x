import { CopyDocument, Delete, Hide } from "@element-plus/icons-vue";
import styles from "./index.module.scss";

function width() {
  const { type, value } = this.field.layoutProps;
  if (type === FieldWidthEnum.Pixel) {
    return value + "px";
  } else if (type === FieldWidthEnum.FixedPercentage) {
    return (100 / 24) * value + "%";
  } else if (type === FieldWidthEnum.CustomPercentage) {
    return value + "%";
  }
}
function label() {
  return this.field.enabledProps.label ? this.field.formItemProps.label : "";
}
export const DesignWrap = defineComponent({
  name: "design-col",
  props: ["field", "data", "mask"],
  computed: {
    label,
    width,
    active() {
      return this.data.variables.activeField.id === this.field.id;
    },
  },
  render() {
    return (
      <el-col
        style={{ "--width": this.width }}
        class={[styles["wrap-container"], { [styles.active]: this.active }]}
        onClick={() => this.data.methods.clickField(this.field)}
      >
        <el-form-item label={this.label} required={this.field.validateProps.required}>
          {{
            label: () => (
              <>
                {this.label}
                {!this.field.authProps.visible && (
                  <el-icon>
                    <Hide />
                  </el-icon>
                )}
              </>
            ),
            default: () => this.$slots?.default(),
          }}
        </el-form-item>
        <div></div>
        <div class={[styles.mask]}>
          <div class={[styles["jas_oper_btn"]]}>
            <el-icon onClick={() => this.data.methods.copyField(this.field)}>
              <CopyDocument />
            </el-icon>
            <el-icon onClick={() => this.data.methods.deleteField(this.field)}>
              <Delete />
            </el-icon>
          </div>
        </div>
      </el-col>
    );
  },
});

export const RuntimeWrap = defineComponent({
  name: "runtime-col",
  props: ["field"],
  computed: {
    label,
    width,
  },
  render() {
    return (
      <el-col style={{ "--width": this.width }} class={[styles["wrap-container"]]}>
        <el-form-item label={this.label} required={this.field.validateProps.required}>
          {{
            label: () => {
              return <>{this.label}</>;
            },
            default: () => {
              return <div>{this.$slots?.default()}</div>;
            },
          }}
        </el-form-item>
      </el-col>
    );
  },
});
