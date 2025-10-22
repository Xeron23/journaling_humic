const quotes = [
  // MOTIVATED
  { category: 'MOTIVATED', text: "Don't watch the clock; do what it does. Keep going.", author: 'Sam Levenson' },
  { category: 'MOTIVATED', text: 'Push yourself, because no one else is going to do it for you.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'Success is what happens after you have survived all your mistakes.', author: 'Anora Lee' },
  { category: 'MOTIVATED', text: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
  { category: 'MOTIVATED', text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' },

  // HAPPY
  { category: 'HAPPY', text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama' },
  { category: 'HAPPY', text: 'The most wasted of all days is one without laughter.', author: 'E.E. Cummings' },
  { category: 'HAPPY', text: 'Smile, and let the world wonder why.', author: 'Unknown' },
  { category: 'HAPPY', text: 'Happiness depends upon ourselves.', author: 'Aristotle' },
  { category: 'HAPPY', text: 'The secret of being happy is accepting where you are in life and making the most out of every day.', author: 'Unknown' },

  // SAD
  { category: 'SAD', text: 'Tears come from the heart and not from the brain.', author: 'Leonardo da Vinci' },
  { category: 'SAD', text: 'Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water.', author: 'Christopher Morley' },
  { category: 'SAD', text: 'Sadness flies away on the wings of time.', author: 'Jean de La Fontaine' },
  { category: 'SAD', text: 'Behind every sweet smile, there is a bitter sadness that no one can ever see and feel.', author: 'Tupac Shakur' },
  { category: 'SAD', text: 'The word “happy” would lose its meaning if it were not balanced by sadness.', author: 'Carl Jung' },

  // ANGRY
  { category: 'ANGRY', text: 'For every minute you remain angry, you give up sixty seconds of peace of mind.', author: 'Ralph Waldo Emerson' },
  { category: 'ANGRY', text: 'Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.', author: 'Mark Twain' },
  { category: 'ANGRY', text: 'Speak when you are angry and you will make the best speech you will ever regret.', author: 'Ambrose Bierce' },
  { category: 'ANGRY', text: 'Anger doesn’t solve anything. It builds nothing, but it can destroy everything.', author: 'Thomas Jefferson' },
  { category: 'ANGRY', text: 'Never do anything when you are in a temper, for you will do everything wrong.', author: 'Baltasar Gracian' },

  // NEUTRAL
  { category: 'NEUTRAL', text: 'Sometimes it’s better to remain silent and smile.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Life is a balance between holding on and letting go.', author: 'Rumi' },
  { category: 'NEUTRAL', text: 'The less you respond to negativity, the more peaceful your life becomes.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Observe everything, judge little, and appreciate much.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Stay calm. The storm will pass.', author: 'Unknown' },

  // MOTIVATED
  { category: 'MOTIVATED', text: 'It always seems impossible until it’s done.', author: 'Nelson Mandela' },
  { category: 'MOTIVATED', text: 'The harder you work for something, the greater you’ll feel when you achieve it.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'Dream it. Wish it. Do it.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'Great things never come from comfort zones.', author: 'Roy T. Bennett' },
  { category: 'MOTIVATED', text: 'Don’t stop when you’re tired. Stop when you’re done.', author: 'Marilyn Monroe' },

  // HAPPY
  { category: 'HAPPY', text: 'Be happy not because everything is good, but because you can see the good in everything.', author: 'Unknown' },
  { category: 'HAPPY', text: 'Happiness is a direction, not a place.', author: 'Sydney J. Harris' },
  { category: 'HAPPY', text: 'Happiness is only real when shared.', author: 'Christopher McCandless' },
  { category: 'HAPPY', text: 'There is no path to happiness: happiness is the path.', author: 'Buddha' },
  { category: 'HAPPY', text: 'Do more of what makes you happy.', author: 'Unknown' },

  // SAD
  { category: 'SAD', text: 'Every human walks around with a certain kind of sadness. They may not wear it on their sleeves, but it’s there if you look deep.', author: 'Taraji P. Henson' },
  { category: 'SAD', text: 'Sometimes you’ve got to be strong when you’re crying inside.', author: 'Unknown' },
  { category: 'SAD', text: 'It hurts when you realize you aren’t as important to someone as you thought you were.', author: 'Unknown' },
  { category: 'SAD', text: 'Sadness gives depth. Happiness gives height.', author: 'Osho' },
  { category: 'SAD', text: 'We must understand that sadness is an ocean, and sometimes we drown, while other days we are forced to swim.', author: 'R.M. Drake' },

  // ANGRY
  { category: 'ANGRY', text: 'Holding onto anger is like drinking poison and expecting the other person to die.', author: 'Buddha' },
  { category: 'ANGRY', text: 'Anger is one letter short of danger.', author: 'Eleanor Roosevelt' },
  { category: 'ANGRY', text: 'When angry, count to ten before you speak. If very angry, count to one hundred.', author: 'Thomas Jefferson' },
  { category: 'ANGRY', text: 'Anger makes you smaller, while forgiveness forces you to grow beyond what you were.', author: 'Cherie Carter-Scott' },
  { category: 'ANGRY', text: 'The best fighter is never angry.', author: 'Lao Tzu' },

  // NEUTRAL
  { category: 'NEUTRAL', text: 'Sometimes doing nothing is the best reaction.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Calmness is the cradle of power.', author: 'Josiah Gilbert Holland' },
  { category: 'NEUTRAL', text: 'The ability to observe without evaluating is the highest form of intelligence.', author: 'Jiddu Krishnamurti' },
  { category: 'NEUTRAL', text: 'Peace comes from within. Do not seek it without.', author: 'Buddha' },
  { category: 'NEUTRAL', text: 'Let your mind be still. Clarity will come.', author: 'Unknown' },


  // MOTIVATED
  { category: 'MOTIVATED', text: 'Success doesn’t just find you. You have to go out and get it.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { category: 'MOTIVATED', text: 'You don’t have to be great to start, but you have to start to be great.', author: 'Zig Ziglar' },
  { category: 'MOTIVATED', text: 'Work hard in silence, let success make the noise.', author: 'Frank Ocean' },
  { category: 'MOTIVATED', text: 'Don’t limit your challenges. Challenge your limits.', author: 'Jerry Dunn' },

  // HAPPY
  { category: 'HAPPY', text: 'Happiness is not by chance, but by choice.', author: 'Jim Rohn' },
  { category: 'HAPPY', text: 'When you love what you have, you have everything you need.', author: 'Unknown' },
  { category: 'HAPPY', text: 'A smile is happiness you’ll find right under your nose.', author: 'Tom Wilson' },
  { category: 'HAPPY', text: 'Happiness is homemade.', author: 'Unknown' },
  { category: 'HAPPY', text: 'Enjoy the little things, for one day you may look back and realize they were the big things.', author: 'Robert Brault' },

  // SAD
  { category: 'SAD', text: 'It’s sad when someone you know becomes someone you knew.', author: 'Henry Rollins' },
  { category: 'SAD', text: 'There is no greater sorrow than to recall happiness in times of misery.', author: 'Dante Alighieri' },
  { category: 'SAD', text: 'The walls we build around us to keep sadness out also keep out the joy.', author: 'Jim Rohn' },
  { category: 'SAD', text: 'Crying is how your heart speaks when your lips can’t explain the pain.', author: 'Unknown' },
  { category: 'SAD', text: 'Sadness is also a kind of defense.', author: 'Ivo Andrić' },

  // ANGRY
  { category: 'ANGRY', text: 'Anger is a wind which blows out the lamp of the mind.', author: 'Robert Ingersoll' },
  { category: 'ANGRY', text: 'You will not be punished for your anger; you will be punished by your anger.', author: 'Buddha' },
  { category: 'ANGRY', text: 'He who angers you conquers you.', author: 'Elizabeth Kenny' },
  { category: 'ANGRY', text: 'When anger rises, think of the consequences.', author: 'Confucius' },
  { category: 'ANGRY', text: 'Control your anger, for it is only one letter away from danger.', author: 'Unknown' },

  // NEUTRAL
  { category: 'NEUTRAL', text: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
  { category: 'NEUTRAL', text: 'The best way to deal with confusion is to stay calm and wait for clarity.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Keep a level head and maintain perspective.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Silence is a source of great strength.', author: 'Lao Tzu' },
  { category: 'NEUTRAL', text: 'Sometimes neutrality is wisdom, not indifference.', author: 'Unknown' },

  // MOTIVATED
  { category: 'MOTIVATED', text: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
  { category: 'MOTIVATED', text: 'Don’t wish it were easier; wish you were better.', author: 'Jim Rohn' },
  { category: 'MOTIVATED', text: 'If you want to achieve greatness, stop asking for permission.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'Wake up with determination. Go to bed with satisfaction.', author: 'George Horace Lorimer' },
  { category: 'MOTIVATED', text: 'Success is walking from failure to failure with no loss of enthusiasm.', author: 'Winston Churchill' },

  // HAPPY
  { category: 'HAPPY', text: 'Happiness is when what you think, what you say, and what you do are in harmony.', author: 'Mahatma Gandhi' },
  { category: 'HAPPY', text: 'The best way to cheer yourself up is to try to cheer somebody else up.', author: 'Mark Twain' },
  { category: 'HAPPY', text: 'A happy soul is the best shield for a cruel world.', author: 'Atticus' },
  { category: 'HAPPY', text: 'Count your age by friends, not years. Count your life by smiles, not tears.', author: 'John Lennon' },
  { category: 'HAPPY', text: 'Happiness is not having what you want. It is appreciating what you have.', author: 'Unknown' },

  // SAD
  { category: 'SAD', text: 'Sometimes you will never know the value of a moment until it becomes a memory.', author: 'Dr. Seuss' },
  { category: 'SAD', text: 'It’s amazing how someone can break your heart, and you can still love them with all the little pieces.', author: 'Ella Harper' },
  { category: 'SAD', text: 'The good times of today are the sad thoughts of tomorrow.', author: 'Bob Marley' },
  { category: 'SAD', text: 'When it rains, look for rainbows. When it’s dark, look for stars.', author: 'Oscar Wilde' },
  { category: 'SAD', text: 'Sadness is but a wall between two gardens.', author: 'Kahlil Gibran' },

  // ANGRY
  { category: 'ANGRY', text: 'Never respond to an angry person with a fiery comeback. Even if he deserves it… don’t allow his anger to become yours.', author: 'Bohdi Sanders' },
  { category: 'ANGRY', text: 'Anger is like fire; it will burn all if not controlled.', author: 'Unknown' },
  { category: 'ANGRY', text: 'If you kick a stone in anger, you’ll hurt your own foot.', author: 'Korean Proverb' },
  { category: 'ANGRY', text: 'The best remedy for a short temper is a long walk.', author: 'Jacqueline Schiff' },
  { category: 'ANGRY', text: 'Getting angry does not solve anything; it just makes it worse.', author: 'Unknown' },

  // NEUTRAL
  { category: 'NEUTRAL', text: 'Sometimes no reaction is the best reaction.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Keep your mind steady like still water.', author: 'Lao Tzu' },
  { category: 'NEUTRAL', text: 'Learn to sit back and observe. Not everything needs a reaction.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'When nothing is certain, anything is possible.', author: 'Margaret Drabble' },
  { category: 'NEUTRAL', text: 'Stay neutral to chaos, and chaos will pass.', author: 'Unknown' },

  // MOTIVATED
  { category: 'MOTIVATED', text: 'Your limitation—it’s only your imagination.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'Push harder than yesterday if you want a different tomorrow.', author: 'Vincent Williams Sr.' },
  { category: 'MOTIVATED', text: 'Don’t be afraid to give up the good to go for the great.', author: 'John D. Rockefeller' },
  { category: 'MOTIVATED', text: 'Sometimes later becomes never. Do it now.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'Doubt kills more dreams than failure ever will.', author: 'Suzy Kassem' },

  // HAPPY
  { category: 'HAPPY', text: 'Happiness is not a goal; it’s a by-product of a life well lived.', author: 'Eleanor Roosevelt' },
  { category: 'HAPPY', text: 'The key to being happy is knowing you have the power to choose what to accept and what to let go.', author: 'Dodinsky' },
  { category: 'HAPPY', text: 'Wherever you go, no matter what the weather, always bring your own sunshine.', author: 'Anthony J. D’Angelo' },
  { category: 'HAPPY', text: 'Happiness is the highest form of health.', author: 'Dalai Lama' },
  { category: 'HAPPY', text: 'A happy life consists in tranquility of mind.', author: 'Marcus Tullius Cicero' },

  // SAD
  { category: 'SAD', text: 'Every man has his secret sorrows which the world knows not.', author: 'Henry Wadsworth Longfellow' },
  { category: 'SAD', text: 'Sometimes, you just have to accept that some chapters will close without closure.', author: 'Unknown' },
  { category: 'SAD', text: 'Behind every broken heart is a story that made it strong.', author: 'Unknown' },
  { category: 'SAD', text: 'The longer and more carefully we look at a funny story, the sadder it becomes.', author: 'Nikolai Gogol' },
  { category: 'SAD', text: 'Pain is inevitable. Suffering is optional.', author: 'Haruki Murakami' },

  // ANGRY
  { category: 'ANGRY', text: 'Anger dwells only in the bosom of fools.', author: 'Albert Einstein' },
  { category: 'ANGRY', text: 'When anger rises, think of the consequences before you act.', author: 'Confucius' },
  { category: 'ANGRY', text: 'Anger is never without a reason, but seldom with a good one.', author: 'Benjamin Franklin' },
  { category: 'ANGRY', text: 'Whatever is begun in anger ends in shame.', author: 'Benjamin Franklin' },
  { category: 'ANGRY', text: 'The greatest remedy for anger is delay.', author: 'Seneca' },

  // NEUTRAL
  { category: 'NEUTRAL', text: 'Balance is not something you find, it’s something you create.', author: 'Jana Kingsford' },
  { category: 'NEUTRAL', text: 'Calm mind brings inner strength and self-confidence.', author: 'Dalai Lama' },
  { category: 'NEUTRAL', text: 'Be still. The quieter you become, the more you can hear.', author: 'Ram Dass' },
  { category: 'NEUTRAL', text: 'It is not the situation, but your reaction to it, that matters.', author: 'Epictetus' },
  { category: 'NEUTRAL', text: 'Stay grounded even when life pulls you in all directions.', author: 'Unknown' },

  // MOTIVATED
  { category: 'MOTIVATED', text: 'Failure is not the opposite of success; it’s part of success.', author: 'Arianna Huffington' },
  { category: 'MOTIVATED', text: 'If you want something you never had, you have to do something you’ve never done.', author: 'Thomas Jefferson' },
  { category: 'MOTIVATED', text: 'Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.', author: 'Roy T. Bennett' },
  { category: 'MOTIVATED', text: 'Small progress is still progress.', author: 'Unknown' },
  { category: 'MOTIVATED', text: 'The expert in anything was once a beginner.', author: 'Helen Hayes' },

  // HAPPY
  { category: 'HAPPY', text: 'Happiness is found when you stop comparing yourself to others.', author: 'Unknown' },
  { category: 'HAPPY', text: 'Collect moments, not things.', author: 'Unknown' },
  { category: 'HAPPY', text: 'When you focus on the good, the good gets better.', author: 'Abraham Hicks' },
  { category: 'HAPPY', text: 'The happiness of your life depends upon the quality of your thoughts.', author: 'Marcus Aurelius' },
  { category: 'HAPPY', text: 'Happiness grows at our own firesides, and is not to be picked in strangers’ gardens.', author: 'Douglas Jerrold' },

  // SAD
  { category: 'SAD', text: 'We enjoy warmth because we have been cold. We appreciate light because we have been in darkness.', author: 'David L. Weatherford' },
  { category: 'SAD', text: 'It’s hard to forget someone who gave you so much to remember.', author: 'Unknown' },
  { category: 'SAD', text: 'There are wounds that never show on the body that are deeper and more hurtful than anything that bleeds.', author: 'Laurell K. Hamilton' },
  { category: 'SAD', text: 'Sometimes you must accept that certain things will never go back to how they used to be.', author: 'Unknown' },
  { category: 'SAD', text: 'Behind every sadness, there is a story untold.', author: 'Unknown' },

  // ANGRY
  { category: 'ANGRY', text: 'Speak when you are angry and you’ll make the best speech you’ll ever regret.', author: 'Laurence J. Peter' },
  { category: 'ANGRY', text: 'Holding onto anger gives someone else control over your emotions.', author: 'Unknown' },
  { category: 'ANGRY', text: 'Anger is temporary madness.', author: 'Horace' },
  { category: 'ANGRY', text: 'When you learn to control your anger, you gain control of your life.', author: 'Unknown' },
  { category: 'ANGRY', text: 'The more anger towards the past you carry in your heart, the less capable you are of loving in the present.', author: 'Barbara De Angelis' },

  // NEUTRAL
  { category: 'NEUTRAL', text: 'Patience is not the ability to wait, but how you act while waiting.', author: 'Joyce Meyer' },
  { category: 'NEUTRAL', text: 'Calm seas never made a skilled sailor.', author: 'Franklin D. Roosevelt' },
  { category: 'NEUTRAL', text: 'Acceptance of what has happened is the first step to overcoming the consequences of any misfortune.', author: 'William James' },
  { category: 'NEUTRAL', text: 'Stay present. The past is gone, and the future hasn’t happened yet.', author: 'Unknown' },
  { category: 'NEUTRAL', text: 'Peace is not the absence of conflict, but the ability to cope with it.', author: 'Mahatma Gandhi' },

   // HAPPY
  {
    text: "Happiness is not something you postpone for the future; it’s something you design for the present.",
    category: "HAPPY",
    author: "Jim Rohn"
  },
  {
    text: "Smile at the world, and the world will smile back at you.",
    category: "HAPPY",
    author: "Unknown"
  },
  {
    text: "Joy is the simplest form of gratitude.",
    category: "HAPPY",
    author: "Karl Barth"
  },
  {
    text: "When you focus on the good, the good gets better.",
    category: "HAPPY",
    author: "Abraham Hicks"
  },
  {
    text: "Happiness doesn’t depend on what you have, but on how you think.",
    category: "HAPPY",
    author: "Dale Carnegie"
  },
  {
    text: "The purpose of our lives is to be happy.",
    category: "HAPPY",
    author: "Dalai Lama"
  },
  {
    text: "Every day may not be good, but there is something good in every day.",
    category: "HAPPY",
    author: "Unknown"
  },
  {
    text: "A happy heart makes the face cheerful.",
    category: "HAPPY",
    author: "Proverbs 15:13"
  },
  {
    text: "The most wasted of all days is one without laughter.",
    category: "HAPPY",
    author: "Nicolas Chamfort"
  },
  {
    text: "Happiness grows when shared.",
    category: "HAPPY",
    author: "Unknown"
  },

  // SAD
  {
    text: "Tears are words the heart can’t express.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "Sometimes you have to know when to stop hoping.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "Behind every sweet smile, there is a bitter sadness that no one can see and feel.",
    category: "SAD",
    author: "Tupac Shakur"
  },
  {
    text: "You can’t stop the waves, but you can learn to surf.",
    category: "SAD",
    author: "Jon Kabat-Zinn"
  },
  {
    text: "It’s okay to cry. It’s okay to be sad. Healing takes time.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "Even the darkest night will end and the sun will rise.",
    category: "SAD",
    author: "Victor Hugo"
  },
  {
    text: "Sadness flies away on the wings of time.",
    category: "SAD",
    author: "Jean de La Fontaine"
  },
  {
    text: "Grief changes shape, but it never ends.",
    category: "SAD",
    author: "Keanu Reeves"
  },
  {
    text: "Sometimes, you don’t move on. You just learn to live without what you lost.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "Your sadness today will one day become your strength.",
    category: "SAD",
    author: "Unknown"
  },

  // NEUTRAL
  {
    text: "Life is neither good nor bad, it just is.",
    category: "NEUTRAL",
    author: "Marcus Aurelius"
  },
  {
    text: "Sometimes, doing nothing is doing something important.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Peace comes from accepting what is.",
    category: "NEUTRAL",
    author: "Eckhart Tolle"
  },
  {
    text: "Be calm in your heart, and you will understand the world clearly.",
    category: "NEUTRAL",
    author: "Lao Tzu"
  },
  {
    text: "Not every moment needs meaning; some are simply to be lived.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Let the silence speak for itself.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "The middle path is often the truest one.",
    category: "NEUTRAL",
    author: "Buddha"
  },
  {
    text: "Observe more, react less.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Everything passes when you stop clinging to it.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Just because it’s quiet doesn’t mean nothing is happening.",
    category: "NEUTRAL",
    author: "Unknown"
  },

  // ANGRY
  {
    text: "Holding onto anger is like drinking poison and expecting the other person to die.",
    category: "ANGRY",
    author: "Buddha"
  },
  {
    text: "Speak when you are angry, and you will make the best speech you will ever regret.",
    category: "ANGRY",
    author: "Ambrose Bierce"
  },
  {
    text: "Anger doesn’t solve anything; it only burns what’s already fragile.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Control your anger, or it will control you.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Anger is a wind which blows out the lamp of the mind.",
    category: "ANGRY",
    author: "Robert Ingersoll"
  },
  {
    text: "The best fighter is never angry.",
    category: "ANGRY",
    author: "Lao Tzu"
  },
  {
    text: "You don’t have to attend every argument you’re invited to.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "A moment of patience in a moment of anger saves a thousand moments of regret.",
    category: "ANGRY",
    author: "Ali Ibn Abi Talib"
  },
  {
    text: "Don’t let anger make decisions for you.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Silence is sometimes the most powerful response to anger.",
    category: "ANGRY",
    author: "Unknown"
  },

  // MOTIVATED
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    category: "MOTIVATED",
    author: "Sam Levenson"
  },
  {
    text: "Discipline is the bridge between goals and accomplishment.",
    category: "MOTIVATED",
    author: "Jim Rohn"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "The harder you work for something, the greater you’ll feel when you achieve it.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "Success is what happens after you’ve survived all your mistakes.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "Dream big. Work hard. Stay humble.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "It always seems impossible until it’s done.",
    category: "MOTIVATED",
    author: "Nelson Mandela"
  },
  {
    text: "Don’t stop until you’re proud.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "Small steps every day lead to big results.",
    category: "MOTIVATED",
    author: "Unknown"
  },
    // HAPPY
  {
    text: "Happiness is not the absence of problems, but the ability to deal with them.",
    category: "HAPPY",
    author: "Steve Maraboli"
  },
  {
    text: "The happiest people don’t have the best of everything, they just make the best of everything.",
    category: "HAPPY",
    author: "Unknown"
  },
  {
    text: "A smile is a curve that sets everything straight.",
    category: "HAPPY",
    author: "Phyllis Diller"
  },
  {
    text: "Happiness comes when we stop complaining about the troubles we have and offer thanks for the troubles we don’t.",
    category: "HAPPY",
    author: "Unknown"
  },
  {
    text: "Do more of what makes you happy.",
    category: "HAPPY",
    author: "Unknown"
  },
  {
    text: "Happiness is a journey, not a destination.",
    category: "HAPPY",
    author: "Ben Sweetland"
  },
  {
    text: "You deserve to be happy, not just fine.",
    category: "HAPPY",
    author: "Unknown"
  },
  {
    text: "Sometimes happiness sneaks in through a door you didn’t know you left open.",
    category: "HAPPY",
    author: "John Barrymore"
  },
  {
    text: "Collect moments, not things.",
    category: "HAPPY",
    author: "Unknown"
  },
  {
    text: "The key to happiness is letting each situation be what it is.",
    category: "HAPPY",
    author: "Mandy Hale"
  },

  // SAD
  {
    text: "The pain you feel today is the strength you feel tomorrow.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "Sometimes it’s okay if all you did today was breathe.",
    category: "SAD",
    author: "Unknown"
  },
    {
    text: "You’ll never know how strong you are until being strong is your only choice.",
    category: "SAD",
    author: "Bob Marley"
  },
  {
    text: "Crying doesn’t indicate weakness. It means you’ve been strong for too long.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "It hurts because it mattered.",
    category: "SAD",
    author: "John Green"
  },
  {
    text: "Sometimes you need to sit alone and let your tears speak for you.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "There’s a certain kind of beauty in sadness that only the heart understands.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "Healing doesn’t mean the damage never existed. It means it no longer controls your life.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "It’s sad when you realize you aren’t as important to someone as you thought.",
    category: "SAD",
    author: "Unknown"
  },
  {
    text: "One day you’ll look back and understand why it had to happen.",
    category: "SAD",
    author: "Unknown"
  },

  // NEUTRAL
  {
    text: "The world is neither kind nor cruel—it simply is.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Be still. The answers will come in silence.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "In the middle of chaos, find your calm.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Balance is not something you find, it’s something you create.",
    category: "NEUTRAL",
    author: "Jana Kingsford"
  },
  {
    text: "Neither too high nor too low—stay centered.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Detach from what you can’t control, and you’ll find peace.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Sometimes neutrality is the most powerful stance.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "When nothing is certain, anything is possible.",
    category: "NEUTRAL",
    author: "Unknown"
  },
  {
    text: "Observe your thoughts like clouds passing in the sky.",
    category: "NEUTRAL",
    author: "Thich Nhat Hanh"
  },
  {
    text: "Peace doesn’t mean the absence of noise, but the calm within it.",
    category: "NEUTRAL",
    author: "Unknown"
  },

  // ANGRY
  {
    text: "Never reply when you’re angry. Never make promises when you’re happy. Never decide when you’re sad.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Anger is one letter short of danger.",
    category: "ANGRY",
    author: "Eleanor Roosevelt"
  },
  {
    text: "You will not be punished for your anger; you will be punished by your anger.",
    category: "ANGRY",
    author: "Buddha"
  },
  {
    text: "Don’t let your emotions overpower your intelligence.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Anger is often just sadness in disguise.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Every minute you are angry, you lose sixty seconds of happiness.",
    category: "ANGRY",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "It takes a strong person to stay calm in a chaotic world.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "You can’t control what others do, but you can control how you respond.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Anger clouds judgment. Calm clears it.",
    category: "ANGRY",
    author: "Unknown"
  },
  {
    text: "Breathe. You’re not responsible for fixing everyone.",
    category: "ANGRY",
    author: "Unknown"
  },

  // MOTIVATED
  {
    text: "If you want something you’ve never had, you must be willing to do something you’ve never done.",
    category: "MOTIVATED",
    author: "Thomas Jefferson"
  },
  {
    text: "Don’t limit your challenges—challenge your limits.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "Failure is simply the opportunity to begin again, this time more intelligently.",
    category: "MOTIVATED",
    author: "Henry Ford"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    category: "MOTIVATED",
    author: "William James"
  },
  {
    text: "The secret of getting ahead is getting started.",
    category: "MOTIVATED",
    author: "Mark Twain"
  },
  {
    text: "Success doesn’t come from what you do occasionally, but from what you do consistently.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "You don’t have to be great to start, but you have to start to be great.",
    category: "MOTIVATED",
    author: "Zig Ziglar"
  },
  {
    text: "Great things never come from comfort zones.",
    category: "MOTIVATED",
    author: "Unknown"
  },
  {
    text: "The future depends on what you do today.",
    category: "MOTIVATED",
    author: "Mahatma Gandhi"
  },
  {
    text: "Stay hungry, stay foolish.",
    category: "MOTIVATED",
    author: "Steve Jobs"
  }

];


export default quotes;
