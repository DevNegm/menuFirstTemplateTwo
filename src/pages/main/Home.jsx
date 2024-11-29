import React, { useEffect, useState } from 'react'
import classes from './Home.module.scss'
import exitem from '../../assets/exitem.png'
import burgetEx from '../../assets/burgetEx.png'
import Cards from '../../components/ui/Cards'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getProducts } from '../../store/slices/mainReducer'
import { CircularProgress } from '@mui/material'
import {Fade} from 'react-awesome-reveal'
import { FaLeaf, FaPepperHot } from 'react-icons/fa'
import { MdClose, MdDelete, MdShoppingCart } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
const Home = () => {
  const [size, setSize] = useState(8)
  const navigate = useNavigate()
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'المشروبات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg'
    },
    {
      id: 2,
      name: 'المقبلات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg'
    },
    {
      id: 3,
      name: 'السلطات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg'
    },
    {
      id: 4,
      name: 'المشروبات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg'
    },
    {
      id: 5,
      name: 'المقبلات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg'
    },
    {
      id: 6,
      name: 'السلطات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg'
    },
    {
      id: 7,
      name: 'المشروبات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg'
    },
    {
      id: 8,
      name: 'المقبلات',
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
    },
  ])
  const [products, setProducts] = useState([
    {
      id: 1,
      categoryId: 1,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 2,
      categoryId: 1,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 3,
      categoryId: 2,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 4,
      categoryId: 2,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        { id: 1, name: 'طعام حار', icon: <FaPepperHot style={{ color: '#B80E0B' }} /> },
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        // {id:4, name:'حار جدا',icon:'🔥'},
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 5,
      categoryId: 3,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 6,
      categoryId: 3,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        { id: 1, name: 'طعام حار', icon: <FaPepperHot style={{ color: '#B80E0B' }} /> },
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        // {id:4, name:'حار جدا',icon:'🔥'},
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 7,
      categoryId: 4,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 8,
      categoryId: 4,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 9,
      categoryId: 5,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 10,
      categoryId: 5,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        { id: 1, name: 'طعام حار', icon: <FaPepperHot style={{ color: '#B80E0B' }} /> },
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        // {id:4, name:'حار جدا',icon:'🔥'},
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 11,
      categoryId: 6,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        { id: 2, name: 'يحتوي علي الجبن', icon: '🍟' },
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 12,
      categoryId: 6,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 13,
      categoryId: 7,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 14,
      categoryId: 7,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        { id: 1, name: 'طعام حار', icon: <FaPepperHot style={{ color: '#B80E0B' }} /> },
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        // {id:4, name:'حار جدا',icon:'🔥'},
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 3,
      categoryId: 8,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
    {
      id: 15,
      categoryId: 8,
      name: 'برجر',
      description: 'برجر الدجاج عبارة عن لحم دجاج أبيض طري القوام من الداخل ولذيذ الطعم ومغطى بطبقة كرسبي مقرمشة هذا المزيج يجمع بين عصارة الدجاج وطبقة الكرسبي المقرمشة المميزة باللون الذهبي والتي تضيف قرمشة لذيذة في كل قضمة',
      price: 75,
      image: 'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
      types: [
        // {id:1, name:'طعام حار',icon:<FaPepperHot style={{color:'#B80E0B'}} />},
        // {id:2, name:'يحتوي علي الجبن',icon:'🍟'},
        // {id:3, name:'نباتي',icon:<FaLeaf style={{color:'green'}} />},
        { id: 4, name: 'حار جدا', icon: '🔥' },
        // {id:5, name:'مناسب للاطفال',icon:'👦🏻'},
      ],
      variants: [
        {
          id: 1, name: 'اضافة بصل', price: 75
        },
        { id: 2, name: 'اضافة جبن', price: 75 },
        { id: 3, name: 'اضافة طماطم', price: 75 },
        { id: 4, name: 'اضافة خس', price: 75 },
        { id: 5, name: 'اضافة صلصة', price: 75 },
        { id: 6, name: 'اضافة مايونيز', price: 75 },
        { id: 7, name: 'اضافة مخلل', price: 75 },
      ]
    },
  ])
  const [cart, setCart] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [item, setItem] = useState(null)
  const [openExtra, setOpenExtra] = useState(false)
  const [count, setCount] = useState(1)
  const handleModal = (item) => {
    setShowModal(true)
    setItem(item)
  }
  const handleClose = (e) => {
    if (e.target.classList.contains(classes.modal)) {
      setShowModal(false);
      setOpenExtra(false);
    } else if (e.target.classList.contains(classes.cartmodal)) {
      setShowCartModal(false)
      setOpenExtra(false);
    }
  };

  const handleAddToCart = (item) => {
    const itemIndex = cart?.findIndex(i => i?.id === item?.id);
    if (itemIndex !== -1) {
      setCart(
        cart.map(i =>
          i?.id === item?.id
            ? { ...i, count: i?.count + (item?.count || 1) }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, count: item?.count || 1 }]);
    }
    setCartAdded(true);
  };




  const dispatch = useDispatch()
  const { productsLoading } = useSelector(state => state.main)
  const [active, setActive] = useState(1);
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    setActive(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };





  useEffect(() => {
    // dispatch(getCategories()).then((res) => {
    //   // setCategories(res?.payload)
    //   // setActive(res?.payload?.[0]?.id)
    // })
    // dispatch(getProducts()).then((res) => {
    //   setProducts(res?.payload)
    // })
  }, [])


  if (productsLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "calc(100% - 35rem)",
          height: "100vh",
        }}
      >
        <CircularProgress size={'1.5rem'} style={{ color: '#B57EDC' }} />
      </div>
    )
  }

  return (
    <section className={classes.container}>
      <div className={classes.sectionOne}>
        <div className={classes.sectionHeader}>
          <h3>الاصناف</h3>

        </div>
        <div className={classes.items}>
          {categories?.map((item, i) => (
            <Fade cascade damping={0.1}>
              <div
                onClick={() => handleScroll(item?.id)}
                key={item?.id}
                className={active === item?.id ? classes.activeItem : classes.item}
              >
                <img src={item?.image || exitem} alt={i + 1} />
                <p>{item?.name}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
      {showModal && (
        <div className={classes.modal} onClick={handleClose}>
          <div className={classes.modalContent}>
            <button style={{ backgroundColor: '#B57EDC' }} className={classes.close} onClick={() => setShowModal(false)}><MdClose /></button>
            <img src={item?.image} alt="example" />
            <div className={classes.modalText}>
              <h4>{item?.name}</h4>
              <p>{item?.description}</p>
              <p>السعر: <span style={{ color: '#B57EDC' }}>{item?.price}₪</span></p>
              <div className={classes.extras} >
                <button onClick={() => setOpenExtra(!openExtra)}>الاضافات <IoIosArrowDown style={{ transform: openExtra && 'rotate(180deg)', transition: 'all 250ms ease-in-out' }} /></button>
                {openExtra && <div className={classes.extrasContent}>
                  {item?.variants?.map((item, index) => (
                    <div className={classes.item} key={index}>
                      <p>{item?.name}</p>
                      <p>السعر: <span style={{ color: '#B57EDC' }}>{item?.price}₪</span></p>
                    </div>
                  ))}
                </div>}
              </div>
            </div>
          </div>
        </div>
      )}
      {showCartModal && (
        <div className={classes.cartmodal} onClick={handleClose}>
          <div className={classes.modalContent}>
            <button style={{ backgroundColor: '#B57EDC' }} className={classes.close} onClick={() => setShowCartModal(false)}><MdClose /></button>
            <div className={classes.cartItems}>
              {!cart?.length && <h4 style={{ textAlign: 'center' }}>لا يوجد منتجات في السله</h4>}
              {cart?.map((item, index) => (
                <div className={classes.cartItem} key={index}>
                  <img src={item?.image} alt="example" />
                  <div className={classes.cartItemText}>
                    <h4>{item?.name}</h4>
                    <p>{showMore[item?.id] ? item?.description : item?.description?.slice(0, 50) + '...'} <span style={{ color: '#B57EDC', cursor: 'pointer' }} onClick={() => setShowMore({ ...showMore, [item.id]: !showMore[item.id] })}>{showMore[item?.id] ? 'رؤية اقل' : 'رؤية المزيد'}</span></p>
                    <p>السعر: <span style={{ color: '#B57EDC' }}>{item?.price}₪</span></p>
                    <div className={classes.extras} >
                      <button onClick={() => setOpenExtra({ ...openExtra, [item.id]: !openExtra[item.id] })}>الاضافات <IoIosArrowDown style={{ transform: openExtra[item?.id] && 'rotate(180deg)', transition: 'all 250ms ease-in-out' }} /></button>
                      {openExtra[item.id] && <div className={classes.extrasContent}>
                        {item?.variants?.map((item, index) => (
                          <div className={classes.item} key={index}>
                            <p>{item?.name}</p>
                            <p>السعر: <span style={{ color: '#B57EDC' }}>{item?.price}₪</span></p>
                          </div>
                        ))}
                      </div>}
                    </div>
                    <p>العدد: {item?.count}</p>
                    <button className={classes.remove} onClick={() => {
                      const newCart = cart.filter(el => el?.id !== item?.id)
                      setCart(newCart)
                    }}>
                      <MdDelete />
                      <span>ازالة من السله</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {categories?.map((item, i) => (
        <Cards
          sectionId={item?.id}
          header={item?.name}
          data={products?.filter(el => el?.categoryId === item?.id)}
          handleAddToCart={handleAddToCart}
          handleModal={handleModal}
        />
      ))}
      <button className={classes.cart} onClick={() => setShowCartModal(true)}>
        <MdShoppingCart />
        <span>{cart?.length}</span>
      </button>
    </section>
  )
}

export default Home