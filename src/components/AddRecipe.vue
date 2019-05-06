<template>
  <div class="add-recipe container">
    <h2 class="center-align indigo-text">
      Add Recipe
    </h2>
    <form @submit.prevent="addRecipe">
      <div class="field title">
        <label for="title">
          Recipe Title:
        </label>
        <input
          v-model="title"
          type="text"
          name="title"
        >
      </div>
      <div
        v-for="(ing, i) in ingredients"
        :key="i"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          v-model="ingredients[i]"
          type="text"
          name="ingredient"
        >
        <i
          class="material-icons delete"
          @click="deleteIng(ing)"
        >
          delete
        </i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">
          Add An Ingredient:
        </label>
        <input
          v-model="another"
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
        >
      </div>
      <div class="field center-align">
        <p
          v-if="feedback"
          class="red-text"
        >
          {{ feedback }}
        </p>
        <button class="btn lightgreen">
          Add Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';
export default {
  name: 'AddRecipe',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null,
    };
  },
  methods: {
    addRecipe() {
      if (this.title) {
        this.feedback = null;

        // create slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~>()'"!\-:@]/g,
          lower: true,
        });

        //Add to database firestore
        db
          .collection('recipes')
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: 'Index' });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.feedback = 'You must enter a recipe title';
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient.';
      }
    },
    deleteIng(Ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        if (ingredient === Ing) {
          return false;
        } else {
          return true;
        }
      });
    },
  },
};
</script>

<style>
.add-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-recipe .field {
  margin: 20px auto;
}
</style>
