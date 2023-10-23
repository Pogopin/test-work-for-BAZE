<script setup>
	import { BaseButton } from '@/components/ui/index.js';
	import { defineProps, defineEmits } from 'vue';

	const props = defineProps({
		data: {
			type: Object,
			require: true
		}
	})
	const emits = defineEmits(['update:isVisible'])
	function getImageUrl (name) {
    return new URL('@/assets/image/' + name, import.meta.url).href
	}
</script>
<template>
  <div class="modal__bottom-top">
		<h2 class="modal__bottom-top-org">Организация</h2>
			<div class="modal__bottom-top-btn">
				<BaseButton					
					title="Редактировать"
					customButton="custom_button"
					@click="emits('update:isVisible')"
				>
					<template	#default>
						<img src="@/assets/image/icon/edit.svg" alt="icon-plus">
					</template>
				</BaseButton>
			</div>
	</div>
	<div class="modal__bottom-content">
		<div class="modal__bottom-block block__type">
			<p class="modal__bottom-block-title">Тип</p>
			<p class="modal__bottom-block-text">{{props.data.typeOrg}}</p>
		</div>
	<div class="modal__bottom-block block__name">
		<p class="modal__bottom-block-title">Название организации</p>
		<p class="modal__bottom-block-text">{{props.data.orgName}}</p>
	</div>
	<div class="modal__bottom-block block__description">
		<p class="modal__bottom-block-title">Описание</p>
		<p class="modal__bottom-block-text">{{props.data.description}}</p>
	</div>
	<div class="modal__bottom-block block__logo">
		<p class="modal__bottom-block-text">Логотип</p>		
		<div class="modal__bottom-logo">			
			<img :src="props.data.imageUrl" alt="">
		</div>
	</div>	
	</div>
</template>

<style scoped>
.modal__bottom-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
}
.modal__bottom-block {
	margin-bottom: 12px;
}
.modal__bottom-block-title {
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: #656565;
}
.modal__bottom-block-text {
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
	color: #353535;
}
.modal__bottom-logo {
	width: 180px;
	height: 180px;
	border-radius: 8px;
	border: 1px solid #EDEDED;
}
.modal__bottom-logo img {
	width: 100%;
	height: 100%;
  object-fit: cover;
}
</style>