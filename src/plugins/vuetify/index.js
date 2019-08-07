import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#209D79',
        secondary: '#116E39',
        accent: '#1E528B',
        common: '#49595e'
      },
    }
  },
  icons: {
    iconfont: 'md', // default - only for display purposes
  },
})
