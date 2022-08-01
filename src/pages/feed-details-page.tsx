import { useEffect, useState,  } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl, checkResponse } from '../services/API'
import { TIngredientDetailsProps, TOrderItem, TwsMessage } from '../utils/types'
import { FeedDetails } from './feed-details'

export const FeedDetailsPage = ({ modal }: TIngredientDetailsProps) => {
    const { number } = useParams<{ number?: string }>();
    const [oneOrder, setOneOrder] = useState<TOrderItem | null>(null)

    useEffect(() => {
        fetch(`${baseUrl}/orders/${number}`)
            .then(checkResponse<TwsMessage>)
            .then(res => {
                if (res && res.success) {
                    setOneOrder(res.orders[0]);
                }
            }).catch(err => {
                console.log(err)
            })
    })
    return (
        < FeedDetails
            orderProps={oneOrder}
            modal={modal}
        />
    )
}