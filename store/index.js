import defaultEyeCatch from '~/assets/images/900x600.png'
import client from '~/plugins/contentful'

export const state = () => ({
  posts: [],
  categories: [],
  tags: []
})

export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.image && !!post.fields.image.fields) return { url: `https:${post.fields.image.fields.file.url}`, title: post.fields.image.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  draftChip: () => (post) => {
    if (!post.fields.pubDate) return 'draftChip'
  },
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
  relatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      if (category.sys.id === catId) posts.push(state.posts[i])
    }
    return posts
  },
  associatePosts: state => (currentTag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.tags) {
        const tag = post.fields.tags.find(tag => tag.sys.id === currentTag.sys.id)

        if (tag) posts.push(post)
      }
    }
    return posts
  }
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  //setCategories(state, payload) {
  //  state.categories = payload
  //  //console.log(state.categories)
  //}
  setLinks(state, entries) {
    state.tags = []
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      //console.log('hage: ' + entry.sys.contentType.sys.id)
      if (entry.sys.contentType.sys.id === process.env.CTF_BLOG_TAG_TYPE_ID) {
        //state.tags.push(entry.fields.title)
        state.tags.push(entry)
        //console.log('tag push suruyo: ' + entry)
      }
      else if (entry.sys.contentType.sys.id === process.env.CTF_BLOG_CATEGORY_TYPE_ID) {
        console.log('hagechabin: ' + entry)
        state.categories.push(entry)
      }
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
  }
}

export const actions = {
  async getPosts({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.pubDate',
      include: 1
    //}).then((res) => {
    //  console.log(res)
    //  commit('setPosts', res.items)
    //}).catch(console.error)
    }).then((res) => {
      commit('setLinks', res.includes.Entry)
      commit('setPosts', res.items)
    }).catch(console.error)
  }//,
  //async getCategories({ commit }) {
  //  await client.getEntries({
  //    content_type: process.env.CTF_BLOG_CATEGORY_TYPE_ID,
  //    order: 'fields.sort'
  //  }).then(res =>
  //    commit('setCategories', res.items)
  //  ).catch(console.error)
  //}
}
