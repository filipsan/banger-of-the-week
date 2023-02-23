<template>
    <b-list-group-item class="d-flex align-items-center">
        <b-avatar class="mr-3"></b-avatar>
        <span class="mr-auto">{{this.name}}</span>
        <b-badge>5</b-badge>
    </b-list-group-item>
</template>

<script>
export default {
  props: {
    name: String
  }

}
</script>
