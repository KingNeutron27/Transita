import parking from "../assets/images/parking.svg"
import warning from "../assets/images/warning.svg"
import transport from "../assets/images/transport.svg"
import location from "../assets/images/location.svg"
import test1 from "../assets/images/testi1.jpg"
import test2 from "../assets/images/testi2.jpg"
import test3 from "../assets/images/testi3.jpg"


export const ourFeatures = [
    {
        img: parking, title: "Find parking faster", description: "See available parking spots in real time,by location and availability.",
        bg: "#F5F5E8"
    }, {
        img: warning, title: "Real-time Traffic insights", description: "Get up-to-date traffic conditions to avoid congestion on your drive.",
        bg: "#FFE6E6"
    }, {
        img: transport, title: "Choose your commute", description: "Compare travel options including driving,transit and cycling.",
        bg: "#E6F0FA"
    }, {
        img: location, title: "Saved locations", description: "Save frequent destinations like home or work for quick access..",
        bg: "#D9D9D9"
    }]

export const questionData = [
    {
        title: "Can I use transita without sharing location?",
        answer: "Yes you can manually enter your pickup and destination without enabling your location"
    },
   {
        title: "Is my personal data safe with Transita?",
        answer: "Yes, we prioritize your privacy and data security. All personal information is encrypted and stored securely. We only collect data necessary to provide our services, and you have full control over your location sharing preferences. We never sell your data to third parties."
    }, 
    {
        title: "How accurate are the real-time updates?",
        answer: "Our real-time updates are highly accurate, sourced from multiple data providers including traffic authorities, GPS data, and user reports. Updates are refreshed every 30-60 seconds to ensure you have the most current information for traffic conditions, parking availability, and transit schedules."
    }, 
    {
        title: 'Is Transita free to use?',
        answer: 'Yes, Transita offers a comprehensive free version with access to basic traffic updates, parking finder, and transit options. We also offer a premium subscription with advanced features like personalized route optimization, detailed analytics, and priority customer support.'
    }

    ]

    export const testimonialData = [{
        subject: "\"No more guessing\"",
        desc: "\"I used to leave work 30minutes early ‘just in case’ traffic got bad-now i get real time updates and know exactly when to leave. Thanks to transita\"",
        img: test1,
        name: "Victoria",
        role: "Banker"
    }, {
        subject: "\"Parking without panic\"",
        desc: "“Finding parking used to ruin my mornings. now i check map before leaving and park near my office without stress, its like the city suddenly got smarter”",
        img: test2,
        name: "Kayode",
        role: "Bolt driver"
    }, {
        subject: "\"Fire movement dede\"",
        desc: "\"I used to leave work 30minutes early ‘just in case’ traffic got bad-now i get real time updates and know exactly when to leave. Thanks to transita\"",
        img: test3,
        name: "Bunmi",
        role: "Content-Creator"
    }
] 