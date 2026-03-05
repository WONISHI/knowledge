<template>
  <div class="vant-icon-display">
    <ClientOnly>
      <div v-for="(icons, category) in iconCategories" :key="category" class="category-block">
        <h3>{{ categoryNames[category] || category }}</h3>
        <div class="icon-grid">
          <div 
            v-for="icon in icons" 
            :key="icon" 
            class="icon-item"
            @click="copyIconCode(icon)"
          >
            <van-icon :name="icon" size="32" />
            <span class="icon-name">{{ icon }}</span>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 直接引入 @vant/icons 的配置字典（包含了所有图标的名称分类）
import iconConfig from '@vant/icons/src/config';

// 定义图标分类数据
const iconCategories = ref({
  basic: iconConfig.basic,
  outline: iconConfig.outline,
  filled: iconConfig.filled
});

const categoryNames = {
  basic: '基础图标 (Basic)',
  outline: '线框风格 (Outline)',
  filled: '实底风格 (Filled)'
};

// 点击复制功能
const copyIconCode = async (iconName) => {
  const code = `<van-icon name="${iconName}" />`;
  try {
    await navigator.clipboard.writeText(code);
    // 这里简单用原生 alert，你也可以换成自己集成的 Toast 提示
    alert(`复制成功: ${code}`); 
  } catch (err) {
    console.error('复制失败', err);
  }
};
</script>

<style scoped>
.vant-icon-display {
  margin-top: 20px;
}
.category-block {
  margin-bottom: 30px;
}
.category-block h3 {
  margin-bottom: 16px;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
}
.icon-item:hover {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.icon-name {
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
  word-break: break-all;
}
</style>