
const mainHeightClass = "h-[calc(100vh-4rem)]"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <div className={`w-screen ${mainHeightClass}`}>
        {children}
    </div>
  )
}
