<template>
  <div>
    <breadcrumbs />
     <div
      v-for="(tag, i) in tags"
      :key="i"
    >
      <nuxt-link
        :to="linkTo('tags', tag)"
      >
        {{ tag.fields.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['linkTo'])
  }
}
</script>
