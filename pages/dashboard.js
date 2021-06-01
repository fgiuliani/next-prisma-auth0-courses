import Container from 'components/Container'
import Link from 'next/link'
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client'

const DashboardPage = ({ dbUser }) => {
  return (
    <Container>
      <div className="bg-white w-full text-gray-600 p-8">
        <h2 className="text-3xl font-md mt-4 mb-2">Available Courses</h2>
        {dbUser.courses.map(({ title, slug }) => (
          <Link href={`/course/${slug}`} key={slug}>
            <a className="mx-4">{title}</a>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req }) {
    const {
      user: { email },
    } = await getSession(req)

    const prisma = new PrismaClient()

    const dbUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        courses: true,
      },
    })

    await prisma.$disconnect()

    return {
      props: {
        dbUser: JSON.parse(JSON.stringify(dbUser)),
      },
    }
  },
})

export default DashboardPage
