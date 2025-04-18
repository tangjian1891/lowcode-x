<template>
  <div class="" @click="emit('change')">
    <!-- <slot name="default" :qwer="qwer"></slot> -->
    <div>{{ $attrs.qwer1 }} 这是啊啊</div>
  </div>
</template>
<!-- 
<script lang="ts" setup>
const emit = defineEmits(['change'])

const qwer = ref('123123')
</script> -->
<script lang="ts">
// export default defineComponent({
//   name: 'Child-123',
//   data() {
//     return {
//       qwer: '123123',
//     }
//   },
//   methods: {},
// })

export default {
  methods: {},
  setup(props, context) {
    watch(
      () => context.attrs.qwer1,
      (newVal) => {
        console.log('newVal', newVal)
      },
    )
    watch(
      () => props.qwer,
      (newVal) => {
        console.log('newVal', newVal)
      },
    )
    context.expose({})
    return {}
  },
  mounted() {},
  props: ['qwer'],
}
</script>

<style lang="scss" scoped></style>
