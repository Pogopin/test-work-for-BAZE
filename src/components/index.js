import { defineAsyncComponent } from 'vue'

const Modal = defineAsyncComponent(() => import('./modal/index.vue'));
const Block3 = defineAsyncComponent(() => import('./block3/index.vue'));

export { Modal, Block3 }