<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app

      style="max-height: 100vh;"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <h1 v-for="(index, i) character in characters.result" :key="character.id">{{ character }}</h1> -->

      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-text-field placeholder="Search..."></v-text-field>
      <v-spacer /> -->

     <!-- <h1 v-for="(char, i) in gen3_species" :key="i">{{char.name}}</h1> -->
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-btn @click="getPokeAPI()">GQL Call</v-btn>
    </v-app-bar>
    <v-main style="padding-bottom: 0px;">

      <v-container fluid class="fill-height pa-0 ma-0">
        <Nuxt />

      </v-container>

    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <!-- <v-list-item @click.native="right = !right"> -->
        <v-list-item @click="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-footer style="z-index: 1;"
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->

  </v-app>
</template>

<script>

import gql from 'graphql-tag'

const samplePokeAPIquery = gql`
  query samplePokeAPIquery {
  gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}) {
    name
    id
  }
  generations: pokemon_v2_generation {
    name
    pokemon_species: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
}
`;

export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'QuestApp'
    }
  },
  created () {
    console.log('DefaultLayout created')
    // this.getPokeAPI();
  },
  methods: {
    getPokeAPI() {
      this.$apollo.query({
        query: samplePokeAPIquery
      }).then(({data}) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  // apollo: {
  //   gen3_species: {
  //     query: samplePokeAPIquery,
  //     prefetch: true,
  //   },
  // },
}
</script>

// apollo: {
//     clients: {
//       query() {
//         return gql`
//           query clients {
//             client: client {
//               id
//               name
//               subDomain
//               color
//               logo
//             }
//           }
//         `
//       },
//       update: data => data.client
//     }
//   }
