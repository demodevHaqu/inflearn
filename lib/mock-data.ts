import { Course } from './types'

/**
 * Mock 강의 데이터
 * 실제 운영 시 Supabase에서 가져올 데이터
 */
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "스프링 부트와 JPA 실무 완전 정복 로드맵",
    instructor: "김영한",
    thumbnail: "/spring-boot-coding.jpg",
    price: "₩99,000",
    originalPrice: "₩165,000",
    rating: 4.9,
    reviewCount: 2847,
    studentCount: 15234,
    tags: ["Spring", "JPA"],
    discount: "40%",
    description: "스프링 부트와 JPA를 활용하여 실전 웹 애플리케이션을 개발하는 완벽 가이드입니다. 기초부터 실무까지 단계별로 학습하며, 실제 프로젝트를 통해 스프링 생태계를 완전히 마스터할 수 있습니다.",
    level: "intermediate",
    duration: "40시간",
    lastUpdated: "2025-01",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "스프링 부트의 핵심 개념과 설정 방법 이해",
      "JPA와 Hibernate를 활용한 데이터 영속성 관리",
      "실전 웹 애플리케이션 설계 및 개발",
      "RESTful API 설계 및 구현",
      "성능 최적화 및 트러블슈팅 능력 배양",
      "테스트 코드 작성 및 CI/CD 파이프라인 구축"
    ],
    curriculum: [
      {
        id: "1-1",
        title: "스프링 부트 시작하기",
        lessons: [
          { id: "1-1-1", title: "강의 소개 및 개발 환경 설정", duration: "15:30", isFree: true },
          { id: "1-1-2", title: "스프링 부트 프로젝트 생성", duration: "20:45", isFree: true },
          { id: "1-1-3", title: "스프링 부트 핵심 원리", duration: "35:20" },
        ]
      },
      {
        id: "1-2",
        title: "JPA 기초",
        lessons: [
          { id: "1-2-1", title: "JPA 소개 및 설정", duration: "25:10" },
          { id: "1-2-2", title: "엔티티 매핑", duration: "40:30" },
          { id: "1-2-3", title: "연관관계 매핑", duration: "55:45" },
        ]
      },
      {
        id: "1-3",
        title: "실전 프로젝트",
        lessons: [
          { id: "1-3-1", title: "프로젝트 설계 및 구조", duration: "30:20" },
          { id: "1-3-2", title: "도메인 개발", duration: "45:15" },
          { id: "1-3-3", title: "API 개발", duration: "50:30" },
          { id: "1-3-4", title: "성능 최적화", duration: "60:45" },
        ]
      }
    ],
    instructorInfo: {
      name: "김영한",
      title: "우아한형제들 개발자",
      bio: "10년 이상의 실무 경험을 가진 스프링 전문가입니다. 실전에서 바로 사용 가능한 지식을 전달하는 것을 목표로 합니다.",
      courseCount: 12,
      studentCount: 45000,
      rating: 4.9
    },
    reviews: [
      {
        id: "r1-1",
        userName: "홍길동",
        rating: 5,
        comment: "스프링을 처음 배우는데 이만한 강의가 없는 것 같습니다. 설명이 정말 명쾌하고 실습 위주라 이해가 쉬워요!",
        date: "2025-01-15",
        helpful: 128
      },
      {
        id: "r1-2",
        userName: "김철수",
        rating: 5,
        comment: "실무에서 바로 적용할 수 있는 내용들이 많아서 좋았습니다. 특히 성능 최적화 부분이 인상깊었어요.",
        date: "2025-01-10",
        helpful: 95
      }
    ]
  },
  {
    id: "2",
    title: "React 완벽 가이드 with Redux, Next.js, TypeScript",
    instructor: "박지훈",
    thumbnail: "/react-javascript-code.png",
    price: "₩77,000",
    originalPrice: "₩110,000",
    rating: 4.8,
    reviewCount: 1923,
    studentCount: 12456,
    tags: ["React", "TypeScript"],
    discount: "30%",
    description: "React의 기초부터 고급 패턴까지, Next.js와 TypeScript를 활용한 현대적인 웹 개발을 마스터하세요.",
    level: "intermediate",
    duration: "35시간",
    lastUpdated: "2025-01",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "React 핵심 개념과 Hooks 마스터",
      "TypeScript를 활용한 타입 안전한 개발",
      "Next.js로 SSR/SSG 구현",
      "Redux를 활용한 상태 관리",
      "성능 최적화 기법",
      "실전 프로젝트 구현"
    ],
    curriculum: [
      {
        id: "2-1",
        title: "React 기초",
        lessons: [
          { id: "2-1-1", title: "React 소개", duration: "20:00", isFree: true },
          { id: "2-1-2", title: "JSX와 컴포넌트", duration: "30:00" },
          { id: "2-1-3", title: "Props와 State", duration: "40:00" },
        ]
      }
    ],
    instructorInfo: {
      name: "박지훈",
      title: "프론트엔드 개발자",
      bio: "대기업에서 프론트엔드 아키텍처를 설계하고 있는 시니어 개발자입니다.",
      courseCount: 8,
      studentCount: 28000,
      rating: 4.8
    }
  },
  {
    id: "3",
    title: "파이썬 데이터 분석 마스터 클래스",
    instructor: "이수진",
    thumbnail: "/python-data-analysis.png",
    price: "₩55,000",
    rating: 4.7,
    reviewCount: 1456,
    studentCount: 8934,
    tags: ["Python", "데이터분석"],
    description: "파이썬을 활용한 데이터 분석의 모든 것을 배우는 완벽 가이드입니다.",
    level: "beginner",
    duration: "28시간",
    lastUpdated: "2024-12",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "파이썬 기초 문법 완벽 이해",
      "Pandas, NumPy 활용한 데이터 처리",
      "Matplotlib, Seaborn 시각화",
      "실전 데이터 분석 프로젝트",
    ],
    instructorInfo: {
      name: "이수진",
      title: "데이터 사이언티스트",
      bio: "데이터로 인사이트를 도출하는 것을 즐기는 데이터 전문가입니다.",
      courseCount: 5,
      studentCount: 15000,
      rating: 4.7
    }
  },
  {
    id: "4",
    title: "AWS 클라우드 인프라 구축 실전 가이드",
    instructor: "최민수",
    thumbnail: "/aws-cloud-infrastructure.jpg",
    price: "₩88,000",
    originalPrice: "₩132,000",
    rating: 4.9,
    reviewCount: 987,
    studentCount: 6543,
    tags: ["AWS", "DevOps"],
    discount: "33%",
    description: "AWS를 활용한 확장 가능하고 안전한 클라우드 인프라 구축 방법을 배웁니다.",
    level: "intermediate",
    duration: "32시간",
    lastUpdated: "2025-01",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "AWS 핵심 서비스 이해 및 활용",
      "VPC, EC2, RDS 설정 및 관리",
      "Lambda를 활용한 서버리스 아키텍처",
      "CloudFormation으로 IaC 구현",
      "보안 및 비용 최적화"
    ],
    instructorInfo: {
      name: "최민수",
      title: "DevOps 엔지니어",
      bio: "대규모 트래픽을 처리하는 클라우드 인프라를 설계하고 운영합니다.",
      courseCount: 6,
      studentCount: 12000,
      rating: 4.9
    }
  },
  {
    id: "5",
    title: "ChatGPT와 함께하는 AI 프롬프트 엔지니어링",
    instructor: "정하늘",
    thumbnail: "/ai-chatgpt-prompt.jpg",
    price: "₩44,000",
    rating: 4.8,
    reviewCount: 234,
    studentCount: 1234,
    tags: ["AI", "ChatGPT"],
    description: "ChatGPT를 효과적으로 활용하는 프롬프트 작성 기법을 배웁니다.",
    level: "beginner",
    duration: "12시간",
    lastUpdated: "2025-01",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "효과적인 프롬프트 작성 원칙",
      "다양한 활용 사례 학습",
      "업무 자동화 방법",
      "AI 윤리 및 주의사항"
    ],
    instructorInfo: {
      name: "정하늘",
      title: "AI 컨설턴트",
      bio: "기업의 AI 도입을 돕는 컨설팅을 하고 있습니다.",
      courseCount: 3,
      studentCount: 3500,
      rating: 4.8
    }
  },
  {
    id: "6",
    title: "Figma로 시작하는 UI/UX 디자인 입문",
    instructor: "강민지",
    thumbnail: "/figma-ui-ux-design.jpg",
    price: "₩33,000",
    rating: 4.6,
    reviewCount: 456,
    studentCount: 2345,
    tags: ["Figma", "UI/UX"],
    description: "Figma를 활용하여 전문적인 UI/UX 디자인을 시작하세요.",
    level: "beginner",
    duration: "18시간",
    lastUpdated: "2024-12",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "Figma 핵심 기능 마스터",
      "UI 디자인 원칙 이해",
      "프로토타이핑 실습",
      "실전 프로젝트 진행"
    ],
    instructorInfo: {
      name: "강민지",
      title: "UI/UX 디자이너",
      bio: "사용자 중심의 디자인을 만드는 것을 좋아하는 디자이너입니다.",
      courseCount: 4,
      studentCount: 8000,
      rating: 4.6
    }
  },
  {
    id: "7",
    title: "Node.js 백엔드 개발 완전 정복",
    instructor: "박준영",
    thumbnail: "/nodejs-backend-development.jpg",
    price: "₩66,000",
    originalPrice: "₩99,000",
    rating: 4.7,
    reviewCount: 678,
    studentCount: 3456,
    tags: ["Node.js", "Backend"],
    discount: "33%",
    description: "Node.js를 활용한 확장 가능한 백엔드 시스템 개발을 마스터하세요.",
    level: "intermediate",
    duration: "30시간",
    lastUpdated: "2025-01",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "Node.js 핵심 개념 이해",
      "Express.js로 RESTful API 구축",
      "MongoDB/PostgreSQL 연동",
      "인증 및 보안 구현",
      "배포 및 운영"
    ],
    instructorInfo: {
      name: "박준영",
      title: "백엔드 개발자",
      bio: "스타트업에서 백엔드 시스템을 설계하고 개발하고 있습니다.",
      courseCount: 5,
      studentCount: 9000,
      rating: 4.7
    }
  },
  {
    id: "8",
    title: "SQL 데이터베이스 설계와 최적화",
    instructor: "윤서연",
    thumbnail: "/sql-database-design.jpg",
    price: "₩55,000",
    rating: 4.8,
    reviewCount: 890,
    studentCount: 4567,
    tags: ["SQL", "Database"],
    description: "효율적인 데이터베이스 설계와 쿼리 최적화 기법을 배웁니다.",
    level: "intermediate",
    duration: "25시간",
    lastUpdated: "2024-12",
    language: "한국어",
    certificate: true,
    learningOutcomes: [
      "데이터베이스 설계 원칙",
      "정규화와 역정규화",
      "복잡한 SQL 쿼리 작성",
      "인덱싱 및 성능 최적화",
      "트랜잭션 관리"
    ],
    instructorInfo: {
      name: "윤서연",
      title: "데이터베이스 엔지니어",
      bio: "대용량 데이터를 다루는 데이터베이스 전문가입니다.",
      courseCount: 4,
      studentCount: 11000,
      rating: 4.8
    }
  },
  {
    id: "9",
    title: "HTML/CSS 기초부터 반응형 웹까지",
    instructor: "김태희",
    thumbnail: "/html-css-responsive-web.jpg",
    price: "무료",
    rating: 4.5,
    reviewCount: 3456,
    studentCount: 23456,
    tags: ["HTML", "CSS"],
    description: "웹 개발의 기초인 HTML과 CSS를 완벽하게 마스터하세요.",
    level: "beginner",
    duration: "20시간",
    lastUpdated: "2024-11",
    language: "한국어",
    certificate: false,
    learningOutcomes: [
      "HTML 태그와 구조 이해",
      "CSS 선택자와 스타일링",
      "Flexbox와 Grid 레이아웃",
      "반응형 웹 디자인",
      "실전 웹페이지 제작"
    ],
    instructorInfo: {
      name: "김태희",
      title: "프론트엔드 개발자",
      bio: "웹 개발을 처음 시작하는 분들을 돕는 것을 좋아합니다.",
      courseCount: 6,
      studentCount: 35000,
      rating: 4.5
    }
  },
  {
    id: "10",
    title: "Git & GitHub 입문 가이드",
    instructor: "이준호",
    thumbnail: "/git-github-version-control.jpg",
    price: "무료",
    rating: 4.6,
    reviewCount: 2345,
    studentCount: 18765,
    tags: ["Git", "GitHub"],
    description: "Git과 GitHub를 활용한 버전 관리의 모든 것을 배웁니다.",
    level: "beginner",
    duration: "10시간",
    lastUpdated: "2024-12",
    language: "한국어",
    certificate: false,
    learningOutcomes: [
      "Git 기본 명령어 학습",
      "브랜치 전략 이해",
      "GitHub 협업 워크플로우",
      "Pull Request와 Code Review",
      "Git 트러블슈팅"
    ],
    instructorInfo: {
      name: "이준호",
      title: "소프트웨어 엔지니어",
      bio: "오픈소스 컨트리뷰터로 활동하며 개발 문화를 전파합니다.",
      courseCount: 3,
      studentCount: 22000,
      rating: 4.6
    }
  },
  {
    id: "11",
    title: "JavaScript 기초 문법 완성",
    instructor: "박소영",
    thumbnail: "/javascript-basics-programming.jpg",
    price: "무료",
    rating: 4.7,
    reviewCount: 4567,
    studentCount: 34567,
    tags: ["JavaScript"],
    description: "JavaScript의 기초부터 ES6+ 최신 문법까지 완벽하게 학습합니다.",
    level: "beginner",
    duration: "22시간",
    lastUpdated: "2024-12",
    language: "한국어",
    certificate: false,
    learningOutcomes: [
      "JavaScript 기본 문법",
      "함수와 스코프 이해",
      "객체와 배열 다루기",
      "ES6+ 최신 문법",
      "비동기 프로그래밍"
    ],
    instructorInfo: {
      name: "박소영",
      title: "풀스택 개발자",
      bio: "초보자도 쉽게 이해할 수 있는 강의를 만듭니다.",
      courseCount: 7,
      studentCount: 42000,
      rating: 4.7
    }
  },
  {
    id: "12",
    title: "프로그래밍 입문자를 위한 알고리즘",
    instructor: "최동욱",
    thumbnail: "/algorithm-programming-basics.jpg",
    price: "무료",
    rating: 4.4,
    reviewCount: 1234,
    studentCount: 12345,
    tags: ["알고리즘"],
    description: "코딩 테스트와 문제 해결 능력을 키우는 알고리즘 입문 강의입니다.",
    level: "beginner",
    duration: "16시간",
    lastUpdated: "2024-11",
    language: "한국어",
    certificate: false,
    learningOutcomes: [
      "기본 자료구조 이해",
      "정렬 알고리즘",
      "탐색 알고리즘",
      "재귀와 동적 프로그래밍",
      "코딩 테스트 대비"
    ],
    instructorInfo: {
      name: "최동욱",
      title: "알고리즘 강사",
      bio: "알고리즘을 쉽고 재미있게 가르치는 것이 목표입니다.",
      courseCount: 4,
      studentCount: 18000,
      rating: 4.4
    }
  }
]

/**
 * ID로 강의 찾기
 */
export function getCourseById(id: string): Course | undefined {
  console.log('[Mock Data] 강의 조회:', id)
  return mockCourses.find(course => course.id === id)
}

/**
 * 카테고리별로 강의 그룹화
 */
export function getCoursesByCategory() {
  const popular = mockCourses.slice(0, 4)
  const newCourses = mockCourses.slice(4, 8)
  const free = mockCourses.slice(8, 12)
  
  console.log('[Mock Data] 카테고리별 강의 그룹화 완료')
  return { popular, newCourses, free }
}

/**
 * 추천 강의 (현재는 랜덤으로 4개)
 */
export function getRecommendedCourses(currentCourseId: string): Course[] {
  console.log('[Mock Data] 추천 강의 생성:', currentCourseId)
  return mockCourses
    .filter(course => course.id !== currentCourseId)
    .slice(0, 4)
}

