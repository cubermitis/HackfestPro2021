<template>
  <b-tab title="Kanban Board">
    <div class="margin">
      <b-row><div class="spacer-100"></div></b-row>
      <b-row>
        <b-col cols="4">
          <b-card header="To do">
            <div v-for="task in toDoTasks" :key="task.id">
              <b-card>{{ task.description }}</b-card>
              <br />
            </div>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card header="In progress">
            <div v-for="task in inProgressTasks" :key="task.id">
              <b-card>{{ task.description }}</b-card>
              <br />
            </div>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card header="Done">
            <div v-for="task in doneTasks" :key="task.id">
              <b-card>{{ task.description }}</b-card>
              <br />
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-tab>
</template>

<script>
import axios from "axios";

export default {
  name: "KanbanTab",
  data() {
    return {
      kanbanTasks: [],
    };
  },
  computed: {
    toDoTasks: function () {
      const toDoTasks = [];
      for (const task of this.kanbanTasks) {
        if (task.status === "TO_DO") {
          toDoTasks.push(task);
        }
      }
      return toDoTasks;
    },
    inProgressTasks: function () {
      const inProgressTasks = [];
      for (const task of this.kanbanTasks) {
        if (task.status === "IN_PROGRESS") {
          inProgressTasks.push(task);
        }
      }
      return inProgressTasks;
    },
    doneTasks: function () {
      const doneTasks = [];
      for (const task of this.kanbanTasks) {
        if (task.status === "DONE") {
          doneTasks.push(task);
        }
      }
      return doneTasks;
    },
  },
  methods: {
    getKanbanTasks() {
      axios
        .get("/api/kanban_tasks")
        .then((response) => {
          this.kanbanTasks = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getKanbanTasks();
  },
};
</script>
<style scoped>
.spacer-100 {
  margin-top: 100px;
}
.margin {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
