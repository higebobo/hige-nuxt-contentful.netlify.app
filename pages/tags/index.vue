<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <div
     v-for="(tag, i) in tags"
     :key="i"
    >
      <nuxt-link
        :to="linkTo('tags', tag)"
      >
        {{ tag.fields.title }}
        ({{ postCount(tag) }}件)
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['linkTo']),
    postCount() {
      return (currentTag) => {
        return this.$store.getters.associatePosts(currentTag).length
      }
    },
    addBreads() {
      return [{ icon: 'mdi-tag-outline', text: 'タグ一覧', to: '/tags', disabled: true, iconColor: 'grey' }]
    }
  }
}
</script>
