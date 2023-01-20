export interface IRankMonthRecipeList {
  recipeComment: number;
  recipeCreate: string;
  recipeId: number;
  recipeLike: number;
  recipePath1: string;
  recipeTitle: string;
  view: number;
}

export interface IRankMonth {
  recipeId: number;
  recipeTitle: string;
  recipeList: IRankMonthRecipeList[];
  recipeWriter: string;
  recipePath1: string;
  recipeComment: number;
  recipeView: number;
  recipeLike: number;
}
