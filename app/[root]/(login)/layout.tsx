import { ChildrenProps } from '@/types'

function Layout({children}:ChildrenProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      {children}
    </div>
  );
}

export default Layout
