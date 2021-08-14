<template>
  <v-app>
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
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="6" sm="12" md="12">
            <v-text-field
              autofocus
              @click:clear="filteredProducts = products"
              @input="filter"
              class="ma-2"
              full-width
              clearable
              type="number"
              color="green darken-4"
              dense
              label="Barkod numarasını girin"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto" md="12" lg="12"
            ><v-data-table
              :headers="headers"
              @click:row="handleClick"
              :items="filteredProducts"
              class="ma-2 elevation-1"
            ></v-data-table
          ></v-col>
        </v-row>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 green white--text lighten-2">
              Ürün Satış
            </v-card-title>

            <v-card-text>
              <span class="title red--text font-weight-bold"
                >KDV Dahil Net Tutar:
                {{ productToSell["KDVDahilNetTutar"] }} TL</span
              >
            </v-card-text>
            <v-text-field
              v-model="price"
              outlined
              @input="calculateCars"
              label="Satış fiyatı giriniz"
              type="number"
              class="ma-2"
              full-width
            ></v-text-field>
            <v-divider></v-divider>
            <v-card-text>
              <span class="title red--text font-weight-bold"
                >Kar Oranı(%): %{{ karRate.toFixed(2) }}</span
              >
            </v-card-text>
            <v-card-text>
              <span class="title red--text font-weight-bold"
                >Kar Miktarı(TL): {{ kar.toFixed(2) }} TL</span
              >
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Satış Yap
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

  mounted() {
    this.fetchData();
  },

  methods: {
    calculateCars(value) {
      if (value > this.productToSell["KDVDahilNetTutar"]) {
        this.karRate = parseFloat(
          (100 * (value - this.productToSell["KDVDahilNetTutar"])) /
            this.productToSell["KDVDahilNetTutar"]
        );
        this.kar = parseFloat(value - this.productToSell["KDVDahilNetTutar"]);
      }
    },

    filter(text) {
      this.filteredProducts = this.products.filter((value) => {
        if (!text) return true;
        if (text.length == 0) return true;
        else return value["Barkod"].toString().includes(text);
      });
    },

    handleClick(value) {
      this.dialog = true;
      this.productToSell = value;
    },

    async fetchData() {
      const result = await axios.get("http://localhost:3000/getdata");
      this.products = result.data;
      this.filteredProducts = this.products;
    },
  },

  watch: {
    dialog(visible) {
      if (visible) {
        this.kar = 0;
        this.karRate = 0;
        this.price = 0;
      }
    },
  },

  data() {
    return {
      dialog: false,
      karRate: 0,
      kar: 0,
      price: 0,
      productToSell: {},
      headers: [
        {
          text: "Barkod",
          align: "start",
          sortable: false,
          value: "Barkod",
        },
        { text: "Kodu", value: "Kodu" },
        { text: "Ürün", value: "Ad" },
        { text: "Brüt Tutar", value: "BrutTutar" },
        { text: "Toplam Brüt Tutar", value: "ToplamBrutTutar" },
        { text: "Iskonto Tutar", value: "IskontoTutar" },
        { text: "Iskonto Oran (%)", value: "IskontoOran" },
        { text: "KDV Harici Net Tutar", value: "KDVHaricNetTutar" },
        { text: "KDV Oranı", value: "KdvYuzde" },
        { text: "KDV Dahil Net Tutar", value: "KDVDahilNetTutar" },
      ],
      products: [],
      filteredProducts: [],
    };
  },
};
</script>
