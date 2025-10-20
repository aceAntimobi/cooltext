export const typeLabels = {
  emoji: 'Emoji',
  kaomoji: 'Kaomoji',
  symbol: 'Symbols'
};

export const categories = {
  emoji: [
    { id: 'all', label: 'All emoji' },
    { id: 'smileys-emotion', label: 'Smileys & Emotion' },
    { id: 'people-body', label: 'People & Body' },
    { id: 'animals-nature', label: 'Animals & Nature' },
    { id: 'food-drink', label: 'Food & Drink' },
    { id: 'activities', label: 'Activities' },
    { id: 'travel-places', label: 'Travel & Places' },
    { id: 'objects', label: 'Objects' },
    { id: 'symbols', label: 'Symbols' }
  ],
  kaomoji: [
    { id: 'all', label: 'All kaomoji' },
    { id: 'happy-positive', label: 'Happy & Positive' },
    { id: 'sad-negative', label: 'Sad & Negative' },
    { id: 'love-affection', label: 'Love & Affection' },
    { id: 'shrug-confused', label: 'Shrug & Confused' },
    { id: 'animals-cute', label: 'Animals & Cute' },
    { id: 'misc', label: 'Miscellaneous' }
  ],
  symbol: [
    { id: 'all', label: 'All symbols' },
    { id: 'stars-shapes', label: 'Stars & Shapes' },
    { id: 'arrows', label: 'Arrows' },
    { id: 'currency', label: 'Currency' },
    { id: 'math-punctuation', label: 'Math & Punctuation' },
    { id: 'hearts-cards', label: 'Hearts & Cards' },
    { id: 'music-zodiac', label: 'Music & Zodiac' },
    { id: 'misc', label: 'Miscellaneous' }
  ]
};

export const library = [
  {
    id: 'emoji-grinning-face',
    character: '😀',
    name: 'Grinning Face',
    type: 'emoji',
    category: 'smileys-emotion',
    keywords: ['smile', 'happy', 'joy', 'face'],
    description: 'A cheerful face with a wide smile conveying happiness.'
  },
  {
    id: 'emoji-rolling-laugh',
    character: '🤣',
    name: 'Rolling on the Floor Laughing',
    type: 'emoji',
    category: 'smileys-emotion',
    keywords: ['laugh', 'lol', 'joy', 'funny'],
    description: 'Used for hysterical laughter or when something is hilarious.'
  },
  {
    id: 'emoji-heart-eyes',
    character: '😍',
    name: 'Smiling Face with Heart-Eyes',
    type: 'emoji',
    category: 'smileys-emotion',
    keywords: ['love', 'crush', 'heart', 'affection'],
    description: 'Expresses love and adoration with heart-shaped eyes.'
  },
  {
    id: 'emoji-thinking',
    character: '🤔',
    name: 'Thinking Face',
    type: 'emoji',
    category: 'smileys-emotion',
    keywords: ['hmm', 'question', 'thinking', 'consider'],
    description: 'Represents thinking, pondering, or evaluating something.'
  },
  {
    id: 'emoji-sparkles',
    character: '✨',
    name: 'Sparkles',
    type: 'emoji',
    category: 'symbols',
    keywords: ['sparkle', 'shine', 'magic', 'clean'],
    description: 'Stars glimmering to represent magic, cleanliness, or excitement.'
  },
  {
    id: 'emoji-thumbs-up',
    character: '👍',
    name: 'Thumbs Up',
    type: 'emoji',
    category: 'people-body',
    keywords: ['approve', 'yes', 'like', 'ok'],
    description: 'A hand giving a thumbs-up to show approval or agreement.'
  },
  {
    id: 'emoji-raising-hands',
    character: '🙌',
    name: 'Raising Hands',
    type: 'emoji',
    category: 'people-body',
    keywords: ['celebrate', 'hooray', 'praise', 'hands'],
    description: 'Represents celebration, success, or giving praise.'
  },
  {
    id: 'emoji-party-popper',
    character: '🎉',
    name: 'Party Popper',
    type: 'emoji',
    category: 'activities',
    keywords: ['party', 'celebration', 'confetti', 'congrats'],
    description: 'A burst of confetti used for celebrations and special moments.'
  },
  {
    id: 'emoji-rocket',
    character: '🚀',
    name: 'Rocket',
    type: 'emoji',
    category: 'travel-places',
    keywords: ['launch', 'space', 'startup', 'fast'],
    description: 'Symbolizes fast growth, innovation, or literal space travel.'
  },
  {
    id: 'emoji-airplane',
    character: '✈️',
    name: 'Airplane',
    type: 'emoji',
    category: 'travel-places',
    keywords: ['flight', 'travel', 'trip', 'vacation'],
    description: 'Represents travel by air, vacations, or airports.'
  },
  {
    id: 'emoji-laptop',
    character: '💻',
    name: 'Laptop',
    type: 'emoji',
    category: 'objects',
    keywords: ['computer', 'work', 'code', 'technology'],
    description: 'A portable computer often used to represent work or tech.'
  },
  {
    id: 'emoji-light-bulb',
    character: '💡',
    name: 'Light Bulb',
    type: 'emoji',
    category: 'objects',
    keywords: ['idea', 'innovation', 'light', 'inspiration'],
    description: 'Represents a bright idea or inspiration striking.'
  },
  {
    id: 'emoji-coffee',
    character: '☕',
    name: 'Hot Beverage',
    type: 'emoji',
    category: 'food-drink',
    keywords: ['coffee', 'tea', 'morning', 'break'],
    description: 'A warm drink, often coffee or tea, symbolizing a cozy break.'
  },
  {
    id: 'emoji-pizza',
    character: '🍕',
    name: 'Pizza',
    type: 'emoji',
    category: 'food-drink',
    keywords: ['food', 'party', 'slice', 'cheese'],
    description: 'A slice of pizza for casual meals or celebrations.'
  },
  {
    id: 'emoji-dog',
    character: '🐶',
    name: 'Dog Face',
    type: 'emoji',
    category: 'animals-nature',
    keywords: ['pet', 'dog', 'animal', 'cute'],
    description: 'A friendly puppy face representing dogs and companionship.'
  },
  {
    id: 'emoji-cherry-blossom',
    character: '🌸',
    name: 'Cherry Blossom',
    type: 'emoji',
    category: 'animals-nature',
    keywords: ['flower', 'spring', 'sakura', 'nature'],
    description: 'A soft pink flower symbolizing spring, beauty, and renewal.'
  },
  {
    id: 'emoji-moon',
    character: '🌙',
    name: 'Crescent Moon',
    type: 'emoji',
    category: 'symbols',
    keywords: ['night', 'sleep', 'moon', 'calm'],
    description: 'Represents nighttime, calm, and dreaming.'
  },
  {
    id: 'emoji-musical-notes',
    character: '🎶',
    name: 'Musical Notes',
    type: 'emoji',
    category: 'activities',
    keywords: ['music', 'melody', 'song', 'rhythm'],
    description: 'A group of music notes to represent songs or audio content.'
  },
  {
    id: 'emoji-spiral-calendar',
    character: '🗓️',
    name: 'Spiral Calendar',
    type: 'emoji',
    category: 'objects',
    keywords: ['calendar', 'schedule', 'plan', 'date'],
    description: 'Used for reminders, planning, and upcoming events.'
  },
  {
    id: 'emoji-fire',
    character: '🔥',
    name: 'Fire',
    type: 'emoji',
    category: 'symbols',
    keywords: ['lit', 'hot', 'trend', 'burn'],
    description: 'Represents something exciting, awesome, or literally on fire.'
  },
  {
    id: 'emoji-flexed-biceps',
    character: '💪',
    name: 'Flexed Biceps',
    type: 'emoji',
    category: 'people-body',
    keywords: ['strong', 'gym', 'power', 'workout'],
    description: 'Shows strength, encouragement, or fitness goals.'
  },
  {
    id: 'emoji-sos',
    character: '🆘',
    name: 'SOS Button',
    type: 'emoji',
    category: 'symbols',
    keywords: ['help', 'emergency', 'urgent'],
    description: 'A bright SOS label to request urgent assistance.'
  },
  {
    id: 'emoji-world-map',
    character: '🗺️',
    name: 'World Map',
    type: 'emoji',
    category: 'travel-places',
    keywords: ['map', 'adventure', 'explore', 'world'],
    description: 'Represents global travel, exploration, and geography.'
  },
  {
    id: 'emoji-camera',
    character: '📸',
    name: 'Camera with Flash',
    type: 'emoji',
    category: 'objects',
    keywords: ['photo', 'camera', 'snapshot', 'capture'],
    description: 'Used for photography moments or capturing highlights.'
  },
  {
    id: 'emoji-rainbow',
    character: '🌈',
    name: 'Rainbow',
    type: 'emoji',
    category: 'animals-nature',
    keywords: ['rainbow', 'hope', 'colorful', 'pride'],
    description: 'A colorful rainbow representing hope or diversity.'
  },
  {
    id: 'emoji-hiking-boot',
    character: '🥾',
    name: 'Hiking Boot',
    type: 'emoji',
    category: 'activities',
    keywords: ['outdoors', 'hike', 'explore', 'boot'],
    description: 'Represents hiking, outdoor adventures, or sturdy footwear.'
  },
  {
    id: 'emoji-medal',
    character: '🏅',
    name: 'Sports Medal',
    type: 'emoji',
    category: 'activities',
    keywords: ['award', 'achievement', 'sports', 'win'],
    description: 'A medal on a ribbon awarded for accomplishments.'
  },
  {
    id: 'emoji-starry-eyes',
    character: '🤩',
    name: 'Star-Struck',
    type: 'emoji',
    category: 'smileys-emotion',
    keywords: ['excited', 'amazed', 'stars', 'wow'],
    description: 'A face with star eyes representing amazement or admiration.'
  },
  {
    id: 'kaomoji-happy1',
    character: '(^_^)/',
    name: 'Happy Wave',
    type: 'kaomoji',
    category: 'happy-positive',
    keywords: ['hello', 'happy', 'wave', 'greeting'],
    description: 'A cheerful character waving to say hello.'
  },
  {
    id: 'kaomoji-happy2',
    character: 'ヽ(•‿•)ノ',
    name: 'Joyful Dance',
    type: 'kaomoji',
    category: 'happy-positive',
    keywords: ['dance', 'joy', 'celebrate', 'excited'],
    description: 'Arms up in celebration for exciting news.'
  },
  {
    id: 'kaomoji-shrug',
    character: '¯\\_(ツ)_/¯',
    name: 'Shrug',
    type: 'kaomoji',
    category: 'shrug-confused',
    keywords: ['idk', 'shrug', 'confused', 'meh'],
    description: 'Used to convey indifference or lack of knowledge.'
  },
  {
    id: 'kaomoji-tableflip',
    character: '(╯°□°）╯︵ ┻━┻',
    name: 'Table Flip',
    type: 'kaomoji',
    category: 'sad-negative',
    keywords: ['angry', 'rage', 'frustrated', 'table flip'],
    description: 'Expresses dramatic frustration or rage by flipping a table.'
  },
  {
    id: 'kaomoji-cry',
    character: '(T_T)',
    name: 'Tears',
    type: 'kaomoji',
    category: 'sad-negative',
    keywords: ['cry', 'sad', 'tears', 'emotional'],
    description: 'A crying face expressing sadness.'
  },
  {
    id: 'kaomoji-love',
    character: '(♡˙︶˙♡)',
    name: 'Love Sparkles',
    type: 'kaomoji',
    category: 'love-affection',
    keywords: ['love', 'cute', 'heart', 'affection'],
    description: 'A blushy face filled with love and admiration.'
  },
  {
    id: 'kaomoji-bear',
    character: 'ʕ•ᴥ•ʔ',
    name: 'Bear Hug',
    type: 'kaomoji',
    category: 'animals-cute',
    keywords: ['bear', 'hug', 'cute', 'comfort'],
    description: 'A cuddly bear offering comfort.'
  },
  {
    id: 'kaomoji-sparkle',
    character: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
    name: 'Sparkle Toss',
    type: 'kaomoji',
    category: 'happy-positive',
    keywords: ['magic', 'sparkle', 'excited', 'yay'],
    description: 'Throwing sparkles to celebrate something wonderful.'
  },
  {
    id: 'kaomoji-cat',
    character: '(=^･ω･^=)',
    name: 'Cat Smile',
    type: 'kaomoji',
    category: 'animals-cute',
    keywords: ['cat', 'smile', 'pet', 'cute'],
    description: 'A smiling cat face for feline fans.'
  },
  {
    id: 'kaomoji-wink',
    character: '(~‾▿‾)~',
    name: 'Playful Wink',
    type: 'kaomoji',
    category: 'misc',
    keywords: ['wink', 'playful', 'dance'],
    description: 'A playful character with a wavy dance move.'
  },
  {
    id: 'kaomoji-determined',
    character: '(ง •̀_•́)ง',
    name: 'Determined',
    type: 'kaomoji',
    category: 'happy-positive',
    keywords: ['fight', 'determined', 'motivation'],
    description: 'A fighter pose showing determination and motivation.'
  },
  {
    id: 'symbol-star',
    character: '★',
    name: 'Black Star',
    type: 'symbol',
    category: 'stars-shapes',
    keywords: ['star', 'favorite', 'rating', 'sparkle'],
    description: 'A filled star used for ratings or emphasis.'
  },
  {
    id: 'symbol-heart',
    character: '♥',
    name: 'Heart Suit',
    type: 'symbol',
    category: 'hearts-cards',
    keywords: ['heart', 'love', 'cards'],
    description: 'A heart shape from playing cards representing love.'
  },
  {
    id: 'symbol-arrow-right',
    character: '→',
    name: 'Right Arrow',
    type: 'symbol',
    category: 'arrows',
    keywords: ['arrow', 'direction', 'next', 'pointer'],
    description: 'Points the way forward or indicates progression.'
  },
  {
    id: 'symbol-arrow-loop',
    character: '↺',
    name: 'Anticlockwise Open Circle Arrow',
    type: 'symbol',
    category: 'arrows',
    keywords: ['refresh', 'undo', 'loop'],
    description: 'Represents undo, refresh, or circular motion.'
  },
  {
    id: 'symbol-euro',
    character: '€',
    name: 'Euro Sign',
    type: 'symbol',
    category: 'currency',
    keywords: ['money', 'euro', 'currency'],
    description: 'The currency symbol for the euro.'
  },
  {
    id: 'symbol-yen',
    character: '¥',
    name: 'Yen Sign',
    type: 'symbol',
    category: 'currency',
    keywords: ['money', 'yen', 'currency', 'japan'],
    description: 'The currency symbol for the yen and yuan.'
  },
  {
    id: 'symbol-infinity',
    character: '∞',
    name: 'Infinity',
    type: 'symbol',
    category: 'math-punctuation',
    keywords: ['forever', 'math', 'limitless'],
    description: 'Represents infinity or limitless possibilities.'
  },
  {
    id: 'symbol-section',
    character: '§',
    name: 'Section Sign',
    type: 'symbol',
    category: 'math-punctuation',
    keywords: ['legal', 'section', 'paragraph'],
    description: 'Used in legal references to denote sections.'
  },
  {
    id: 'symbol-music-note',
    character: '♫',
    name: 'Beamed Eighth Notes',
    type: 'symbol',
    category: 'music-zodiac',
    keywords: ['music', 'song', 'melody'],
    description: 'Two connected eighth notes for music and rhythm.'
  },
  {
    id: 'symbol-zodiac',
    character: '♌',
    name: 'Leo',
    type: 'symbol',
    category: 'music-zodiac',
    keywords: ['zodiac', 'leo', 'astrology'],
    description: 'Represents the Leo sign in astrology.'
  },
  {
    id: 'symbol-snowflake',
    character: '❄',
    name: 'Snowflake',
    type: 'symbol',
    category: 'stars-shapes',
    keywords: ['winter', 'snow', 'cold'],
    description: 'A delicate snowflake for winter themes.'
  },
  {
    id: 'symbol-copyright',
    character: '©',
    name: 'Copyright Sign',
    type: 'symbol',
    category: 'misc',
    keywords: ['copyright', 'legal', 'rights'],
    description: 'Used to mark ownership of creative works.'
  },
  {
    id: 'symbol-registered',
    character: '®',
    name: 'Registered Sign',
    type: 'symbol',
    category: 'misc',
    keywords: ['registered', 'trademark', 'brand'],
    description: 'Indicates a registered trademark.'
  },
  {
    id: 'symbol-check',
    character: '✓',
    name: 'Check Mark',
    type: 'symbol',
    category: 'math-punctuation',
    keywords: ['check', 'complete', 'done', 'task'],
    description: 'A classic check mark indicating completion or success.'
  },
  {
    id: 'symbol-card-spade',
    character: '♠',
    name: 'Spade Suit',
    type: 'symbol',
    category: 'hearts-cards',
    keywords: ['cards', 'spade', 'games'],
    description: 'One of the four suits in a standard deck of cards.'
  }
];

