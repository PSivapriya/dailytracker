import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiLineChart } from 'react-icons/bi'
import { FaCalendarCheck } from 'react-icons/fa'
import { MdWhatshot } from 'react-icons/md'
import { HiTemplate } from 'react-icons/hi'
import overthink from '../assets/overthink.png'
import Burn from '../assets/burstout.png'

export const NavbarMenu = [
    {
        id: 1,
        title:"Home",
        link:'/'
    },
    {
        id: 2,
        title:"Blogs",
        link:'/blogs'
    },
    {
        id: 3,
        title:"Contacts",
        link:'/contacts'
    },
    {
        id: 4,
        title:"About",
        link:'/about'
    },
]

export const AboutHabits = [
    {
        id: 1,
        title: "Built-in Reminders",
        desc: "Stay on track with smart reminders that nudge you at just the right time to build consistent habits.",
        icon:<AiOutlineClockCircle/> ,
    },
    {
        id: 2,
        title: "Progress Analytics",
        desc: "Visualize your growth with detailed charts and insights, helping you understand what’s working — and what’s not.",
        icon:<BiLineChart/> ,
    },
    {
        id: 3,
        title:"Streak Counter" ,
        desc:"Stay motivated with streak tracking that rewards consistency and pushes you to keep your momentum going." ,
        icon:<MdWhatshot/> ,
    },
    {
        id: 4,
        title: "Daily Check-ins",
        desc: "Develop accountability through quick daily check-ins that help reinforce your commitment and reflect on your progress.",
        icon:<FaCalendarCheck/> ,
    },
    {
        id: 5,
        title:"Custom Habit Templates" ,
        desc: "Jumpstart your routine with pre-made templates for fitness, mindfulness, productivity, and more.",
        icon: <HiTemplate/>,
    },

]

export const BlogsArticle = [
    {
        id:1,
        img:overthink,
        title: "Mindfulness for Overthinking: 8 Simple Ways to Quiet Your Mind",
        desc: "Worrying is like a rocking chair: it gives you something to do but never gets you anywhere",
    },
    {
        id: 2,
        img: Burn,
        title:"How to Recover from Burnout: 8 Daily Habits for Lasting Well-being" ,
        desc: "Learning how to recover from burnout is a journey that requires understanding what caused it and developing sustainable habits to heal and prevent future episodes.",
    },
]

export const UserMenu = [
    {
        id: 1,
        title:"Home",
        link:'/'
    },
    {
        id:2,
        title:"Dashboard",
        link:"/userHome"
    },
    {
        id: 3,
        title:"Our Schedule",
        link:'/ourSchedule'
    },
    {
        id: 4,
        title:"Manage Habits",
        link:'/manageHabits'
    },
    {
        id: 5,
        title:"History",
        link:'/history'
    },
    {
        id: 6,
        title:"Daily activities",
        link:'/dailyActivities'
    }
];

export const motivationalQuotes = [
    "Success is liking yourself, liking what you do, and liking how you do it",
    "To bring about change, you must not be afraid to take the first step.",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    "Instead of worrying about what you cannot control, shift your energy to what you can create.",
    "Accept yourself, love yourself, and keep moving forward. If you want to fly, you have to give up what weighs you down.",
    "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
    "Make improvements, not excuses. Seek respect, not attention.",
    "Start each day with a positive thought and a grateful heart.",
    "Life is about accepting the challenges along the way, choosing to keep moving forward, and savoring the journey.",
    "Never lose hope. Storms make people stronger and never last forever.",
];

export const successQuotes = [
     "Well done! Another day, another step forward!",
     "Success is the sum of small efforts repeated daily.",
     "You nailed it today. Keep up the streak!",
     "Success is liking yourself, liking what you do, and liking how you do it",

];

export const Schedule={
    SchoolStud:{
        weekday:[
            { time: "6:00 AM", activity:"Wake up & Freshen up"},
            { time: "6:30 AM", activity:"Morning Exercise/Yoga"},
            { time: "7:00 AM", activity:"Breakfast"},
            { time: "7:30 AM", activity:"Revise yesterday homeworks"},
            { time: "8:30 AM", activity:"Get ready for school"},
            { time: "9:00 AM - 4:00 PM", activity:"School hours"},
            { time: "4:30 PM -5:00 PM", activity:"Snacks & Rest"},
            { time: "6:00 PM", activity:"Playtime / Extracurricular ativities"},
            { time: "7:00 PM", activity:"Study"},
            { time: "8:00 PM", activity:"Dinner & Family time"},
            { time: "9:00 PM", activity:"Preparation for next day"},
            { time: "9:30 - 10:00 PM", activity:"Go to sleep"},
        ],
         weekend:[
            { time: "7:00 AM", activity:"Wakeup & breakfast"},
            { time: "8:00 AM", activity:"Extra homework/ Assignments"},
            { time: "10:00 Am", activity:"Outdoor activities"},
            { time: "12:30 PM", activity:"Lunch"},
            { time: "1:30 PM", activity:"Take rest"},
            { time: "2:00 PM", activity:"Indoor Activities"},
            { time: "4:00 PM", activity:"Assignment/ Study"},
            { time: "6:00 PM", activity:"Family outing / Enterntainment"},
            { time: "8:00 PM", activity:"Dinner"},
            { time: "9:00 PM", activity:"Self Care"},
            { time: "9:30 PM - 10:00 PM", activity:"Sleep"},
        ]
    },
     CollegeStud:{
        weekday:[
            { time: "6:00 AM", activity:"Wake up & Freshen up"},
            { time: "6:30 AM", activity:"Morning Exercise/Yoga"},
            { time: "7:00 AM", activity:"Breakfast"},
            { time: "7:30 AM", activity:"Check Schedule"},
            { time: "8:30 AM", activity:"Get ready for College"},
            { time: "9:00 AM - 4:00 PM", activity:"College hours"},
            { time: "4:30 PM -5:00 PM", activity:"Snacks & Rest"},
            { time: "5:00 PM", activity:"Internship/ Skill-building"},
            { time: "7:00 PM", activity:"Indoor activities"},
            { time: "8:00 PM", activity:"Dinner & Family time"},
            { time: "9:00 PM", activity:"Study & Assignments"},
            { time: "11:00 PM", activity:"Relaxation"},
            { time: "11:30 PM", activity:"Sleep"},
        ],
         weekend:[
            { time: "8:00 AM", activity:"Wakeup & breakfast"},
            { time: "9:00 AM", activity:"Extra homework/ Assignments"},
            { time: "12:00 Am", activity:"Skill building"},
            { time: "1:30 PM", activity:"Lunch"},
            { time: "2:00 PM", activity:"Indoor Activities"},
            { time: "5:00 PM", activity:"Assignment/ Study"},
            { time: "7:00 PM", activity:"Family outing / leisure"},
            { time: "9:00 PM", activity:"Self Care/ Extra task"},
            { time: "10:30 PM", activity:"Sleep"},
        ]
    },
     Prof_9to5_shift:{
        weekday:[
            { time: "6:30 AM", activity:"Wake up & Freshen up"},
            { time: "7:00 AM", activity:"Morning Exercise/Yoga"},
            { time: "7:30 AM", activity:"Breakfast"},
            { time: "8:00 AM", activity:"Check Schedule"},
            { time: "8:30 AM", activity:"Get ready for work"},
            { time: "9:00 AM - 5:00 PM", activity:"Work hours"},
            { time: "5:30 PM", activity:"Snacks & Rest"},
            { time: "6:30 PM", activity:"Hobby/Family time"},
            { time: "7:30 PM", activity:"Dinner"},
            { time: "8:00 PM", activity:"Skill building"},
            { time: "9:30 PM", activity:"Meditation/ SelfCare"},
            { time: "10:30 PM", activity:"Sleep"},
        ],
         weekend:[
            { time: "7:30 AM", activity:"Wakeup & breakfast"},
            { time: "8:00 AM", activity:"Leisure / Exercise"},
            { time: "10:00 Am", activity:"Skill building"},
            { time: "1:00 PM", activity:"Lunch"},
            { time: "2:00 PM", activity:"Indoor Activities / Family time"},
            { time: "5:00 PM", activity:"Planning for next week"},
            { time: "6:00 PM", activity:"leisure"},
            { time: "8:00 PM", activity:"Dinner & Entertainment"},
            { time: "10:30 PM", activity:"Sleep"},
        ]
    },
     Prof_ngtshift:{
        weekday:[
            { time: "7:00 AM", activity:"Reach home, light breakfast"},
            { time: "7:30 AM", activity:"Relaxation"},
            { time: "8:30 AM", activity:"Sleep"},
            { time: "3:30 PM", activity:"Wake up & Freshen up"},
            { time: "4:00 PM", activity:"Exercise / Short Walk"},
            { time: "4:30 PM", activity:"Meditaion / Self Care"},
            { time: "6:30 PM", activity:"Hobby/Family time"},
            { time: "5:00 PM", activity:"Brunch / heavy meals"},
            { time: "6:00 PM", activity:"Family time /Skill building"},
            { time: "7:30 PM", activity:"Get Ready for Work"},
            { time: "9:00 PM - 6:00 AM", activity:"Work hours"},
        ],
         weekend:[
            { time: "7:00 AM", activity:"Reach home, light breakfast"},
            { time: "7:30 AM", activity:"Relaxation"},
            { time: "8:30 AM", activity:"Sleep"},
            { time: "3:30 PM", activity:"Wake up & Freshen up"},
            { time: "4:00 PM", activity:"Exercise / Short Walk"},
            { time: "4:30 PM", activity:"Meditaion / Self Care"},
            { time: "6:30 PM", activity:"Hobby/Family time"},
            { time: "5:00 PM", activity:"Brunch / heavy meals"},
            { time: "6:00 PM", activity:"Family time /Skill building"},
            { time: "7:30 PM", activity:"Get Ready for Work"},
            { time: "9:00 PM - 6:00 AM", activity:"Work hours / Sleep"},
        ]
    },
     Prof_rotationalshift:{
        DayShift:{
            weekday:[
            { time: "4:30 AM", activity:"Wake up & Freshen up"},
            { time: "5:00 AM", activity:"Morning Exercise/Yoga"},
            { time: "5:30 AM", activity:"Breakfast & Get ready for work"},
            { time: "6:00 AM", activity:"Start Work"},
            { time: "10:00 AM", activity:"Snacks & hydration"},
            { time: "2:00 PM", activity:"Finish work"},
            { time: "3:00 PM", activity:"Lunch"},
            { time: "3:30 PM", activity:"Short nap"},
            { time: "5:00 PM", activity:"Family time"},
            { time: "7:30 PM", activity:"Dinner"},
            { time: "8:00 PM", activity:"Skill building"},
            {time: "10:00 PM", activity:"Sleep"},
        ],
         weekend:[
            { time: "7:30 AM", activity:"Wakeup & breakfast"},
            { time: "8:00 AM", activity:"Leisure / Exercise"},
            { time: "10:00 Am", activity:"Skill building"},
            { time: "1:00 PM", activity:"Lunch"},
            { time: "2:00 PM", activity:"Indoor Activities / Family time"},
            { time: "5:00 PM", activity:"Planning for next week"},
            { time: "6:00 PM", activity:"leisure"},
            { time: "8:00 PM", activity:"Dinner & Entertainment"},
            { time: "10:30 PM", activity:"Sleep"},
        ]
        },
        Afternoonshift:{
        weekday:[
            { time: "7:30 AM", activity:"Wake up & Freshen up"},
            { time: "8:00 AM", activity:"Morning Exercise/Yoga"},
            { time: "8:30 AM", activity:"Breakfast"},
            { time: "9:00 AM", activity:"Skill building"},
            { time: "12:30 PM", activity:"Lunch"},
            { time: "1:00 PM", activity:"Get ready for Work"},
            { time: "2:00 PM", activity:"Start work"},
            { time: "6:00 PM", activity:"Short snack time"},
            { time: "10:00 PM", activity:"End work"},
            { time: "10:30 PM", activity:"Dinner"},
            { time: "11:00 PM", activity:"Meditation/ SelfCare"},
            { time: "12:30 PM", activity:"Sleep"},
        ],
         weekend:[
            { time: "8:30 AM", activity:"Wakeup & breakfast"},
            { time: "9:00 AM", activity:"Leisure / Exercise"},
            { time: "10:00 Am", activity:"Skill building"},
            { time: "1:00 PM", activity:"Lunch"},
            { time: "2:00 PM", activity:"Indoor Activities / Family time"},
            { time: "5:00 PM", activity:"Planning for next week"},
            { time: "6:00 PM", activity:"leisure"},
            { time: "8:00 PM", activity:"Dinner & Entertainment"},
            { time: "10:30 PM", activity:"Sleep"},
        ]
    },
    nightShift:{
         weekday:[
            { time: "7:00 AM", activity:"Reach home, light breakfast"},
            { time: "7:30 AM", activity:"Relaxation"},
            { time: "8:30 AM", activity:"Sleep"},
            { time: "3:30 PM", activity:"Wake up & Freshen up"},
            { time: "4:00 PM", activity:"Exercise / Short Walk"},
            { time: "4:30 PM", activity:"Meditaion / Self Care"},
            { time: "6:30 PM", activity:"Hobby/Family time"},
            { time: "5:00 PM", activity:"Brunch / heavy meals"},
            { time: "6:00 PM", activity:"Family time /Skill building"},
            { time: "7:30 PM", activity:"Get Ready for Work"},
            { time: "9:00 PM - 6:00 AM", activity:"Work hours"},
        ],
         weekend:[
            { time: "7:00 AM", activity:"Reach home, light breakfast"},
            { time: "7:30 AM", activity:"Relaxation"},
            { time: "8:30 AM", activity:"Sleep"},
            { time: "3:30 PM", activity:"Wake up & Freshen up"},
            { time: "4:00 PM", activity:"Exercise / Short Walk"},
            { time: "4:30 PM", activity:"Meditaion / Self Care"},
            { time: "6:30 PM", activity:"Hobby/Family time"},
            { time: "5:00 PM", activity:"Brunch / heavy meals"},
            { time: "6:00 PM", activity:"Family time /Skill building"},
            { time: "7:30 PM", activity:"Get Ready for Work"},
            { time: "9:00 PM - 6:00 AM", activity:"Work hours / Sleep"},
        ]
    }
    },
    
Aspirants:{
    weekday: [
    { time: "6:00 AM", activity: "Wake up & hygiene" },
    { time: "6:30 AM", activity: "Exercise" },
    { time: "7:30 AM", activity: "Breakfast" },
    { time: "9:00 AM", activity: "Work/Study" },
    { time: "1:00 PM", activity: "Lunch" },
    { time: "2:00 PM", activity: "Continue Work/Study" },
    { time: "6:00 PM", activity: "Leisure or Review" },
    { time: "9:00 PM", activity: "Plan Next Day" },
  ],
  weekend: [
    { time: "8:00 AM", activity: "Wake up & breakfast" },
    { time: "9:00 AM", activity: "Self-care or light study" },
    { time: "12:00 PM", activity: "Lunch & rest" },
    { time: "3:00 PM", activity: "Hobby/Gym" },
    { time: "6:00 PM", activity: "Family time" },
    { time: "9:00 PM", activity: "Reflect on week" },
  ],
},
};