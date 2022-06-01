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
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
       -->
      <v-btn v-if="this.$store.state.user.accessToken === null"
        color="success"
        @click="overlay = !overlay">
        {{overlay ? 'Close' : 'Log In'}}
      </v-btn>
      <v-btn v-else color="warning" @click="$store.commit('logOut')">Log Out</v-btn>
    </v-app-bar>

    <v-main style="padding-bottom: 0px;">
      <v-container fluid class="fill-height pa-0 ma-0">
        <Nuxt />
      </v-container>
    </v-main>

    <!-- Login -->
    <v-overlay :z-index="0" :value="overlay" :absolute="true">
      <v-container>
        <v-row>
          <v-col>
            <v-card class="pa-5" style="outline: 1px solid white;">
              <v-card-actions>Login
                <v-row class="justify-end">
                  <v-btn small color="warning" @click="overlay = !overlay"><v-icon>mdi-close</v-icon></v-btn>
                </v-row>
              </v-card-actions>
              <v-text-field v-model="temp_phone" placeholder="Phone" type="text"></v-text-field>
              <v-text-field v-model="temp_pass" placeholder="Password" type="password"></v-text-field>
              <v-btn color="success" @click="logIn(); overlay = !overlay">Log In</v-btn>
              <v-btn color="blue" @click="reveal = !reveal">Register</v-btn>
              <v-expand-transition>
                <v-card style="" v-if="reveal" class="pa-5 transition-fast-in-fast-out v-card--reveal">
                  <v-card-actions>Register
                    <v-row class="justify-end">
                    <v-btn color="warning" small @click="reveal = !reveal"><v-icon>mdi-close</v-icon></v-btn>
                  </v-row>
                  </v-card-actions>
                  <v-text-field v-model="temp_phone" placeholder="Phone" type="text"></v-text-field>
                  <v-text-field v-model="temp_pass" placeholder="Password" type="password"></v-text-field>
                  <v-btn color="success" @click="register(); overlay = !overlay">Register</v-btn>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>

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

// const samplePokeAPIquery = gql`
// query samplePokeAPIquery {
//   gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}) {
//     name
//     id
//   }
//   generations: pokemon_v2_generation {
//     name
//     pokemon_species: pokemon_v2_pokemonspecies_aggregate {
//       aggregate {
//         count
//       }
//     }
//   }
// }`;


export default {
  name: 'DefaultLayout',
  data () {
    return {
      temp_phone: '',
      temp_pass: '',
      reveal: false,
      overlay: false,
      clipped: true,
      drawer: false,
      fixed: false,
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
    },
    logIn(){
      this.$apollo.mutate({
        mutation: gql`
        mutation{
          localLogin(input:{phoneNumber: "${this.temp_phone}", password:"${this.temp_pass}"}) {
            userId
            accessToken
          }
        }`
      }).then(({data}) => {
        console.log(data);
        this.$store.commit('setUser', data.localLogin);
        this.temp_phone = '';
        this.temp_pass = '';
        this.reveal = false;
      }).catch((error) => {
        console.log(error);
      });
    },
    register(){
      this.$apollo.mutate({
        mutation: gql`
        mutation{
          localRegistration(input:{phoneNumber: "${this.temp_phone}", password:"${this.temp_pass}"}) {
            id
            createdAt
            phoneNumber
          }
        }`
      }).then(({data}) => {
        console.log(data);
        this.logIn();
        this.temp_phone = '';
        this.temp_pass = '';
        this.reveal = false;
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

<style scoped>
.v-card--reveal {
  bottom: 0px;
  left: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
