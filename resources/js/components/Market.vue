<template>
    <v-container>
        <v-card class="mx-auto">
            <v-card-title class="text-h5">
                Market information
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    class="elevation-1"
                ></v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>


<script>
  export default {
    props  : [
        'headers',
        'items'
    ]
  }
</script>
