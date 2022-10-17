<template>
  <v-app>
    <!-- использовал библиотеку готовых компонентов - Vuetify -->
    <v-row class="tab__wrapper">
      <v-col cols="12">
        <!-- таблица -->
        <v-data-table
          dense
          :headers="GET_HEADERS"
          :items="GET_USERS"
          item-key="id"
          group-by="parent"
          sort-by.sync="parent"
          sort-desc.sync="true"
          show-group-by
          hide-default-footer
          class="elevation-1"
        >
          <!-- убирает лишнюю функцию в таблице, к сожалению, иначе нельзя) -->
          <template v-slot:[`group.header`]="{ items }">
            <th colspan="12">
              {{ items[0].parent }}
            </th>
          </template>
          <!-- убирает лишнюю функцию в таблице, к сожалению, иначе нельзя) -->

          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>

              <!-- основное модальное окно -->
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    rounded
                  >
                    Добавить
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="GET_EDITED_ITEM.nameChild"
                            label="Имя"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="GET_EDITED_ITEM.phone"
                            label="Телефон"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="GET_EDITED_ITEM.parent"
                            :items="GET_USERS.map(x => x.parent)"
                            label="Начальник"
                            dense
                            height="44"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Отменить
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- основное модальное окно -->

              <!-- модальное окно удаления -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Удалить?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Отмена</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- модальное окно удаления-->
            </v-toolbar>
          </template>
          <!-- Редактирование -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <!-- Редактирование -->

          <!-- пустая таблица -->
          <template v-slot:no-data>
            <p>Пусто :)</p>
          </template>
          <!-- пустая таблица -->
        </v-data-table>
        <!-- таблица -->
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "mainTable",
  data() {
    return {
      dialog: false,
      dialogDelete: false
    };
  },

  computed: {
    formTitle() {
      return this.GET_EDITED_INDEX === -1
        ? "Добавление пользователя"
        : "Редактирование";
    },
    ...mapGetters([
      "GET_USERS",
      "GET_USERS_INITIAL",
      "GET_HEADERS",
      "GET_EDITED_ITEM",
      "GET_DEFAULT_ITEM",
      "GET_EDITED_INDEX"
    ])
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  mounted() {
    // инициализация таблицы, если пользователь зашел впервые
    // или проверка на существующую таблицу
    this.initialize();
  },

  methods: {
    ...mapActions([
      "UPDATE_EDITED_ITEM",
      "UPDATE_USERS",
      "UPDATE_EDITED_INDEX"
    ]),
    // методы с local storage
    setUsersLocalStorage(user) {
      localStorage.setItem("users", JSON.stringify(user));
    },
    getUsersLocalStorage() {
      return localStorage.getItem("users");
    },
    // методы с local storage
    initialize() {
      if (!this.getUsersLocalStorage()) {
        this.UPDATE_USERS(this.GET_USERS_INITIAL);
        this.setUsersLocalStorage(this.GET_USERS);
      } else {
        this.UPDATE_USERS(JSON.parse(this.getUsersLocalStorage()));
      }
    },

    editItem(item) {
      this.UPDATE_EDITED_INDEX(this.GET_USERS.indexOf(item));
      this.UPDATE_EDITED_ITEM(item);
      this.dialog = true;
      this.setUsersLocalStorage(this.GET_USERS);
    },

    deleteItem(item) {
      this.UPDATE_EDITED_INDEX(this.GET_USERS.indexOf(item));
      this.UPDATE_EDITED_ITEM(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.GET_USERS.splice(this.GET_EDITED_INDEX, 1);
      this.setUsersLocalStorage(this.GET_USERS);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.UPDATE_EDITED_ITEM(this.GET_DEFAULT_ITEM);
        this.UPDATE_EDITED_INDEX(-1);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.UPDATE_EDITED_ITEM(this.GET_DEFAULT_ITEM);
        this.UPDATE_EDITED_INDEX(-1);
      });
    },

    save() {
      if (this.GET_EDITED_INDEX > -1) {
        Object.assign(
          this.GET_USERS[this.GET_EDITED_INDEX],
          this.GET_EDITED_ITEM
        );
        this.setUsersLocalStorage(this.GET_USERS);
      } else {
        let max = Math.max(...this.GET_USERS.map(x => x.id));
        this.GET_EDITED_ITEM.id = max + 1;
        this.UPDATE_USERS(this.GET_EDITED_ITEM);
        this.setUsersLocalStorage(this.GET_USERS);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
.tab__wrapper {
  display: flex;
  width: 700px;
  margin: 0 auto;
}
</style>
