<template>
  <el-dialog
    :title="title"
    :model-value="visible"
    :before-close="onClose"
    :width="width + 'px'"
    :close-on-click-modal="false"
  >
    <div class="container" :style="{ height: height + 'px' }">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="onClose">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
interface DialogProps {
  title: string
  visible: boolean
  width: number
  height: number
}

const props = withDefaults(defineProps<DialogProps>(), {
  title: '标题',
  visible: false,
  width: 600,
  height: 250
})

const emit = defineEmits(['onClose', 'onConfirm'])

// 关闭弹框的方法
const onClose = () => {
  emit('onClose')
}
const onConfirm = () => {
  emit('onConfirm')
}
</script>

<style scoped>
.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
}

.el-dialog__header {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  background-color: #009688 !important;
  padding: 10px;
}

.el-dialog__title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}

.el-dialog__headerbtn {
  padding-right: 20px;
}

.el-dialog__close {
  color: #fff;
  margin-top: 20px;
}

.el-dialog__body {
  padding: 10px;
}

.el-dialog__footer {
  border-top: 1px solid #e8eaec !important;
  padding: 10px;
}
</style>
