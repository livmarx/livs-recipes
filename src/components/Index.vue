<template>
  <div class="index container">
    <div
      v-for="recipe in recipes"
      :key="recipe.id"
      class="card"
    >
      <i
        class="material-icons delete"
        @click="deleteRecipe(recipe.id)"
      >delete</i>
      <ul class="card-content">
        <li>
          <h2 class="indigo-text">
            {{ recipe.title }}
          </h2>
          <ul class="ingredients">
            <li
              v-for="(ingredient, i) in recipe.ingredients"
              :key="i"
            >
              <span class="chip">
                {{ ingredient }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Index',
  data() {
    return {
      recipes: [],
    };
  },
  created() {
    //fetch data from the firestore
    db
      .collection('recipes')
      .get()
      .then(snapshot => {
        snapshot.forEach(document => {
          let recipe = document.data();
          recipe['id'] = document.id;
          this.recipes.push(recipe);
        });
        console.log(this.recipes);
      });
  },
  methods: {
    deleteRecipe(id) {
      // delete doc/recie from firestore
      db
        .collection('recipes')
        .doc(id)
        .delete()
        .then(() => {
          this.recipes = this.recipes.filter(recipe => {
            if (recipe.id.toString().match(id.toString())) {
              return false;
            } else {
              return true;
            }
          });
        });

      // Local delete (will be un-deleted when refreshed):
      // this.recipes = this.recipes.filter(recipe => {
      //   if (recipe.id.toString().match(id.toString())) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
