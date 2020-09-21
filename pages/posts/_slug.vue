<template>
  <v-container fluid>
    <template v-if="currentPost">
      <v-breadcrumbs :items="breadcrumbs">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
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
    </template>

    <template v-else>
      お探しの記事は見つかりませんでした。
    </template>

    <div>
      <v-btn
        outlined
        color="primary"
        to="/"
      >
        <v-icon size="16">
          fas fa-angle-double-left
        </v-icon>
        <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import client from '~/plugins/contentful'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['setEyeCatch']),
    breadcrumbs() {
      const category = this.currentPost.fields.category
      return [
        { text: 'ホーム', to: '/' },
        { text: category.fields.title, to: '#' }
      ]
    }
  },
  async asyncData({ env, params }) {
    let currentPost = null
    await client.getEntries({
      content_type: env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': params.slug
    }).then(res => (currentPost = res.items[0])).catch(console.error)

    return { currentPost }
  }
}
</script>
