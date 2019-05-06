<template>
  <div
    v-if="recipe"
    class="edit-recipe"
  >
    <h2>
      Edit the "{{ recipe.title }}" Recipe
    </h2>
    <form @submit.prevent="editRecipe">
      <div class="field title">
        <label for="title">
          Recipe Title:
        </label>
        <input
          v-model="recipe.title"
          type="text"
          name="title"
        >
      </div>
      <div
        v-for="(ing, i) in recipe.ingredients"
        :key="i"
        class="field"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          v-model="recipe.ingredients[i]"
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
          Update Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'EditRecipe',
  data() {
    return {
      recipe: null,
      another: null,
      feedback: null,
    };
  },
  created() {
    let ref = db
      .collection('recipes')
      .where('slug', '==', this.$route.params.recipe_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
      });
    });
  },
  methods: {
    editRecipe() {
      //Add to database firestore
      console.log(this.recipe.title, this.recipe.ingredients);
      if (this.recipe.title) {
        this.feedback = null;

        // create slug
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: '-',
          remove: /[$*_+~>()'"!\-:@]/g,
          lower: true,
        });

        //Add to database firestore
        db
          .collection('recipes')
          .doc(this.recipe.id)
          .update({
            title: this.recipe.title,
            ingredients: this.recipe.ingredients,
            slug: this.recipe.slug,
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
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a value to add an ingredient.';
      }
    },
    deleteIng(Ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
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
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}

.edit-recipe .delete {
  color: #aaa;
  position: absolute;
  right: 0px;
  bottom: 16px;
  font-size: 1.5em;
  cursor: pointer;
}
</style>

