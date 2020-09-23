<template>
  <v-container fluid>
    <v-form
      @submit.prevent="getPosts"
    >
      <v-row
        align="center"
      >
        <v-col
          cols="12"
          sm="10"
          md="8"
        >
          <v-text-field
            v-model="query"
            outlined
            hide-details
            placeholder="キーワードを入力"
            autofocus
          />
        </v-col>
        <v-col
          cols="12"
          sm="2"
          md="4"
        >
          <v-btn
            color="primary"
            @click="getPosts"
          >
            検索する
          </v-btn>
        </v-col>
        <v-col
          cols="12"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                検索結果{{ posts.length }}件
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-if="loading">
            <div class="text-center">
              <v-progress-circular
                indeterminate
                color="grey"
              />
            </div>
          </template>
          <template v-else>
            <v-list class="py-0">
              <template v-if="posts.length">
                <v-list-item
                  v-for="(post, i) in posts"
                  :key="i"
                  :to="$store.getters.linkTo('posts', post)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ post.fields.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item class="justify-center">
                  <div class="text-center">
                    <p>
                      キーワードに一致する投稿がありません。
                    </p>
                    <v-icon>
                      mdi-emoticon-cry-outline
                    </v-icon>
                  </div>
                </v-list-item>
              </template>
            </v-list>
          </template>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  data() {
    return {
      query: '',
      posts: [],
      loading: false
    }
  },
  computed: {
    isRequired() {
      return !!this.query && !/^\s+$/.test(this.query)
    }
  },
  watch: {
    '$route.query.q': {
      handler(newVal) {
        this.query = newVal
        this.getPosts()
      },
      immediate: true
    }
  },
  methods: {
    async getPosts() {
      if (this.isRequired) {
        this.loading = true
        await client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          query: this.query
        })
          .then(({ items }) => (this.posts = items))
          .catch(console.error)
        this.loading = false
      }
    }
  }
}
</script>
