import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import client, { urlFor } from '../sanity'
import { useEffect,useState } from 'react'


const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        client.fetch(
            `*[_type == "category"]`
        )
        .then((data) => {
            setCategories(data)
        })
    }, [])
    

    // console.log(categories,"hello")
    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }} horizontal showsHorizontalScrollIndicator={false}>
            
            {categories?.map((category)=>(
                <CategoryCard key={category._id} imgUrl={urlFor(category.image).width(200).url()} title={category.name}></CategoryCard>
            ))}
        </ScrollView>
    )
}

export default Categories