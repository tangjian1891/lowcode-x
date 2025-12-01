export const AddRuleButton = defineComponent({
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
      return !!len ? `已设置${props.subject}` : `设置${props.subject}`;
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
