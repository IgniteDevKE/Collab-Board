import Image from "next/image"

export const Loading = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <Image
        src="/logo.svg"
        alt="auth-logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  )
}
