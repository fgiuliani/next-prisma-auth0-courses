import { getCourses } from 'utils/db'
import Container from 'components/Container'
import Link from 'next/link'

const Index = ({ courses }) => {
  return (
    <Container>
      <div>
        <div className="flex flex-wrap">
          {courses.map(({ title, slug }) => {
            return (
              <Link href={`/course/${slug}`} key={slug}>
                <a className="bg-white mx-2 my-2 text-gray-600 w-56 px-8 pt-8 pb-8 rounded-md relative">
                  <h1>{title}</h1>
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const data = await getCourses()

  return {
    props: {
      courses: JSON.parse(JSON.stringify(data)),
    },
  }
}

export default Index
