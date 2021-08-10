<template>
  <v-app>
    <v-main class="white">

      <template>
        <v-row justify="center">
          <v-dialog
              v-model="dialog"
              max-width="500"
          >
            <v-card>
              <v-card-title class="text-h5">
                {{dialogMessage}}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="dialogHandler"
                >
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>

      <v-container fluid>
        <v-row justify="center" align-content="center" align="center">
          <v-col cols="11" xs="11" sm="6" md="5" lg="4">
            <v-card rounded="lg" class="grey lighten-5 elevate">
              <v-form class="d-flex flex-column flex-grow-1 align-self-stretch pa-5">
                <v-btn-toggle v-model="toggle_exclusive" @change="setSuggestion">
                  <v-row>
                    <v-col
                        v-for="(value,index) in computedValues"
                        :key="value"
                        cols="6"
                        sm="6"
                        md="4"
                        class="pa-1"
                    >
                      <v-btn
                          :color="index === toggle_exclusive ? 'primary' : 'normal'"
                          elevation="2"
                          block
                          x-large
                          class="pa-0"
                      >
                        <FormattedValue
                            :value="value"
                            :symbol="selectedCurrency.symbol || ''"
                        />
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-btn-toggle>

                <v-row class="mt-10">
                  <v-col cols="10" xs="10" sm="9" lg="10" class=" pa-0">
                    <v-text-field
                        label="Amount"
                        v-model="suggestion"
                        :prefix="selectedCurrency.symbol || ''"
                        hide-details="auto"
                        @keyup="typeSuggestionHandler"
                        @keydown="typeSuggestionHandler"
                        :rules="inputValidationRules"
                    />
                  </v-col>

                  <v-col cols="2" xs="2" sm="3" lg="2" class="pa-0">
                    <v-select
                        v-model="selectedCurrency"
                        :items="currencies"
                        item-text="code"
                        item-value="name"
                        return-object
                        hide-details="auto"
                    />
                  </v-col>

                </v-row>

                <v-row class="mt-10">
                  <v-col cols="12 pa-1">
                    <v-btn
                        block
                        x-large
                        @click="submitHandler"
                        :loading="isProcessing"
                    >
                      Donate
                    </v-btn>
                  </v-col>

                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script src="./index.js"></script>
<style scoped></style>
