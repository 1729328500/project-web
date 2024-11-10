<template>
  <el-select
    v-model="selectedOptions"
    multiple
    clearable
    placeholder="请选择"
    :popper-append-to-body="false"
    @remove-tag="removeTag"
    style="width: 100%"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <el-checkbox v-model="item.check" @change="isChecked(item)">
        {{ item.label }}
      </el-checkbox>
    </el-option>
    <div class="is-all">
      <div @click="selectAll(true)">全选</div>
      <div @click="selectAll(false)">反选</div>
    </div>
  </el-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// 定义下拉的数据类型
type SelectItem = {
  value: string | number
  label: string
  check: boolean
}
// 接收父组件的参数
const props = defineProps({
  options: {
    type: Array<SelectItem>,
    required: true
  },
  width: {
    type: Number,
    default() {
      return 220
    }
  },
  bindValue: {
    type: Array<string | number>,
    default() {
      return []
    }
  }
})

// 注册事件
const emit = defineEmits(['selected'])

// 下拉的数据
let selectedOptions = ref<Array<string | number>>([])

// 下拉的点击事件
const isChecked = (item: SelectItem) => {
  if (item.check && !selectedOptions.value.includes(item.value)) {
    selectedOptions.value.push(item.value)
  } else if (!item.check) {
    selectedOptions.value = selectedOptions.value.filter(
      (elm) => elm !== item.value
    )
  }
  emit('selected', selectedOptions.value)
}

const removeTag = (value: any) => {
  props.options.forEach((elm) => {
    if (elm.value == value) {
      elm.check = false
    }
  })
  emit('selected', selectedOptions.value)
}

// 全选
const selectAll = (isAll: boolean) => {
  if (isAll) {
    selectedOptions.value = []
    props.options.forEach((item: SelectItem) => {
      item.check = true
      selectedOptions.value.push(item.value)
    })
  } else {
    selectedOptions.value = []
    props.options.forEach((item: SelectItem) => {
      item.check = false
      if (selectedOptions.value.includes(item.value)) {
        selectedOptions.value = selectedOptions.value.filter(
          (value) => value !== item.value
        )
      }
    })
  }
  emit('selected', selectedOptions.value)
}

// 清空下拉的数据
const clear = () => {
  selectedOptions.value = []
}

// 暴露出去，给外部组件使用
defineExpose({ clear })

// watch监听
watch(
  () => props.bindValue,
  () => {
    // 设置选中的值
    selectedOptions.value = props.bindValue
    // 设置checkbox为选中
    props.bindValue.forEach((item) => {
      const found = props.options.find((dom) => dom.value === item)
      if (found) {
        found.check = true
      }
    })
  },
  { immediate: true }
)
</script>

<style lang="scss">
.is-all {
  display: flex;
  justify-content: space-between; /* 确保元素之间有适当的间距 */
  padding-left: 10px;
  div {
    cursor: pointer;
    margin: 6px 10px;
    transition: 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
