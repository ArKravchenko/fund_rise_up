<template>
  <i18n-n v-if="value && typeof(value) === 'number'"
          :value="value"
          format="currency"
          :locale="locale"
  >
    <template v-slot:currency="slotProps">
      <span>{{
          symbol
        }}</span>
    </template>
    <template v-slot:integer="slotProps">
      <span>{{ slotProps.integer }}</span>
    </template>
    <template v-slot:group="slotProps">
      <span>{{ slotProps.group }}</span>
    </template>
    <template v-slot:decimal="slotProps">
    </template>
    <template v-slot:fraction="slotProps">
    </template>
  </i18n-n>
</template>
<script src="./FormattedValue.js" lang="js"></script>

<style></style>
