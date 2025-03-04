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
