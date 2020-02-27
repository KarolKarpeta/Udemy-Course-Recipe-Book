import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

private recipes: Recipe[] = [
    new Recipe(
        'Schabowy',
        'No naprawdę pyszny schabowy. Klasyka polskiej kuchni.',
        'https://static.smaker.pl/photos/6/3/4/634320b0d13462d3176f0896942fa7f0_110705_57b32fe3190aa_wm.jpg',
        [
            new Ingredient('schab ze świniaka', 1),
            new Ingredient('parnierka', 1)
        ]),
    new Recipe('Pierogi leniwe',
    'Jak na Kolejowej.',
    'https://d3iamf8ydd24h9.cloudfront.net/pictures/articles/2019/08/1065827-v-1500x1500.jpg',
    [
        new Ingredient('ser', 1),
        new Ingredient('monka', 1),
        new Ingredient('reszta', 1)
    ]),
];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
}
