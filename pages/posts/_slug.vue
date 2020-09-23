<template>
  <v-container fluid>
    <breadcrumbs :add-items="addBreads" />

    {{ currentPost.fields.title }}
    <v-img
      :src="setEyeCatch(currentPost).url"
      :alt="setEyeCatch(currentPost).title"
      :aspect-ratio="16/9"
      width="700"
      height="400"
      class="mx-auto"
    />
    {{ currentPost.fields.pubDate }}<br>
    <div v-html="$md.render(currentPost.fields.body)"></div>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['setEyeCatch', 'linkTo']),
    addBreads() {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.category.fields.title,
          to: this.linkTo('categories', this.category)
        }
      ]
    }
  },
  async asyncData({ payload, store, params, error }) {
    const currentPost = payload || await store.state.posts.find(post => post.fields.slug === params.slug)

    if (currentPost) {
      //console.log('ahou: ' + currentPost.fields.category)
      return {
        currentPost,
        category: currentPost.fields.category
      }
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>
