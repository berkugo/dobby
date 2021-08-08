<template>
  <v-app>
    <v-navigation-drawer
      permanent
      class="green darken-4"
      clipped
      width="150"
      app
    >
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      elevation="1"
      clipped-left
      color="green darken-4"
      dark
      dense
      fade-img-on-scroll
      class="white-text"
    >
      <v-toolbar-title>Dobby Petshop Ürün Yönetimi</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="">
        <v-row justify="start" align="start">
          <v-col cols="6" sm="12" md="12">
            <v-text-field
              full-width
              color="green darken-4"
              clear-icon="mdi-clear"
              clearable
              label="Barkod numarasını girin"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto" md="12" lg="12"
            ><v-data-table class="ma-2 elevation-1"></v-data-table
          ></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
