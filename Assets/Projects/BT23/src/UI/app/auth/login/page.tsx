import LoginForm from "../../components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
          Sign in to Social Chain
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}
