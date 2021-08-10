<template>
    <div class="container">
        <div>
            <h1 class="title">404</h1>
            <div class="links">
                <nuxt-link
                        to="/"
                        class="button--green"
                >
                    main page
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Component } from 'nuxt-property-decorator';

  @Component()
  export default class Hello extends Vue {

    head() {
      return {
        title: '404',
      };
    };
  }
</script>

<style lang="scss" scoped>
    h1 {
        color: red;
    }
</style>
