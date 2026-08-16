/*
  EDIT THIS FILE when club details change.

  BOARD UPDATES EACH SEMESTER
  ---------------------------
  1. Upload new headshots to assets/images/.
  2. Add a new entry to boardTerms (keep older entries if you want an archive).
  3. Set currentBoardTerm to the new term name.

  You do not need to edit index.html to change board members.
*/

window.SITE_DATA = {
  information: [
    {
      number: "01",
      title: "Membership",
      intro: "Everything you need before getting on the water with the team.",
      highlights: [
        { label: "Dues", value: "$125 / semester" },
        { label: "Safety", value: "Swim + capsize test" },
        { label: "ASU", value: "DoSportsEasy compliant" }
      ],
      detail: "Dues help subsidize boat storage and maintenance. Members also participate in team volunteering and social events so the club can continue meeting ASU Sport Club funding requirements."
    },
    {
      number: "02",
      title: "Practice",
      intro: "Four team sessions each week, including three practices on the water.",
      highlights: [
        { label: "Thursday", value: "4:00 PM · Water" },
        { label: "Friday", value: "4:00 PM · Water" },
        { label: "Saturday", value: "4:00 PM · Water" },
        { label: "Monday", value: "7:00 PM · Chalk talk" }
      ],
      detail: "Water practices are held at Tempe Town Lake. Monday chalk talks are held on or near campus and focus on racing, rules, strategy, and team preparation."
    },
    {
      number: "03",
      title: "Regattas",
      intro: "Weekend racing throughout the PCCSC season and beyond.",
      highlights: [
        { label: "Fall", value: "~4 regattas" },
        { label: "Spring", value: "~9 regattas" },
        { label: "Typical trip", value: "Fri–Sun" },
        { label: "Racing", value: "Saturday + Sunday" }
      ],
      detail: "The team often camps to keep travel affordable. When a regatta requires a hotel or hostel, attending members are typically asked to contribute $50 toward housing."
    }
  ],

  currentBoardTerm: "Current Board",

  boardTerms: [
    {
      term: "Current Board",
      members: [
        {
          name: "Max Herbreteau",
          role: "President",
          image: "assets/images/max-herbreteau.png",
          bio: "TODO:add_bio"
        },
        {
          name: "Camden Wacha",
          role: "Vice President",
          image: "assets/images/camden-wacha.png",
          bio: "Camden is a Senior studying Sustainability and Urban Planning. This is his fourth year on the team and his second as VP. He is excited to welcome new sailors!"
        },
        {
          name: "Veja Zaprauskis",
          role: "Secretary",
          image: "assets/images/veja-zaprauskis.png",
          bio: "TODO:add_bio"
        },
        {
          name: "Alex Stellato",
          role: "Treasurer",
          image: "assets/images/alex-stellato.png",
          bio: "Alex is an incoming junior studying Computer Science. He has been sailing competitively for five years and loves the competitive side of the sport. Outside of sailing, he enjoys coding, hiking, traveling, and spending time with friends."
        },
        {
          name: "Will Harris",
          role: "Volunteer Coordinator",
          image: "assets/images/will-harris.png",
          bio: "Will is a junior studying Biology. He just started sailing with the team last year, but is very enthusiastic about learning more about sailing! In his free time, he loves to be in the outdoors and spend time with friends."
        },
        {
          name: "Erin Welker",
          role: "PR Director",
          image: "assets/images/erin-welker.png",
          bio: "Erin is a senior studying Sustainability. This is her fourth year on the team and third year on the board. She is excited to get out on the water, travel, and compete with new and familiar faces!"
        }
      ]
    }

    /*
      EXAMPLE: add the next semester ABOVE the current entry:

      ,{
        term: "Spring 2027",
        members: [
          {
            name: "New President",
            role: "President",
            image: "assets/images/new-president.jpg",
            bio: "Their new semester-specific description goes here."
          }
        ]
      }

      Then change currentBoardTerm near the top to "Spring 2027".
      Once there is more than one term, the website automatically shows a
      semester selector so visitors can view prior boards.
    */
  ]
};
