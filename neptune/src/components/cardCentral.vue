<template>
  <v-layout>
    <v-flex>
      <v-card>
           <v-container fluid grid-list-md>
             <v-layout row wrap>
               <v-flex xs12 md6 lg3
              v-for="item in items"
              :key="item.room.mac">

            <v-card>
                <v-card-media
                  src="https://www.citizenm.com/cache/images/meeting_room_01-1_89f02075ea04b021e.jpg"
                  height="300px">
                </v-card-media>

                <v-card-title primary-title>

                  <div>
                    <h3 class="headline mb-0">{{item.room.name}}</h3>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn color="indigo" icon @click="show = !show">
                    <v-icon color="white">edit</v-icon>
                  </v-btn>
                </v-card-title>

                <v-list>
                  <template v-for="sensor in item.room.sensors">
                    <v-list-tile :key="sensor.mac">
                      <v-list-tile-action>
                        <v-icon medium>{{sensor.icon}}</v-icon>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title>{{sensor.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{sensor.mac}}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                            <v-switch
                              v-model="sensor.state"
                              @click.native="switchChange(sensor)"
                            ></v-switch>
                      </v-list-tile-action>
                    </v-list-tile>
                    </template>
                  
                </v-list>
            </v-card>
      </v-flex>
      </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { connect } from "mqtt";
import AppVue from '@/App.vue';
import CentralPane from '@/views/CentralPane.vue';
var objcardCentral = null;
const client = connect("ws://192.168.0.104", { port: 9001 });

export default {
  name: "cardCentral",
  data: () => ({
    items: [
      {
        room: {
          name: "Sala Santos",
          mac: "1",
          sensors: [
            {
              icon: "fas fa-bolt",
              name: "Luz da mesa",
              mac: "5c:cf:7f:bd:51:03",
              state: false,
              sensor: "SR-BD5107"
            },
            {
              icon: "fas fa-plug",
              name: "Tomada da tv",
              mac: "5c:cf:7f:bd:51:07",
              state: false,
              sensor: "SR-BD5107"
            }
          ]
        }
      }
    ]
  }),
  created: function(){
    objcardCentral = this;
    return;
  },
  methods: {
    switchChange(data) {
      var lightState = 0;
      if (data.state == true) lightState = 1;
      client.publish(data.sensor + "/relay/0/set", lightState.toString());
      return;
    }
  }
}

client.subscribe("SR-BD5107/relay/0/set");

client.on("message", function (topic, payload) {
  var readState = false;
  if (payload == '1') readState = true;
  objcardCentral.items[0].room.sensors[0].state = readState;
  objcardCentral.items[0].room.sensors[1].state = readState;
  //console.debug(this.$data.items[0].room);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
