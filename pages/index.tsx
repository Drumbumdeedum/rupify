import { Suspense } from "react"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/users/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import React from "react"
import SummaryComponent from "app/summary/components/SummaryComponent"

const LandingComponent = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div>
        <div className="flex bg-blue-100 space-x-6 p-3">
          <div className="flex-1">
            <p>
              <Link href="/">
                <a>RUPIFY</a>
              </Link>
            </p>
          </div>
          <div>{currentUser.email}</div>
          <button
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </div>
        <div>
          <main className="grid grid-cols-12">
            <div className="col-span-3 my-auto mr-0 ml-auto pl-12">
              <Link href={Routes.NewIncomePage()}>
                <a className="p-3 bg-green-300 rounded">
                  <strong>NEW INCOME</strong>
                </a>
              </Link>
            </div>
            <div className="col-span-6">
              <SummaryComponent />
            </div>
            <div className="col-span-3 my-auto mr-auto ml-0 pr-12">
              <Link href={Routes.NewExpensePage()}>
                <a className="p-3 bg-red-300 rounded">
                  <strong>NEW EXPENSE</strong>
                </a>
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <main className="grid grid-cols-12">
          <div className="col-span-2 col-start-6 m-auto h-screen">
            <div className="mt-10 space-y-12">
              <div>
                <h1 className="font-mono text-center">Welcome to Rupify!</h1>
              </div>
              <div className="space-y-3">
                <div className="text-center bg-neutral-200 p-2 rounded">
                  <Link href={Routes.SignupPage()}>
                    <a>
                      <strong>Sign Up</strong>
                    </a>
                  </Link>
                </div>
                <div className="font-mono text-center">or</div>
                <div className="text-center">
                  <Link href={Routes.LoginPage()}>
                    <a>
                      <strong>Login</strong>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div>
        <Suspense fallback="Loading...">
          <LandingComponent />
        </Suspense>
      </div>
    </Layout>
  )
}
export default Home
