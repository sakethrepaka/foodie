import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name:'name',
      type:'string',
      title:'Restaurant name',
      validation:(Rule) =>Rule.required()
    },
    {
      name:'image',
      type:'image',
      title:'image of restaurant',
    },
    {
      name:'short_description',
      type:'string',
      title:'Short description',
      validation:(Rule) => Rule.max(200)
    },
    {
      name:'lat',
      type:'number',
      title:'Latitude of restaurant'
    },
    {
      name:'long',
      type:'number',
      title:'Longitude of restaurant'
    },
    {
      name:'address',
      type:'string',
      title:'Restaurant address',
      validation:(Rule) => Rule.required()
    },
    {
      name:'rating',
      type:'number',
      title:'Enter a Rating from (1-5 Stars)',
      validation:(Rule) => 
      Rule.required()
      .min(1)
      .max(5)
      .error("Please enter a number between 1 and 5")
    },
    {
      name:'type',
      title:'category',
      type:'reference',
      validation:(Rule) => Rule.required(),
      to:[{type:"category"}]
    },
    {
      name:'dishes',
      type:'array',
      title:'Dishes',
      of:[{type:'reference',to:[{type:'dish'}]}]
    }


  ],

})
