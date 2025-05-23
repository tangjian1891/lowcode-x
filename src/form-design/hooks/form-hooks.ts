import { computed } from "vue";

export const useQuickForm = (formStore) => {
  // 表单基础属性
  const baseAttribute = computed(() => {
    return {
      grid: 24,
      labelWidth: "120px",
      labelPosition: "right",
    };
  });

  return {
    baseAttribute,
  };
};
