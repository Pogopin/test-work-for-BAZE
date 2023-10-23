<template>
  <button
    class="btn"
    :class="props.customButton"
  >
		<slot/>
    {{ props.title }}    
	</button>
</template>

<style scoped>
.btn {
	padding: 4px 8px 4px 8px;
  background-color: #E8F2FE;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	border-radius: 6px;
	border-color:  transparent;
	display: flex;
  align-items: center;
  gap: 8px;
	margin: auto;
	cursor: pointer;
	color: #045CC4;
}
.custom_button {
  background-color: #EDEDED;
	color: #353535;
}
.btn-large {
	width: 100%;
	text-align: center;
	justify-content: center;
	background-color: #1588C9;
	color: white;
	padding: 12px 0 12px;
}
</style>

<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
    title: String,
    customButton: String
})
// const styleButton = computed(()=> {
//     return {
//         custom_button: props.customButton
//     }
// })
</script>
