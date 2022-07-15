export interface IIngredients {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    key?: string,
    index?: number,
}

export type TIngredientDetailsProps = {
    modal: boolean,
};

export interface IFormState {
    name?: string;
    email?: string;
    password?: string
}

export type TResetResponse = {
    success: boolean;
    message: string;
  }