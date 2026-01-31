import React from 'react';
import { 
  Palette, Clock, Zap, Camera, Sparkles, Cpu, 
  LayoutTemplate, AppWindow, Database, Type, Square, 
  Sticker, LayoutGrid, MousePointerClick 
} from 'lucide-react';
import { Category } from './types';

export const IMAGE_CATEGORIES: Category[] = [
  {
    id: 'style',
    label: 'Artist & Style',
    icon: <Palette className="w-5 h-5" />,
    color: 'text-pink-400',
    options: [
      'Rebecca Guay', 'Terese Nielsen', 'Dan Frazier', 'Rob Alexander', 'Phil Foglio', 'Greg Rutkowski', 'Alphonse Mucha', 'Zdzisław Beksiński', 'Artgerm', 
      'Studio Ghibli', 'Syd Mead', 'H.R. Giger', 'Oil Painting', 
      'Watercolor', 'Ukiyo-e', 'Synthwave', 'Vector Art', 'Pixel Art'
    ]
  },
  {
    id: 'epoch',
    label: 'Epoch & Time',
    icon: <Clock className="w-5 h-5" />,
    color: 'text-amber-400',
    options: [
      'Cyberpunk 2077', 'Steampunk', '1920s Art Deco', 'Victorian Era', 
      'Feudal Japan', 'Ancient Rome', 'Retro 80s', 'Post-Apocalyptic', 
      'Futuristic', 'Medieval', 'Paleolithic', 'Year 3000'
    ]
  },
  {
    id: 'realism',
    label: 'Realism & Engine',
    icon: <Cpu className="w-5 h-5" />,
    color: 'text-blue-400',
    options: [
      'Unreal Engine 5', 'Octane Render', '8k Resolution', 'Photorealistic', 
      'Hyper-detailed', 'Ray Tracing', 'Cinema 4D', 'V-Ray', 
      'Sharp Focus', 'HDR', 'Matte Painting'
    ]
  },
  {
    id: 'lighting',
    label: 'Lighting',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-yellow-400',
    options: [
      'Cinematic Lighting', 'Volumetric Lighting', 'Bioluminescence', 
      'God Rays', 'Studio Lighting', 'Softbox', 'Rim Lighting', 
      'Neon Lights', 'Natural Light', 'Golden Hour', 'Dark & Moody'
    ]
  },
  {
    id: 'camera',
    label: 'Camera & View',
    icon: <Camera className="w-5 h-5" />,
    color: 'text-green-400',
    options: [
      'Wide Angle', 'Macro Lens', 'Bokeh', 'Depth of Field', 
      'Drone View', 'Isometric', 'Telephoto', 'Fish-eye', 
      'Low Angle', 'Dutch Angle', 'f/1.8'
    ]
  },
  {
    id: 'vibe',
    label: 'Vibe & Material',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'text-purple-400',
    options: [
      'Ethereal', 'Dystopian', 'Whimsical', 'Dark Fantasy', 
      'Dreamcore', 'Liminal Space', 'Crystalline', 'Liquid Metal', 
      'Iridescent', 'Velvet', 'Smoke', 'Gritty'
    ]
  }
];

export const APP_CATEGORIES: Category[] = [
  {
    id: 'toolkit',
    label: 'UI Toolkit',
    icon: <LayoutTemplate className="w-5 h-5" />,
    color: 'text-cyan-400',
    options: [
      'Material Design 3', 'Tailwind CSS', 'Bootstrap 5', 'Apple HIG', 
      'Fluent UI', 'Chakra UI', 'Ant Design', 'Shadcn/ui', 'Radix UI'
    ]
  },
  {
    id: 'type',
    label: 'App Type',
    icon: <AppWindow className="w-5 h-5" />,
    color: 'text-emerald-400',
    options: [
      'E-Commerce Webshop', 'SaaS Dashboard', 'Marketplace', 'Portfolio', 
      'Blog & News', 'Social Network', 'Productivity Tool', 'Landing Page', 'Mobile Game UI'
    ]
  },
  {
    id: 'features',
    label: 'Features',
    icon: <Database className="w-5 h-5" />,
    color: 'text-teal-400',
    options: [
      'Database', 'User Profiles', 'Secure Authentication', 'Shopping Cart', 
      'Payment Gateway', 'Real-time Chat', 'Cloud Sync', 'Admin Panel'
    ]
  },
  {
    id: 'typography',
    label: 'Typography',
    icon: <Type className="w-5 h-5" />,
    color: 'text-orange-400',
    options: [
      'Inter (Sans)', 'Playfair Display (Serif)', 'Fira Code (Mono)', 
      'Roboto', 'Open Sans', 'Montserrat', 'Merriweather', 'Handwritten Style'
    ]
  },
  {
    id: 'shapes',
    label: 'Shapes',
    icon: <Square className="w-5 h-5" />,
    color: 'text-rose-400',
    options: [
      'Rounded-XL', 'Sharp / Brutalist', 'Pill-shaped', 'Organic Blobs', 
      'Squircle', 'Asymmetric', 'Geometric', 'Cards'
    ]
  },
  {
    id: 'iconography',
    label: 'Iconography',
    icon: <Sticker className="w-5 h-5" />,
    color: 'text-violet-400',
    options: [
      'Phosphor Icons', 'Lucide', 'Material Symbols', 'FontAwesome', 
      'Hand-drawn', '3D Rendered', 'Minimal Outline', 'Two-Tone', 'Solid Filled'
    ]
  },
  {
    id: 'colors',
    label: 'Color Palette',
    icon: <Palette className="w-5 h-5" />,
    color: 'text-fuchsia-400',
    options: [
      'Dark Mode', 'Glassmorphism', 'Neumorphism', 'Pastel Soft', 
      'High Contrast', 'Monochrome', 'Gradient-Heavy', 'Retro Wave', 'Corporate Blue'
    ]
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: <LayoutGrid className="w-5 h-5" />,
    color: 'text-blue-400',
    options: [
      'Bento Grid', 'Masonry', 'Split Screen', 'Sidebar Nav', 
      'Bottom Sheet', 'Card-based', 'Fullscreen Hero', 'Z-Pattern'
    ]
  },
  {
    id: 'interaction',
    label: 'Interaction',
    icon: <MousePointerClick className="w-5 h-5" />,
    color: 'text-yellow-400',
    options: [
      'Micro-interactions', 'Parallax Scroll', 'Drag & Drop', 'Swipe Gestures', 
      'Infinite Scroll', 'Skeleton Loading', 'Haptic Feedback', 'Hover Effects'
    ]
  }
];

export const FREE_CATEGORIES: Category[] = [];