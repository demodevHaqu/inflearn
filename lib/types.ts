/**
 * 강의 관련 타입 정의
 */

export interface Course {
  id: string
  title: string
  instructor: string
  thumbnail: string
  price: string
  originalPrice?: string
  rating: number
  reviewCount: number
  studentCount: number
  tags?: string[]
  discount?: string
  // 상세 페이지용 추가 필드
  description?: string
  learningOutcomes?: string[]
  curriculum?: CourseCurriculum[]
  instructorInfo?: InstructorInfo
  reviews?: Review[]
  level?: 'beginner' | 'intermediate' | 'advanced'
  duration?: string
  lastUpdated?: string
  language?: string
  certificate?: boolean
  // YouTube 영상 ID
  youtubeVideoId?: string
}

export interface CourseCurriculum {
  id: string
  title: string
  lessons: CourseLesson[]
}

export interface CourseLesson {
  id: string
  title: string
  duration: string
  isFree?: boolean
  isCompleted?: boolean
}

export interface InstructorInfo {
  name: string
  title: string
  bio: string
  avatar?: string
  courseCount?: number
  studentCount?: number
  rating?: number
}

export interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  helpful?: number
}

/**
 * 카테고리 타입
 */
export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
}

/**
 * 사용자 타입
 */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  enrolledCourses?: string[]
}

/**
 * 장바구니 아이템 타입
 */
export interface CartItem {
  courseId: string
  course: Course
  addedAt: string
}

/**
 * 주문 타입
 */
export interface Order {
  id: string
  userId: string
  courses: Course[]
  totalAmount: number
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

