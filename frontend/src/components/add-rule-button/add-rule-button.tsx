export const addRuleButton = defineComponent({
  props: {
    subject: String, //显隐规则
    length: [Number, Array], //条数
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, expose) {
    const length = computed(() => {
      if (Array.isArray(props.length)) {
        return props.length.length;
      }
      return props.length;
    });
    const buttonContext = computed(() => {
      const len = length.value;
      const fix = ["数据范围", "排序", "自定义按钮", "设置"];
      if (fix.includes(props.subject)) {
        return !!len ? `已设置 ` : `设置`;
      } else {
        return !!len ? `已设置${props.subject}` : `${props.subject}设置`;
      }
    });
    return { buttonContext, expose };
  },
  render() {
    const slots = {
      icon: this.expose.slots?.icon
        ? () => {
            return <>{this.expose.slots.icon()}</>;
          }
        : null,
    };
    return (
      <el-button disabled={this.disabled} style="width: 100%;border: 1px solid #dce0e5;" v-slots={slots}>
        {this.buttonContext}
      </el-button>
    );
  },
});
