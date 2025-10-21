import { FaVideo, FaMagic, FaImage, FaRobot, FaTh, FaEdit } from 'react-icons/fa';

// For Header
export const headerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
];

// For Hero section
export const heroContent = {
    name: "Ashish Kumar",
    title: "Creative Video Editor | Graphic Designer",
    subtitle: "Generated 10M+ Views on Social Media • Worked With 100+ Influencers and Agencies"
};

// For About section
export const aboutContent = {
    title: "Creative Video Editor and Graphic Designer",
    paragraph: "With over 10 million views generated across social media and collaborations with 100+ influencers and agencies, I craft compelling video content and striking graphics that engage and convert."
};

// For Expertise section
export const expertiseList = [
  { icon: FaEdit, title: 'Video Editing' },
  { icon: FaVideo, title: 'Motion Graphics' },
  { icon: FaRobot, title: 'AI Videos' },
  { icon: FaMagic, title: 'Reel Editing' },
  { icon: FaImage, title: 'Thumbnail Designing' },
  { icon: FaTh, title: 'AI Thumbnails' }
];

// For Projects section
export const projects = [
  {
    id: 1,
    title: 'Jealousy spreads fast',
    description: 'Not every smile is genuine. Share the wrong secret, and you will learn how fast jealousy truly spreads.',
    duration: '0:18',
    thumbnail: '/thumbnails/lawsOfPower.jpg',
    preview: '/previews/pro1.mp4',
    isReel: true,
    icon: 'keyhole' as const
  },
  {
    id: 2,
    title: 'Artificial Intelligence',
    description: 'Artificial Intelligence is not about replacing human thinking, but about amplifying it—turning imagination into possibility.',
    duration: '0:56',
    thumbnail: '/thumbnails/artificial.jpg',
    preview: '/previews/pro2.mp4',
    isReel: true,
    icon: 'confetti' as const
  },
  {
    id: 3,
    title: 'Money',
    description: 'Money grows fastest where patience, skill, and consistency meet.',
    duration: '0:11',
    thumbnail: '/thumbnails/money.jpg',
    preview: '/previews/pro3.mp4',
    isReel: true,
    icon: 'gem' as const
  },
];

// For Contact section
export const contactContent = {
    title: "Let us Work Together",
    paragraph: "Ready to turn your vision into reality? Contact us and let us begin."
};
