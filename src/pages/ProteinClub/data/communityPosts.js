// src/pages/ProteinClub/data/communityPosts.js

export const communityPosts = {
  "build-muscle": [
    {
      id: 1,
      user: "Priya M.",
      role: "Protein Leader",
      time: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      category: "Progress",
      text: "Completed my Day 7! 💪 Hit 95g protein today with egg, paneer and dal. Feeling more energetic and stronger already!",
      tags: ["Progress", "Protein", "MuscleGain"],
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      likes: 124,
      comments: 32,
    },
    {
      id: 2,
      user: "Vikram P.",
      role: "Member",
      time: "5 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      category: "Questions",
      text: "Need help! What is the best time to take protein — before or after workout?",
      tags: ["Workout", "ProteinTiming", "MuscleGain"],
      image:
        "https://images.unsplash.com/photo-1593095948071-9a5e4c4f9d1e?auto=format&fit=crop&w=400&q=80",
      likes: 48,
      comments: 21,
    },
    {
      id: 3,
      user: "Arjun M.",
      role: "Member",
      time: "8 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
      category: "Progress",
      text: "My 2-week progress! Gained 1.5 kg lean muscle. Here's my meal plan and workout routine. Hope it helps! 🙌",
      tags: ["Progress", "MealPlan", "Workout"],
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80",
      likes: 156,
      comments: 46,
    },
  ],

  "weight-management": [
    {
      id: 1,
      user: "Anita R.",
      role: "Protein Leader",
      time: "1 hour ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      category: "Progress",
      text: "This week I focused on regular meals, more vegetables and walking every day. Small habits really make a difference!",
      tags: ["HealthyHabits", "Progress", "DailyActivity"],
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
      likes: 92,
      comments: 18,
    },
    {
      id: 2,
      user: "Vikram P.",
      role: "Member",
      time: "4 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      category: "Questions",
      text: "What are your favourite filling breakfast options that are easy to prepare?",
      tags: ["Breakfast", "HealthyMeals"],
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
      likes: 43,
      comments: 28,
    },
  ],

  "family-nutrition": [
    {
      id: 1,
      user: "Priya M.",
      role: "Nutrition Coach",
      time: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      category: "Tips",
      text: "A simple way to plan family meals: include a protein food, vegetables and a grain or other energy food. Keep meals colourful and enjoyable!",
      tags: ["FamilyNutrition", "HealthyMeals"],
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      likes: 86,
      comments: 24,
    },
    {
      id: 2,
      user: "Rohit S.",
      role: "Member",
      time: "5 hours ago",
      avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      category: "Questions",
      text: "Looking for quick, protein-rich snack ideas that the whole family can enjoy.",
      tags: ["Snacks", "Family"],
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
      likes: 56,
      comments: 16,
    },
  ],
};

// Fallback posts for communities without their own post list
export const defaultCommunityPosts = [
  {
    id: 101,
    user: "Priya M.",
    role: "Protein Leader",
    time: "2 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    category: "Tips",
    text: "Share your daily protein meals, tips, questions and progress with the community! 🌱",
    tags: ["Protein", "HealthyHabits"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    likes: 42,
    comments: 12,
  },
];