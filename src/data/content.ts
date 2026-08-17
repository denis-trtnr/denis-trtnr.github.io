import { HeroContent, Moment, CurrentlyItem, SocialLinksData } from '../types';

export const socialData: SocialLinksData = {
  github: 'https://github.com/denis-trtnr',
  linkedin: 'https://www.linkedin.com/in/denis-trautner',
  orcid: 'https://orcid.org/',
  email: 'contact@trautner.io',
};

export const heroContent: HeroContent = {
  name: 'Denis Trautner',
  title: 'Cloud Solution Architect · AI Researcher · Data Enthusiast',
  intro: [
    'I design cloud-native systems and explore how AI can turn complex data into useful systems and knowledge. My work sits somewhere between software architecture, data platforms and applied AI research — with a strong preference for actually building things.',
  ],
  portrait: {
    webpSrc: './images/portrait/denis-trautner-portrait.webp',
    jpegSrc: './images/portrait/denis-trautner-portrait.jpg',
    alt: 'Denis Trautner wearing a dark navy suit against a clean modern architectural backdrop',
  },
  social: socialData,
};

export const momentsData: Moment[] = [
  {
    id: 'formula-student',
    index: '01',
    year: '2020 – 2023',
    location: 'Stuttgart · Spielberg · Hockenheim',
    title: 'Engineering after lectures',
    subtitle: 'Autonomous driving, motion planning, and road trips through the night.',
    teaser: 'Developing an autonomous race car after lectures, culminating in 2nd Place Overall at Formula Student Germany.',
    tags: ['Formula Student', 'Autonomous Driving', 'Motion Planning'],
    description: [
      'For around two years, I was part of a Formula Student team developing an autonomous race car. As an Autonomous Systems Engineer, my primary focus was on motion planning and trajectory optimization, alongside business plan responsibilities and broader team operations.',
      'The real excitement came from building things outside normal working hours. One particularly memorable week started with a university exam on Monday. Directly after the exam, we drove eight hours through the Alps to the Red Bull Ring in Spielberg, Austria. The following morning, I presented at the Formula Student event. Right after, we drove back through the night because the next university exam was already scheduled for Wednesday morning.',
      'The intense combination of lectures, late-night workshop engineering, and racing culminated at Formula Student Germany 2022, where our team took 2nd Place Overall in the electric vehicle category.',
    ],
    anecdote: {
      headline: 'Monday Exam → Spielberg → Wednesday Exam',
      text: 'Monday was the exam. Eight hours later we were on the road to Spielberg. Tuesday morning was the presentation at the Red Bull Ring. By Wednesday morning, I was back at university for the next exam.',
    },
    coverImage: {
      webpSrc: './images/formulastudent/car-racing.webp',
      jpegSrc: './images/formulastudent/car-racing.jpg',
      alt: 'Car #77 DHBW Stuttgart at speed on the Formula Student track with motion blur',
      caption: 'Car #77 on track — Formula Student Germany',
      aspectRatio: 'landscape',
    },
    images: [
      {
        webpSrc: './images/formulastudent/car-racing.webp',
        jpegSrc: './images/formulastudent/car-racing.jpg',
        alt: 'Car #77 DHBW Stuttgart at speed with motion blur on the track',
        caption: 'Car #77 on track — Formula Student Germany',
        aspectRatio: 'landscape',
      },
      {
        webpSrc: './images/formulastudent/car-reveal.webp',
        jpegSrc: './images/formulastudent/car-reveal.jpg',
        alt: 'Unveiling the autonomous Formula Student race car under atmospheric stage lighting',
        caption: 'Car reveal after months of late-night engineering',
        aspectRatio: 'portrait',
      },
      {
        webpSrc: './images/formulastudent/workshop-bench.webp',
        jpegSrc: './images/formulastudent/workshop-bench.jpg',
        alt: 'Workshop bench covered in electronics, wiring and a Speedgoat real-time controller with a laptop running code',
        caption: 'Late nights at the workshop bench wiring the autonomous system',
        aspectRatio: 'landscape',
      },
      {
        webpSrc: './images/formulastudent/red-bull-ring.webp',
        jpegSrc: './images/formulastudent/red-bull-ring.jpg',
        alt: 'Denis Trautner and teammate at the Red Bull Ring in Austria for Formula Student Austria 2022',
        caption: 'At the Red Bull Ring — after the Monday exam road trip',
        aspectRatio: 'portrait',
      },
      {
        webpSrc: './images/formulastudent/fsg-podium.webp',
        jpegSrc: './images/formulastudent/fsg-podium.jpg',
        alt: 'Formula Student Germany 2022 award ceremony celebrating 2nd Place Overall',
        caption: 'DHBW Engineering Stuttgart — 2nd Place Overall at FSG 2022',
        aspectRatio: 'wide',
      },
      {
        webpSrc: './images/formulastudent/fsa-2023-cheque.webp',
        jpegSrc: './images/formulastudent/fsa-2023-cheque.jpg',
        alt: 'Team celebrating at Formula Student Austria 2023 with giant novelty cheque',
        caption: 'FSA 2023 — Team celebrating at Spielberg',
        aspectRatio: 'landscape',
      },
      {
        webpSrc: './images/formulastudent/fsg-teams-panorama.webp',
        jpegSrc: './images/formulastudent/fsg-teams-panorama.jpg',
        alt: 'All Formula Student teams and cars assembled at Hockenheimring for the group photo',
        caption: 'All teams at Hockenheimring — Formula Student Germany',
        aspectRatio: 'wide',
      },
    ],
    videos: [
      {
        src: './videos/formulastudent/fs-highlight.mp4',
        caption: 'Highlight reel — Formula Student racing season',
        label: 'Highlight Clip',
      },
      {
        src: './videos/formulastudent/fs-speedx2.mp4',
        caption: 'On-track footage — Car #77 at speed (2×)',
        label: 'Onboard Speed Run',
      },
    ],
  },
  {
    id: 'dfki-research',
    index: '02',
    year: '2022 – 2024',
    location: 'Berlin & Stuttgart',
    title: 'Research alongside a full-time job',
    subtitle: 'Where industry engineering met applied academic NLP research.',
    teaser: 'Investigating NLP model robustness and cross-corpus Named Entity Recognition on noisy real-world data alongside full-time engineering.',
    tags: ['DFKI Berlin', 'NLP', 'Named Entity Recognition'],
    description: [
      'During my Master\'s studies, while working full-time at STIHL, I conducted my academic research together with the German Research Center for Artificial Intelligence (DFKI) in Berlin. It created an invigorating intersection between practical systems engineering and academic AI exploration.',
      'My study project focused on "Evaluation of Approaches for Optimizing Cross-Corpus Named Entity Recognition", followed by my Master\'s thesis on "Quantitative Analysis of the Impact of Data Quality Issues on the Robustness of Different NER Model Architectures".',
      'Rather than relying purely on benchmark metrics, I became interested in how NLP models behave when they leave ideal laboratory conditions and encounter imperfect, noisy, or heterogeneous real-world data.',
    ],
    coverImage: {
      webpSrc: './images/dfki/dfki-thesis.webp',
      jpegSrc: './images/dfki/dfki-thesis.jpg',
      alt: 'Denis Trautner holding his Master\'s thesis in front of the DFKI Berlin logo',
      caption: 'Holding the finished Master\'s thesis at DFKI Berlin',
      aspectRatio: 'portrait',
    },
    researchTopics: [
      {
        type: "Master's Thesis",
        title: 'Quantitative Analysis of the Impact of Data Quality Issues on the Robustness of Different NER Model Architectures',
      },
      {
        type: 'Study Project',
        title: 'Evaluation of Approaches for Optimizing Cross-Corpus Named Entity Recognition',
      },
    ],
    images: [
      {
        webpSrc: './images/dfki/dfki-thesis.webp',
        jpegSrc: './images/dfki/dfki-thesis.jpg',
        alt: 'Denis Trautner holding his Master\'s thesis at DFKI Berlin',
        caption: 'Holding the finished Master\'s thesis at DFKI Berlin',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: 'texas-exchange',
    index: '03',
    year: '2017',
    location: 'Texas, USA',
    title: 'Leaving home early',
    subtitle: 'Six months in an unfamiliar environment.',
    teaser: 'Six months living and studying in Texas in 10th grade — an early lesson in navigating unfamiliar environments and adaptability.',
    tags: ['Texas', 'Exchange', 'Adaptability'],
    description: [
      'During 10th grade, I spent approximately six months living and studying in Texas as an exchange student.',
      'Navigating a completely new environment, foreign language, and unfamiliar culture at a young age became a defining lesson in adaptability and self-reliance — establishing a lifelong curiosity for entering uncharted territory.',
      'From high school football games under Friday night lights to ranch life, it was a world away from anything familiar — and exactly that unfamiliarity turned out to be the point.',
    ],
    coverImage: {
      webpSrc: './images/texas/texas-football.webp',
      jpegSrc: './images/texas/texas-football.jpg',
      alt: 'High school American football players celebrating a win on the field at night',
      caption: 'Friday night lights — high school football in Texas',
      aspectRatio: 'landscape',
    },
    images: [
      {
        webpSrc: './images/texas/texas-football.webp',
        jpegSrc: './images/texas/texas-football.jpg',
        alt: 'High school American football players celebrating on the field under stadium lights',
        caption: 'Friday night football — school game in Texas',
        aspectRatio: 'landscape',
      },
      {
        webpSrc: './images/texas/texas-ranch.webp',
        jpegSrc: './images/texas/texas-ranch.jpg',
        alt: 'Two teenagers shooting a rifle at a ranch in the Texas countryside',
        caption: 'Ranch life — nothing quite like Texas',
        aspectRatio: 'portrait',
      },
      {
        webpSrc: './images/texas/texas-prom.webp',
        jpegSrc: './images/texas/texas-prom.jpg',
        alt: 'Prom group photo on a wooden bridge surrounded by greenery',
        caption: 'Prom night in Texas — a very American milestone',
        aspectRatio: 'landscape',
      },
    ],
  },
];

export const currentlyStatements: CurrentlyItem[] = [
  {
    id: 'cloud-platforms',
    text: 'Designing cloud and data platforms.',
    category: 'Architecture',
  },
  {
    id: 'graph-ai',
    text: 'Exploring graph-based AI systems, retrieval and knowledge discovery.',
    category: 'Applied AI',
  },
  {
    id: 'applied-research',
    text: 'Experimenting with applied AI research.',
    category: 'Research',
  },
];
