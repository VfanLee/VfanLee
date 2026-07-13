export function Footer() {
  return (
    <footer className="border-border border-t px-5 py-6 sm:px-8 lg:px-12">
      <div className="text-muted-foreground mx-auto flex max-w-7xl items-center justify-between text-xs">
        <p>© {new Date().getFullYear()} Vfan Lee</p>
        <p>Make it useful.</p>
      </div>
    </footer>
  )
}
