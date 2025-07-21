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
        link:'#'
    },
    {
        id: 3,
        title:"Contacts",
        link:'#'
    },
    {
        id: 4,
        title:"About",
        link:''
    },
    {
        id: 5,
        title:"fi",
        link:''
    }
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
        id: 2,
        title:"Our Schedule",
        link:'#'
    },
    {
        id: 3,
        title:"Manage Habits",
        link:'#'
    },
    {
        id: 4,
        title:"History",
        link:''
    },
    {
        id: 5,
        title:"Daily activities",
        link:''
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
};