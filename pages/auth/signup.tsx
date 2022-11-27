import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <main className="grid grid-cols-12">
        <div className="col-span-4 col-start-5 m-auto h-screen pt-20 w-full">
          <SignupForm onSuccess={() => router.push(Routes.Home())} />
        </div>
      </main>
    </Layout>
  )
}

export default SignupPage
