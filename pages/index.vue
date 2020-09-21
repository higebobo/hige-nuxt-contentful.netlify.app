<template>
  <v-container fluid>
    <template v-if="posts.length">
      <ul v-for="(post, i) in posts" :key="i">
        <li>{{ post.fields.title }}</li>
        <ul>
          <v-img
            :src="post.fields.image.fields.file.url"
            :alt="post.fields.image.fields.title"
            :aspect-ratio="16/9"
            max-width="400"
            max-height="225"/>
          <li>{{ post.fields.pubDate }}</li>
        </ul>
        <div class="blog-content" v-html="$md.render(post.fields.body)"></div>
      </ul>
    </template>
    <template v-else>
      投稿された記事はありません。
    </template>
  </v-container>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  async asyncData({ env }) {
    let posts = []
    //console.log(env.CTF_BLOG_POST_TYPE_ID)
    await client.getEntries({
      content_type: env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.pubDate'
    }).then(res => (posts = res.items)).catch(console.error)
    return { posts }
  }
}
</script>
