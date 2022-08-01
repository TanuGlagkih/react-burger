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
    modal?: boolean,
    orderProps?: TOrderItem | null
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

export type TLoginResponce = {
    accessToken: string,
    refreshToken: string,
    success: boolean,
    user: {
        email: string,
        name: string
    }
}

export type TUserResponce = {
    success: boolean,
    user: {
        email: string,
        name: string
    }
}

export type TTokenResponce = {
    accessToken: string,
    refreshToken: string,
    success: boolean
}

export type IOrderDetailsResponce = {
    name: string,
    order: { number: number },
    number: number,
    success: boolean
}

export type TDataResponce = {
    data: Array<IIngredients>,
    success: boolean
}

export type TOrderItem = {
    ingredients: Array<string>,
    _id: string,
    owner?: string,
    status: string,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    key?: string,
    __v?: number,
 }

export type TwsMessage = {
    success: boolean,
    orders: Array<TOrderItem>,
    total?: number,
    totalToday?: number
} 

export type TOneOrderResponce = {
    success: boolean,
    orders: Array<TOrderItem>,
    }