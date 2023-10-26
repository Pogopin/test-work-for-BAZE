<script setup>
import { BaseButton } from "../ui/index.js";
import { Block3 } from "@/components/index.js";
import { ref, computed } from "vue";

import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { selectOrganizations } from "@/config/config.js";
import { useDropZone } from "@vueuse/core";

const refDropZone = ref();
const inputt = ref();
const inputData = ref({
  typeOrg: "",
  orgName: "",
  description: "",
  imageUrl: "",
});
const isTrue = ref(false);
const isVisibleBlock = ref(false);
const { isOverDropZone } = useDropZone(refDropZone, onDrop);

function onDrop(files) {
  const file = files[0];
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    ElMessage.error("Avatar picture must be JPG or PNG format!");
    return;
  }
  if (!inputData.value.imageUrl) {
    inputData.value.imageUrl = URL.createObjectURL(file);
  }
}
function onInputChange(event) {
  onDrop(event.target.files);
}
function saveData() {
  isTrue.value = true;
  // console.log('save')
  // const obj = Object.entries(inputData.value);
  for (let el in inputData.value) {
    if (inputData.value[el] === "") {
      ElMessage.error("НЕ Заполнено");
      isTrue.value = false;
      return;
    }
  }
  isVisibleBlock.value = false;
}
const inpDataForm = computed(() => {
  for (let el in inputData.value) {
    if (inputData.value[el] === "") {
      isTrue.value = false;
      return;
    } else {
      return inputData.value;
    }
  }
});
function clearForm() {
  const obj = Object.entries(inputData.value);
  for (let [key, entries] of obj) {
    inputData.value[key] = "";
  }
  isTrue.value = false;
}
</script>
<template>
  <div class="modal__container">
    <div class="modal__header">
      <h2 class="modal__header-title">Организация</h2>
      <p class="modal__header-text">Назване организации, логотип и описание</p>
      <div class="header__button">
        <BaseButton
          title="Добавить"
          @click="
            isVisibleBlock = true;
            isTrue = false;
          "
        >
          <template #default>
            <img src="@/assets/image/icon/plus_16.svg" alt="icon-plus" />
          </template>
        </BaseButton>
      </div>
    </div>

    <div class="modal__body" v-if="isVisibleBlock">
      <div class="modal__body-top">
        <h2 class="modal__body-top-org">Организация</h2>
        <div class="modal__body-top-btn">
          <BaseButton
            @click="clearForm"
            title="Отменить"
            customButton="custom_button"
          >
            <template #default>
              <img src="@/assets/image/icon/cross.svg" alt="icon-plus" />
            </template>
          </BaseButton>
        </div>
      </div>
      <form class="modal__body-form">
        <div class="modal__body-input block__type">
          <label class="block-input-type"
            ><img
              class="block-input-img"
              src="@/assets/image/icon/star_.svg"
              alt="star-icon"
            />Тип</label
          >
          <el-select
            v-model="inputData.typeOrg"
            class="m-2 block-input"
            placeholder="Select"
          >
            <el-option
              v-for="item in selectOrganizations"
              :key="item.id"
              :value="item.type"
            />
          </el-select>
        </div>
        <div class="modal__body-input block__name">
          <label class="block-input-name"
            ><img
              class="block-input-img"
              src="@/assets/image/icon/star_.svg"
              alt="star-icon"
            />Название организации</label
          >
          <el-input placeholder="Please input" v-model="inputData.orgName" />
        </div>
        <div class="modal__body-input">
          <label class="block-input-description"
            ><img
              class="block-input-img"
              src="@/assets/image/icon/star_.svg"
              alt="star-icon"
            />Описание</label
          >
          <el-input
            v-model="inputData.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </div>

        <div class="modal__body-input block__avatar">
          <label class="block-input-logo"
            ><img
              class="block-input-img"
              src="@/assets/image/icon/star_.svg"
              alt="star-icon"
            />Логотип</label
          >
          <div class="avatar-uploader" ref="refDropZone">
            <div class="avatar-uploader-img">
              <img
                v-if="inputData.imageUrl"
                :src="inputData.imageUrl"
                class="avatar"
              />
            </div>
            <div class="block__avatar-content" v-if="!inputData.imageUrl">
              <p class="block__avatar-content-title">
                Загрузите изображение или перетащите файл сюда
              </p>
              <p class="block__avatar-content-text">
                Максимальный размер изображения 10 Мб.<br />Допустимые форматы:
                .jpeg .png .webp .svg
              </p>

              <label class="block__avatar-content-input">
                <!-- <input type="file" name="avatar-image" ref="inputt">			@change="onInputChange"				 -->
                <input
                  type="file"
                  name="avatar-image"
                  @change="onInputChange"
                />
                <span
                  ><img
                    src="@/assets/image/icon/plus_16.svg"
                    alt="icon-plus"
                  />Загрузить</span
                >
              </label>
            </div>
          </div>
        </div>
      </form>
      <BaseButton
        title="Сохранить"
        customButton="btn-large"
        @click="saveData"
      />
    </div>
    <div class="modal__bottom" v-if="inpDataForm && isTrue">
      <Block3
        :data="inpDataForm"
        @update:isVisible="
          isVisibleBlock = true;
          isTrue = false;
        "
      />
    </div>
  </div>
</template>
<style scoped>
.block__avatar-content-input {
  position: relative;
  display: inline-block;
}
.block__avatar-content-input span {
  position: relative;
  font-weight: 500;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  border-radius: 6px;
  background-color: #e8f2fe;
  line-height: 22px;
  padding: 4px 8px 4px 8px;
  border-color: transparent;
  color: #045cc4;
}
.block__avatar-content-input input[type="file"] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}

.modal__container {
  max-width: 770px;
  margin: 0 auto;
}
.modal__header,
.modal__body,
.modal__bottom {
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  color: #353535;
}
.modal__header-title,
.modal__body-top-org {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 20px;
}
.modal__header-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 16px;
}
.header__button {
  text-align: center;
}
.modal__body {
  margin-top: 24px;
}
.modal__body-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
@media screen and (max-width: 375px) {
  .modal__body-top {
    justify-content: center;
    gap: 7px;
  }
}
.modal__body-top-org {
  margin: 0;
}
.block-input {
  width: 100%;
}
.modal__body-input {
  margin-bottom: 16px;
}
.block-input-type,
.block-input-name,
.block-input-description,
.block-input-logo {
  color: #0a0a0a;
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;
  vertical-align: super;
}
.block-input-img {
  vertical-align: text-top;
}
.block__avatar-content {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
}
.block__avatar-content-title {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #353535;
  margin-bottom: 2px;
}
.block__avatar-content-text {
  font-size: 14px;
  line-height: 20px;
  color: #656565;
  margin-bottom: 16px;
}
.avatar-uploader {
  border: 1px dashed #c8c8c8;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 16px;
  text-align: center;
  height: 142px;
}
@media screen and (max-width: 522px) {
  .avatar-uploader {
    height: 10rem;
  }
}
@media screen and (max-width: 421px) {
  .avatar-uploader {
    height: 11rem;
  }
  .block__avatar-content-title {
    font-size: 14px;
  }
  .block__avatar-content-text {
    font-size: 12px;
  }
}
@media screen and (max-width: 379px) {
  .avatar-uploader {
    height: 13rem;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: black;
}
.avatar-uploader-img {
  width: 200px;
  height: 100%;
  background-size: cover;
  background-position: center;
  margin: auto;
}
.avatar-uploader-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.modal__body-form {
  margin-bottom: 32px;
}

.modal__bottom {
  margin-top: 16px;
}
</style>
