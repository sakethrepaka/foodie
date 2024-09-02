import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name:'name',
      type:'string',
      title:'Name of dish',
      validation:(Rule) =>Rule.required()
    },
    {
      name:'image',
      type:'image',
      title:'image of dish',
    },
    {
      name:'short_description',
      type:'string',
      title:'Short description',
      validation:(Rule) => Rule.max(200)
    },
    {
      name:'price',
      type:'number',
      title:'price of the dish',
    }
  ]

})
