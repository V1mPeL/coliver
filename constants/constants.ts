import {
  AiOutlineSearch,
  AiOutlineAppstoreAdd,
  AiOutlineHome,
} from 'react-icons/ai';

export const navigationItems = [
  {
    icon: AiOutlineSearch,
    route: '/browse',
    label: 'Browse',
  },
  {
    icon: AiOutlineAppstoreAdd,
    route: '/create',
    label: 'Create listing',
  },
  {
    icon: AiOutlineHome,
    route: '/my-listings',
    label: 'My listings',
  },
];

export const features_items = [
  {
    id: 1,
    title: 'Convenient Search for the Perfect Home',
    text: 'Find the perfect place to live together in minutes! CoLiver offers an intuitive search by location, housing type, and budget so you can quickly find a community that fits your lifestyle. Get started today - your new home is waiting!',
    image: '/assets/features_search.png',
  },
  {
    id: 2,
    title: 'A Community That Inspires',
    text: 'Create strong connections with like-minded people! CoLiver unites people who are looking for more than just a place to live, but a real community. Leave reviews, chat and find friends who share your interests and values.',
    image: '/assets/features_community.png',
  },
  {
    id: 3,
    title: 'One Click Search',
    text: 'Forget about complex searches! CoLiver allows you to find the perfect place to live together with one click - the intuitive interface will do everything for you.',
    image: '/assets/features_easy.png',
  },
];

export const preferences = [
  { name: 'Sport', icon: '🏃' },
  { name: 'Music', icon: '🎵' },
  { name: 'Reading', icon: '📚' },
  { name: 'Traveling', icon: '✈️' },
  { name: 'Cooking', icon: '🍳' },
  { name: 'Gaming', icon: '🎮' },
  { name: 'Photography', icon: '📸' },
  { name: 'Art', icon: '🎨' },
  { name: 'Fitness', icon: '💪' },
  { name: 'Movies', icon: '🎬' },
  { name: 'Gardening', icon: '🌱' },
  { name: 'Dancing', icon: '💃' },
  { name: 'Yoga', icon: '🧘' },
  { name: 'Hiking', icon: '🥾' },
  { name: 'Pets', icon: '🐶' },
  { name: 'Technology', icon: '💻' },
  { name: 'Writing', icon: '✍️' },
  { name: 'Cycling', icon: '🚴' },
  { name: 'Meditation', icon: '🕉️' },
  { name: 'Board Games', icon: '🎲' },
];

export const amenities = [
  { name: 'Wi-Fi', icon: '📶' },
  { name: 'TV', icon: '📺' },
  { name: 'Air Conditioning', icon: '❄️' },
  { name: 'Heating', icon: '🔥' },
  { name: 'Washing Machine', icon: '🧼' },
  { name: 'Dryer', icon: '🧺' },
  { name: 'Kitchen', icon: '🍳' },
  { name: 'Refrigerator', icon: '🧊' },
  { name: 'Microwave', icon: '📡' },
  { name: 'Dishwasher', icon: '🍽️' },
  { name: 'Balcony', icon: '🌅' },
  { name: 'Parking', icon: '🚗' },
  { name: 'Elevator', icon: '🛗' },
  { name: 'Gym', icon: '🏋️' },
  { name: 'Pool', icon: '🏊' },
  { name: 'Pet Friendly', icon: '🐾' },
  { name: 'Security System', icon: '🔒' },
  { name: 'Workspace', icon: '💻' },
  { name: 'Smoke Detector', icon: '🚨' },
  { name: 'Fire Extinguisher', icon: '🧯' },
];
